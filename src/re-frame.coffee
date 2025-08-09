{identical, eq, eqShallow, keys, dict, entries, isArray, isDict, isFn, getIn,
 merge, assoc, assocIn, dissoc, update, repr, identity, chunks, flatten, chain} = require './util'
{atom, deref, reset, swap} = require './atom'
{_init: _initReagent, atom: ratom, cursor} = require './reagent'
[_eq_, _namespaces] = [eq, new Map]

_init = (opts) =>
  _initReagent opts
  _eq_ = opts?.eq or _eq_
  undefined


inNamespace = (namespace='') =>
  return _namespaces.get namespace  if _namespaces.has namespace
  [_exports, _ns] = [{namespace, inNamespace}, (unless namespace then "" else "[#{namespace}]")]
  _namespaces.set namespace, _exports

  ### Application state atom ###
  _exports.appDb = appDb = ratom {}
  events = atom {}
  effects = atom {}
  coeffects = atom {}
  subscriptions = atom {}

  _noHandler = (kind, [key]) => console.error "re-frame#{_ns}: no #{kind} handler registered for: '#{key}'"
  _duplicate = (kind, key)   => console.warn  "re-frame#{_ns}: overwriting #{kind} handler for: '#{key}'"

  _subscriptionCache = new Map
  ### Removes cached subscriptions (forcing to recalculate) ###
  _exports.clearSubscriptionCache = => _subscriptionCache.clear()
  _eventQueue = new Set
  ### Cancels all scheduled events ###
  _exports.purgeEventQueue = =>
    _eventQueue.forEach clearTimeout
    _eventQueue.clear()
  _clear = (atom) => (id) =>
    if id then swap atom, dissoc, id else reset atom, {}
    undefined

  _invalidSignals = (key) => throw SyntaxError "re-frame#{_ns}: invalid signals specified for subscription '#{key}'"

  _signals = (id, signals) =>
    _invalidSignals id  unless signals.every ([k, q]) => (k is '<-') and isArray q
    queries = signals.map (kq) => kq[1]
    if queries.length is 1  then (=> subscribe queries[0])  else (=> queries.map subscribe)

  _deref = (ratom) => ratom._deref()  # parent ratom is not to be propagated

  _calcSignals = (signals) =>
    if isArray signals         then signals.map _deref
    else unless isDict signals then _deref signals
    else dict entries(signals).map ([k, v]) => [k, _deref v]

  ### Registers a subscription function to compute view data ###
  _exports.regSub = (id, ...signals, computation) =>
    signals =
      if signals.length is 0        then => appDb
      else if signals.length isnt 1 then _signals id, (chunks signals, 2)
      else if isFn signals[0]       then signals[0]
      else _invalidSignals id
    _duplicate "subscription", id  if (deref subscriptions)[id]
    swap subscriptions, assoc, id, [signals, computation]
    undefined

  _calcSub = (signals, computation) => (query) =>
    input = _calcSignals signals query
    if _subscriptionCache.has(key = repr query)
      [input_, output] = _subscriptionCache.get key
      return output  if eqShallow input, input_
    x = computation input, query
    _subscriptionCache.set key, [input, x]
    x

  _cursors = new Map
  ### Returns an RCursor that derefs to subscription result (or cached value) ###
  _exports.subscribe = subscribe = (query) =>
    unless (it = (deref subscriptions)[ query[0] ]) then _noHandler "subscription", query else
      _cursors.set key, cursor _calcSub(...it), query unless _cursors.has(key = repr query)
      _cursors.get key

  ### Unregisters one or all subscription functions ###
  _exports.clearSub = do (_clearSubs = _clear subscriptions) =>
    (id) => id or _cursors.clear();  _clearSubs id

  ###
    Produces an interceptor (changed from varargs to options object).

    Interceptor structure:
    {:id      :something             ;; decorative only - can be ignored
     :before  (fn [context] ...)     ;; returns a possibly modified `context`
     :after   (fn [context] ...)}    ;; returns a possibly modified `context`
  ###
  _exports.toInterceptor = toInterceptor = (args) =>
    id:     args?.id
    before: args?.before or identity
    after:  args?.after or identity

  _getX = (x, key, notFound) => unless key then x else if key of (x or {}) then x[key] else notFound
  ### Returns context coeffects or specified coeffect ###
  _exports.getCoeffect = getCoeffect = (context, key, notFound) =>
    _getX context.coeffects, key, notFound
  ### Returns context effects or specified effect ###
  _exports.getEffect = getEffect = (context, key, notFound) =>
    _getX context.effects, key, notFound
  ### Produces a copy of the context with added coeffect ###
  _exports.assocCoeffect = assocCoeffect = (context, key, value) =>
    assocIn context, ['coeffects', key], value
  ### Produces a copy of the context with added effect ###
  _exports.assocEffect = assocEffect = (context, key, value) =>
    assocIn context, ['effects', key], value
  ### Produces a copy of the context with interceptors added to the queue ###
  _exports.enqueue = (context, interceptors) => update context, 'queue', (xs) => [...xs, ...interceptors]
  _getDb = (context) => getEffect context, 'db', (getCoeffect context, 'db')

  _pathKey = 're-frame-path/db-store'
  ### Produces an interceptor which switches out db for its subpath ###
  _exports.path = (...path) => toInterceptor
    id: 'path'
    before: (context) =>
      db = getCoeffect context, 'db'
      dbs = [...(context[_pathKey] or []), db]
      chain context, [assoc, _pathKey, dbs], [assocCoeffect, 'db', (getIn db, flatten path)]
    after: (context) =>
      [...dbs, db] = context[_pathKey]
      chain context, [assoc, _pathKey, dbs], [assocEffect, 'db', (assocIn db, (flatten path), (_getDb context))], [assocCoeffect, 'db', db]

  ### Produces an interceptor which updates db effect after the event handler ###
  _exports.enrich = (f) => toInterceptor id: 'enrich', after: (context) =>
    assocEffect context, 'db', (f (_getDb context), (getCoeffect context, 'event'))

  _replaceEvent = (f) => (context) =>
    event = getCoeffect context, 'event'
    chain context, [assocCoeffect, 'originalEvent', event], [assocCoeffect, 'event', f event]
  _restoreEvent = (context) => assocCoeffect context, 'event', (getCoeffect context, 'originalEvent')

  ### An interceptor switches out event for its 1st parameter ###
  _exports.unwrap = toInterceptor id: 'unwrap', after: _restoreEvent, before: _replaceEvent (event) => event[1]
  ### An interceptor switches out event for its parameters ###
  _exports.trimV = toInterceptor id: 'trim-v', after: _restoreEvent, before: _replaceEvent (event) => event[1..]

  ### Produces an interceptor which updates runs an action on db/event after the event handler ###
  _exports.after = (f) => toInterceptor id: 'after', after: (context) =>
    f (_getDb context), (getCoeffect context, 'event')
    context

  ### Produces an interceptor which recalculates db subpath if input subpaths changed ###
  _exports.onChanges = (f, outPath, ...inPaths) => toInterceptor
    id: 'on-changes'
    after: (context) =>
      db0 = getCoeffect(context, 'db');  db1 = _getDb context
      [ins, outs] = [db0, db1].map (db) => inPaths.map (path) => getIn db, path
      if (outs.every (x, i) => identical x, ins[i]) then context else
        assocEffect context, 'db', (assocIn db1, outPath, f ...outs)

  ### Registers a coeffect handler (for use as an interceptor) ###
  _exports.regCofx = (id, handler) =>
    _duplicate "coeffect", id  if (deref coeffects)[id]
    swap coeffects, assoc, id, handler
    undefined

  ### Produces an interceptor which applies a coeffect handler before the event handler ###
  _exports.injectCofx = (key, arg) => toInterceptor id: key, before: (context) =>
    if (it = (deref coeffects)[key])
      update context, 'coeffects', (deref coeffects)[key], arg
    else _noHandler "coeffect", [key];  context

  ### Unregisters one or all coeffect handlers ###
  _exports.clearCofx = _clear coeffects

  ### Registers an event handler which calculates new application state from the old one ###
  _exports.regEventDb = (id, interceptors, handler) =>
    [interceptors, handler] = [[], interceptors] unless handler
    regEventFx id, interceptors, (cofx, query) => db: handler cofx.db, query

  _ctxEvt = (handler) => (context) =>
    merge context, {effects: handler (getCoeffect context), (getCoeffect context, 'event')}

  ### Registers an event handler which calculates effects from coeffects ###
  _exports.regEventFx = regEventFx = (id, interceptors, handler) =>
    [interceptors, handler] = [[], interceptors] unless handler
    regEventCtx id, interceptors, _ctxEvt handler

  ### Registers an event handler which arbitrarily updates the context ###
  _exports.regEventCtx = regEventCtx = (id, interceptors, handler) =>
    [interceptors, handler] = [[], interceptors] unless handler
    _duplicate "event", id  if (deref events)[id]
    swap events, assoc, id, [(flatten interceptors.filter identity), handler]
    undefined

  ### Unregisters one or all event handlers ###
  _exports.clearEvent = clearEvent = _clear events

  ###
    Context structure:
    {:coeffects {:event [:some-id :some-param]
                 :db    "original contents of app-db"}
     :effects   {:db    "new value for app-db>"
                 :dispatch  [:an-event-id :param1]}
     :queue     "a collection of further interceptors"
     :stack     "a collection of interceptors already walked"}
  ###
  _intercept = (context, hook) => # every step is dynamic so no chains, folds or for-loops
    context = merge context, stack: [], queue: context.stack
    while context.queue.length > 0
      [x, ...xs] = context.queue
      context = x[hook] (merge context, queue: xs)
      context = merge context, stack: [x, ...context.stack]
    context

  ### Dispatches an event (running back and forth through interceptor chain & handler then actions effects) ###
  _exports.dispatchSync = dispatchSync = (event) => unless (it = (deref events)[ event[0] ]) then _noHandler "event", event else
    [stack, handler] = it
    context = {stack, coeffects: {event, db: _deref appDb}}
    chain context, [_intercept, 'before'], handler, [_intercept, 'after'], getEffect, entries, _fx

  _dispatch = ({ms, dispatch}) =>
    _eventQueue.add id = setTimeout (=> _eventQueue.delete id;  dispatchSync dispatch), ms
    id
  ### Schedules dispatching of an event ###
  _exports.dispatch = dispatch = (dispatch) => _dispatch {dispatch}

  _fx = (fxs, fx=deref effects) => fxs.filter(identity).forEach ([k, v]) =>
    if (it = fx[k] or _effects[k])  then it v  else _noHandler "effect", [k]
  _effects = # builtin effects
    db:            (value) => reset appDb, value  unless _eq_ value, _deref appDb
    fx:            _fx
    dispatchLater: _dispatch
    dispatch:      (dispatch) => _dispatch {dispatch}

  ### Registers an effect handler (implementation of a side-effect) ###
  _exports.regFx = (id, handler) =>
    _duplicate "effect", id  if (deref effects)[id]
    swap effects, assoc, id, handler
    undefined
  ### Unregisters one or all effect handlers (excepting builtin ones) ###
  _exports.clearFx = _clear effects

  ### Convenience function (for JS); returns deref'ed result of a subscription ###
  _exports.dsub = (query) => deref subscribe query
  ### Convenience function (for fx); schedules dispatching an event (if present) with additional parameters ###
  _exports.disp = (evt, ...args) => evt and dispatch [...evt, ...args]

  Object.defineProperty _exports, 'namespace', value: namespace  # read-only (just in case)


module.exports = Object.assign (inNamespace ''), {_init}
