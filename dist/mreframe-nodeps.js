require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"mreframe/atom":[function(require,module,exports){
(function() {
  var Atom, compareAndSet, deref, multi, reset, resetVals, swap, swapVals, type;

  ({multi, type} = require('./util'));

  exports.deref = deref = multi(type);

  // these default definitions are clearly non-atomic but JS is single-threaded anyway
  exports.resetVals = resetVals = (multi(type)).default((self, value) => {
    return [deref(self), reset(self, value)];
  });

  exports.reset = reset = (multi(type)).default((self, value) => {
    return swap(self, () => {
      return value;
    });
  });

  exports.swapVals = swapVals = (multi(type)).default((self, f, ...args) => {
    return resetVals(self, f(deref(self), ...args));
  });

  exports.swap = swap = (multi(type)).default((...args) => {
    return (swapVals(...args))[1];
  });

  exports.compareAndSet = compareAndSet = multi(type).default((self, oldval, newval) => {
    return (oldval === deref(self)) && (reset(self, newval), true);
  });

  Atom = function(x1) {
    this.x = x1;
  };

  deref.when(Atom, (self) => {
    return self.x;
  });

  reset.when(Atom, (self, value) => {
    return self.x = value;
  });

  exports.atom = (x) => {
    return new Atom(x);
  };

}).call(this);

},{"./util":"mreframe/util"}],"mreframe/jsx-runtime":[function(require,module,exports){
(function() {
  var jsx, r;

  r = require('./reagent');

  jsx = (tag, {children = [], ...attrs}, key) => { // this API isn't documented properly...
    return r.with({key, ...attrs}, [tag].concat(children));
  };

  module.exports = {
    jsx,
    jsxs: jsx,
    Fragment: '<>'
  };

}).call(this);

},{"./reagent":"mreframe/reagent"}],"mreframe/re-frame":[function(require,module,exports){
(function() {

  /*
    Context structure:
    {:coeffects {:event [:some-id :some-param]
                 :db    "original contents of app-db"}
     :effects   {:db    "new value for app-db>"
                 :dispatch  [:an-event-id :param1]}
     :queue     "a collection of further interceptors"
     :stack     "a collection of interceptors already walked"}
  */
  var _calcSignals, _calcSub, _clear, _ctxEvt, _cursors, _deref, _dispatch, _duplicate, _effects, _eq_, _eventQueue, _fx, _getDb, _getX, _initReagent, _intercept, _invalidSignals, _noHandler, _pathKey, _replaceEvent, _restoreEvent, _signals, _subscriptionCache, appDb, assoc, assocCoeffect, assocEffect, assocIn, atom, chain, chunks, clearEvent, coeffects, cursor, deref, dict, dispatch, dispatchSync, dissoc, effects, entries, eq, eqShallow, events, flatten, getCoeffect, getEffect, getIn, identical, identity, isArray, isDict, isFn, keys, merge, ratom, regEventCtx, regEventFx, repr, reset, subscribe, subscriptions, swap, toInterceptor, update,
    splice = [].splice;

  ({identical, eq, eqShallow, keys, dict, entries, isArray, isDict, isFn, getIn, merge, assoc, assocIn, dissoc, update, repr, identity, chunks, flatten, chain} = require('./util'));

  ({atom, deref, reset, swap} = require('./atom'));

  ({
    _init: _initReagent,
    atom: ratom,
    cursor
  } = require('./reagent'));

  _eq_ = eq;

  exports._init = (opts) => {
    _initReagent(opts);
    _eq_ = (opts != null ? opts.eq : void 0) || _eq_;
    return void 0;
  };

  /* Application state atom */
  exports.appDb = appDb = ratom({});

  events = atom({});

  effects = atom({});

  coeffects = atom({});

  subscriptions = atom({});

  _noHandler = (kind, [key]) => {
    return console.error(`re-frame: no ${kind} handler registered for: '${key}'`);
  };

  _duplicate = (kind, key) => {
    return console.warn(`re-frame: overwriting ${kind} handler for: '${key}'`);
  };

  _subscriptionCache = new Map();

  /* Removes cached subscriptions (forcing to recalculate) */
  exports.clearSubscriptionCache = () => {
    return _subscriptionCache.clear();
  };

  _eventQueue = new Set();

  /* Cancels all scheduled events */
  exports.purgeEventQueue = () => {
    _eventQueue.forEach(clearTimeout);
    return _eventQueue.clear();
  };

  _clear = (atom) => {
    return (id) => {
      if (id) {
        swap(atom, dissoc, id);
      } else {
        reset(atom, {});
      }
      return void 0;
    };
  };

  _invalidSignals = () => {
    throw SyntaxError("re-frame: invalid subscription signals");
  };

  _signals = (signals) => {
    var queries;
    if (!signals.every(([k, q]) => {
      return (k === '<-') && isArray(q);
    })) {
      _invalidSignals();
    }
    queries = signals.map((kq) => {
      return kq[1];
    });
    if (queries.length === 1) {
      return () => {
        return subscribe(queries[0]);
      };
    } else {
      return () => {
        return queries.map(subscribe);
      };
    }
  };

  _deref = (ratom) => {
    return ratom._deref(); // parent ratom is not to be propagated
  };

  _calcSignals = (signals) => {
    if (isArray(signals)) {
      return signals.map(_deref);
    } else if (!isDict(signals)) {
      return _deref(signals);
    } else {
      return dict(entries(signals).map(([k, v]) => {
        return [k, _deref(v)];
      }));
    }
  };

  /* Registers a subscription function to compute view data */
  exports.regSub = (id, ...signals) => {
    var computation, ref;
    ref = signals, [...signals] = ref, [computation] = splice.call(signals, -1);
    signals = signals.length === 0 ? () => {
      return appDb;
    } : signals.length !== 1 ? _signals(chunks(signals, 2)) : isFn(signals[0]) ? signals[0] : _invalidSignals();
    if ((deref(subscriptions))[id]) {
      _duplicate("subscription", id);
    }
    swap(subscriptions, assoc, id, [signals, computation]);
    return void 0;
  };

  _calcSub = (signals, computation) => {
    return (query) => {
      var input, input_, key, output, x;
      input = _calcSignals(signals(query));
      if (_subscriptionCache.has(key = repr(query))) {
        [input_, output] = _subscriptionCache.get(key);
        if (eqShallow(input, input_)) {
          return output;
        }
      }
      x = computation(input, query);
      _subscriptionCache.set(key, [input, x]);
      return x;
    };
  };

  _cursors = new Map();

  /* Returns an RCursor that derefs to subscription result (or cached value) */
  exports.subscribe = subscribe = (query) => {
    var it, key;
    if (!(it = (deref(subscriptions))[query[0]])) {
      return _noHandler("subscription", query);
    } else {
      if (!_cursors.has(key = repr(query))) {
        _cursors.set(key, cursor(_calcSub(...it), query));
      }
      return _cursors.get(key);
    }
  };

  /* Unregisters one or all subscription functions */
  exports.clearSub = ((_clearSubs) => {
    return (id) => {
      id || _cursors.clear();
      return _clearSubs(id);
    };
  })(_clear(subscriptions));

  /*
    Produces an interceptor (changed from varargs to options object).

    Interceptor structure:
    {:id      :something             ;; decorative only - can be ignored
     :before  (fn [context] ...)     ;; returns a possibly modified `context`
     :after   (fn [context] ...)}    ;; returns a possibly modified `context`
  */
  exports.toInterceptor = toInterceptor = (args) => {
    return {
      id: args != null ? args.id : void 0,
      before: (args != null ? args.before : void 0) || identity,
      after: (args != null ? args.after : void 0) || identity
    };
  };

  _getX = (x, key, notFound) => {
    if (!key) {
      return x;
    } else if (key in (x || {})) {
      return x[key];
    } else {
      return notFound;
    }
  };

  /* Returns context coeffects or specified coeffect */
  exports.getCoeffect = getCoeffect = (context, key, notFound) => {
    return _getX(context.coeffects, key, notFound);
  };

  /* Returns context effects or specified effect */
  exports.getEffect = getEffect = (context, key, notFound) => {
    return _getX(context.effects, key, notFound);
  };

  /* Produces a copy of the context with added coeffect */
  exports.assocCoeffect = assocCoeffect = (context, key, value) => {
    return assocIn(context, ['coeffects', key], value);
  };

  /* Produces a copy of the context with added effect */
  exports.assocEffect = assocEffect = (context, key, value) => {
    return assocIn(context, ['effects', key], value);
  };

  /* Produces a copy of the context with interceptors added to the queue */
  exports.enqueue = (context, interceptors) => {
    return update(context, 'queue', (xs) => {
      return [...xs, ...interceptors];
    });
  };

  _getDb = (context) => {
    return getEffect(context, 'db', getCoeffect(context, 'db'));
  };

  _pathKey = 're-frame-path/db-store';

  /* Produces an interceptor which switches out db for its subpath */
  exports.path = (...path) => {
    return toInterceptor({
      id: 'path',
      before: (context) => {
        var db, dbs;
        db = getCoeffect(context, 'db');
        dbs = [...(context[_pathKey] || []), db];
        return chain(context, [assoc, _pathKey, dbs], [assocCoeffect, 'db', getIn(db, flatten(path))]);
      },
      after: (context) => {
        var db, dbs, ref;
        ref = context[_pathKey], [...dbs] = ref, [db] = splice.call(dbs, -1);
        return chain(context, [assoc, _pathKey, dbs], [assocEffect, 'db', assocIn(db, flatten(path), _getDb(context))], [assocCoeffect, 'db', db]);
      }
    });
  };

  /* Produces an interceptor which updates db effect after the event handler */
  exports.enrich = (f) => {
    return toInterceptor({
      id: 'enrich',
      after: (context) => {
        return assocEffect(context, 'db', f(_getDb(context), getCoeffect(context, 'event')));
      }
    });
  };

  _replaceEvent = (f) => {
    return (context) => {
      var event;
      event = getCoeffect(context, 'event');
      return chain(context, [assocCoeffect, 'originalEvent', event], [assocCoeffect, 'event', f(event)]);
    };
  };

  _restoreEvent = (context) => {
    return assocCoeffect(context, 'event', getCoeffect(context, 'originalEvent'));
  };

  /* An interceptor switches out event for its 1st parameter */
  exports.unwrap = toInterceptor({
    id: 'unwrap',
    after: _restoreEvent,
    before: _replaceEvent((event) => {
      return event[1];
    })
  });

  /* An interceptor switches out event for its parameters */
  exports.trimV = toInterceptor({
    id: 'trim-v',
    after: _restoreEvent,
    before: _replaceEvent((event) => {
      return event.slice(1);
    })
  });

  /* Produces an interceptor which updates runs an action on db/event after the event handler */
  exports.after = (f) => {
    return toInterceptor({
      id: 'after',
      after: (context) => {
        f(_getDb(context), getCoeffect(context, 'event'));
        return context;
      }
    });
  };

  /* Produces an interceptor which recalculates db subpath if input subpaths changed */
  exports.onChanges = (f, outPath, ...inPaths) => {
    return toInterceptor({
      id: 'on-changes',
      after: (context) => {
        var db0, db1, ins, outs;
        db0 = getCoeffect(context, 'db');
        db1 = _getDb(context);
        [ins, outs] = [db0, db1].map((db) => {
          return inPaths.map((path) => {
            return getIn(db, path);
          });
        });
        if (outs.every((x, i) => {
          return identical(x, ins[i]);
        })) {
          return context;
        } else {
          return assocEffect(context, 'db', assocIn(db1, outPath, f(...outs)));
        }
      }
    });
  };

  /* Registers a coeffect handler (for use as an interceptor) */
  exports.regCofx = (id, handler) => {
    if ((deref(coeffects))[id]) {
      _duplicate("coeffect", id);
    }
    swap(coeffects, assoc, id, handler);
    return void 0;
  };

  /* Produces an interceptor which applies a coeffect handler before the event handler */
  exports.injectCofx = (key, arg) => {
    return toInterceptor({
      id: key,
      before: (context) => {
        var it;
        if ((it = (deref(coeffects))[key])) {
          return update(context, 'coeffects', (deref(coeffects))[key], arg);
        } else {
          _noHandler("coeffect", [key]);
          return context;
        }
      }
    });
  };

  /* Unregisters one or all coeffect handlers */
  exports.clearCofx = _clear(coeffects);

  /* Registers an event handler which calculates new application state from the old one */
  exports.regEventDb = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    return regEventFx(id, interceptors, (cofx, query) => {
      return {
        db: handler(cofx.db, query)
      };
    });
  };

  _ctxEvt = (handler) => {
    return (context) => {
      return merge(context, {
        effects: handler(getCoeffect(context), getCoeffect(context, 'event'))
      });
    };
  };

  /* Registers an event handler which calculates effects from coeffects */
  exports.regEventFx = regEventFx = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    return regEventCtx(id, interceptors, _ctxEvt(handler));
  };

  /* Registers an event handler which arbitrarily updates the context */
  exports.regEventCtx = regEventCtx = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    if ((deref(events))[id]) {
      _duplicate("event", id);
    }
    swap(events, assoc, id, [flatten(interceptors.filter(identity)), handler]);
    return void 0;
  };

  /* Unregisters one or all event handlers */
  exports.clearEvent = clearEvent = _clear(events);

  _intercept = (context, hook) => { // every step is dynamic so no chains, folds or for-loops
    var x, xs;
    context = merge(context, {
      stack: [],
      queue: context.stack
    });
    while (context.queue.length > 0) {
      [x, ...xs] = context.queue;
      context = x[hook](merge(context, {
        queue: xs
      }));
      context = merge(context, {
        stack: [x, ...context.stack]
      });
    }
    return context;
  };

  /* Dispatches an event (running back and forth through interceptor chain & handler then actions effects) */
  exports.dispatchSync = dispatchSync = (event) => {
    var context, handler, it, stack;
    if (!(it = (deref(events))[event[0]])) {
      return _noHandler("event", event);
    } else {
      [stack, handler] = it;
      context = {
        stack,
        coeffects: {
          event,
          db: _deref(appDb)
        }
      };
      return chain(context, [_intercept, 'before'], handler, [_intercept, 'after'], getEffect, entries, _fx);
    }
  };

  _dispatch = ({ms, dispatch}) => {
    var id;
    _eventQueue.add(id = setTimeout((() => {
      _eventQueue.delete(id);
      return dispatchSync(dispatch);
    }), ms));
    return id;
  };

  /* Schedules dispatching of an event */
  exports.dispatch = dispatch = (dispatch) => {
    return _dispatch({dispatch});
  };

  _fx = (fxs, fx = deref(effects)) => {
    return fxs.filter(identity).forEach(([k, v]) => {
      var it;
      if ((it = fx[k] || _effects[k])) {
        return it(v);
      } else {
        return _noHandler("effect", [k]);
      }
    });
  };

  _effects = { // builtin effects
    db: (value) => {
      if (!_eq_(value, _deref(appDb))) {
        return reset(appDb, value);
      }
    },
    fx: _fx,
    dispatchLater: _dispatch,
    dispatch: (dispatch) => {
      return _dispatch({dispatch});
    }
  };

  /* Registers an effect handler (implementation of a side-effect) */
  exports.regFx = (id, handler) => {
    if ((deref(effects))[id]) {
      _duplicate("effect", id);
    }
    swap(effects, assoc, id, handler);
    return void 0;
  };

  /* Unregisters one or all effect handlers (excepting builtin ones) */
  exports.clearFx = _clear(effects);

  /* Convenience function (for JS); returns deref'ed result of a subscription */
  exports.dsub = (query) => {
    return deref(subscribe(query));
  };

  /* Convenience function (for fx); schedules dispatching an event (if present) with additional parameters */
  exports.disp = (evt, ...args) => {
    return evt && dispatch([...evt, ...args]);
  };

}).call(this);

},{"./atom":"mreframe/atom","./reagent":"mreframe/reagent","./util":"mreframe/util"}],"mreframe/reagent":[function(require,module,exports){
(function() {
  var RAtom, RCursor, _createElement, _cursor, _detectChanges, _eqArgs, _fnElement, _fragment_, _meta, _mithril_, _mount_, _moveParent, _propagate, _quiet, _quietEvents, _redraw_, _renderCache, _rendering, _vnode, _with, argv, asElement, assocIn, atom, children, classNames, deref, eqShallow, getIn, identical, identity, isArray, keys, merge, prepareAttrs, props, ratom, reset, second, stateAtom, swap;

  ({identical, eqShallow, isArray, keys, getIn, merge, assocIn, identity} = require('./util'));

  ({atom, deref, reset, swap} = require('./atom'));

  _mount_ = _redraw_ = _mithril_ = identity;

  _fragment_ = second = (a, b) => {
    return b;
  };

  exports._init = (opts) => {
    _mithril_ = (opts != null ? opts.hyperscript : void 0) || _mithril_;
    _fragment_ = _mithril_.fragment || second;
    _redraw_ = (opts != null ? opts.redraw : void 0) || _redraw_;
    _mount_ = (opts != null ? opts.mount : void 0) || _mount_;
    return void 0;
  };

  _vnode = null; // contains vnode of most recent component

  _renderCache = new Map();

  /* Reset function components cache. */
  exports.resetCache = () => {
    return _renderCache.clear();
  };

  _propagate = (vnode, ratom, value) => {
    while (vnode) {
      vnode.state._subs.set(ratom, value);
      vnode = vnode._parent;
    }
    return value;
  };

  _eqArgs = (xs, ys) => {
    return (!xs && !ys) || ((xs != null ? xs.length : void 0) === (ys != null ? ys.length : void 0) && eqShallow(xs._meta, ys._meta) && xs.every((x, i) => {
      return eqShallow(x, ys[i]);
    }));
  };

  _detectChanges = function(vnode) {
    var subs;
    return !_eqArgs(vnode.attrs.argv, this._argv) || ((subs = Array.from(this._subs)).some(([ratom, value]) => {
      return ratom._deref() !== value;
    })) || (subs.forEach(([ratom, value]) => {
      return _propagate(vnode._parent, ratom, value);
    }), false); // no changes, propagating ratoms
  };

  _rendering = (binding) => {
    return function(vnode) {
      var _old;
      _old = _vnode;
      _vnode = vnode;
      try {
        this._subs.clear();
        this._argv = vnode.attrs.argv; // last render args
        return binding.call(this, vnode);
      } finally {
        _vnode = _old;
      }
    };
  };

  _fnElement = (fcomponent) => {
    var component;
    if (!_renderCache.has(fcomponent)) {
      component = {
        oninit: function(vnode) {
          this._comp = component; // self
          this._subs = new Map(); // input ratoms (resets before render)
          this._atom = ratom(); // state ratom;  ._subs should work for it as well
          this._view = fcomponent;
          return void 0;
        },
        onbeforeupdate: _detectChanges,
        view: _rendering(function(vnode) {
          var args, x;
          x = this._view.apply(vnode, (args = vnode.attrs.argv.slice(1)));
          return asElement(typeof x !== 'function' ? x : (this._view = x).apply(vnode, args));
        })
      };
      _renderCache.set(fcomponent, component);
    }
    return _renderCache.get(fcomponent);
  };

  _meta = (meta, o) => {
    if (typeof o === 'object' && !isArray(o)) {
      return [merge(o, meta)];
    } else {
      return [meta, asElement(o)];
    }
  };

  _moveParent = (vnode) => {
    if (vnode.attrs) {
      vnode._parent = vnode.attrs._parent || null; // might be undefined if not called directly from a component
      delete vnode.attrs._parent;
    }
    return vnode;
  };

  /* Converts Hiccup forms into Mithril vnodes */
  exports.asElement = asElement = (form) => {
    var head, meta;
    if (isArray(form)) {
      head = form[0];
      meta = {
        ...(form._meta || {}),
        _parent: _vnode
      };
      if (head === '>') {
        return _createElement(form[1], _meta(meta, form[2]), form.slice(3).map(asElement));
      } else if (head === '<>') {
        return _moveParent(_fragment_(meta, form.slice(1).map(asElement)));
      } else if (typeof head === 'string') {
        return _createElement(head, _meta(meta, form[1]), form.slice(2).map(asElement));
      } else if (typeof head === 'function') {
        return _createElement(_fnElement(head), [
          {
            ...meta,
            argv: form
          }
        ]);
      } else {
        return _createElement(head, [
          {
            ...meta,
            argv: form
          }
        ]);
      }
    } else {
      return form;
    }
  };

  /* Mounts a Hiccup form to a DOM element */
  exports.render = (comp, container) => {
    return _mount_(container, {
      view: () => {
        return asElement(comp);
      }
    });
  };

  /* Adds metadata to the Hiccup form of a Reagent component or a fragment */
  exports.with = _with = (meta, form) => {
    form = form.slice(0);
    form._meta = meta;
    return form;
  };

  /*
    Creates a class component based on the spec. (It's a valid Mithril component.)
    Only a subset of the original reagent functons is supported (mostly based on Mithril hooks):
    constructor, getInitialState, componentDidMount, componentDidUpdate,
    componentWillUnmount, shouldComponentUpdate, render, reagentRender (use symbols in Wisp).
    Also, beforeComponentUnmounts was added (see 'onbeforeremove' in Mithril).
    Instead of 'this', vnode is passed in calls.
    NOTE: shouldComponentUpdate overrides Reagent changes detection
  */
  exports.createClass = (spec) => {
    var bind, component;
    bind = (k, method = spec[k]) => {
      return method && ((vnode, args) => {
        _vnode = vnode;
        try {
          return method.apply(vnode, args || [vnode]);
        } finally {
          _vnode = null;
        }
      });
    };
    return component = {
      oninit: function(vnode) {
        var base, base1;
        this._comp = component;
        this._subs = new Map();
        this._atom = ratom(typeof (base = bind('getInitialState')) === "function" ? base(vnode) : void 0);
        if (typeof (base1 = bind('constructor')) === "function") {
          base1(vnode, [vnode, vnode.attrs]);
        }
        return void 0;
      },
      oncreate: bind('componentDidMount'),
      onupdate: bind('componentDidUpdate'),
      onremove: bind('componentWillUnmount'),
      onbeforeupdate: bind('shouldComponentUpdate') || _detectChanges,
      onbeforeremove: bind('beforeComponentUnmounts'),
      view: _rendering(spec.render || ((render) => {
        return function(vnode) {
          return asElement(render.apply(vnode, vnode.attrs.argv.slice(1)));
        };
      })(spec.reagentRender))
    };
  };

  RAtom = function(x1) {
    this.x = x1;
    this._deref = (() => {
      return this.x;
    });
    return void 0; // ._deref doesn't cause propagation
  };

  deref.when(RAtom, (self) => {
    return _propagate(_vnode, self, self._deref());
  });

  reset.when(RAtom, (self, value) => {
    if (identical(value, self.x)) {
      return value;
    } else {
      self.x = value;
      _redraw_();
      return value;
    }
  });

  /* Produces an atom which causes redraws on update */
  exports.atom = ratom = (x) => {
    return new RAtom(x);
  };

  RCursor = function(src1, path1) {
    this.src = src1;
    this.path = path1;
    this._deref = (() => {
      return this.src(this.path);
    });
    return void 0;
  };

  deref.when(RCursor, (self) => {
    return _propagate(_vnode, self, self._deref());
  });

  reset.when(RCursor, (self, value) => {
    if (identical(value, self._deref())) {
      return value;
    } else {
      self.src(self.path, value);
      _redraw_();
      return value;
    }
  });

  _cursor = (ratom) => {
    return (path, value) => { // value is optional but undefined would be replaced with fallback value anyway
      if (value === void 0) {
        return getIn(ratom._deref(), path);
      } else {
        return swap(ratom, assocIn, path, value);
      }
    };
  };

  /* Produces a cursor (sub-state atom) from a path and either a r.atom or a getter/setter function */
  exports.cursor = (src, path) => {
    return new RCursor((typeof src === 'function' ? src : _cursor(src)), path);
  };

  /* Converts a Mithril component into a Reagent component */
  exports.adaptComponent = (c) => {
    return (...args) => {
      return _with(_vnode != null ? _vnode.attrs : void 0, ['>', c, ...args]);
    };
  };

  /* Merges provided class definitions into a string (definitions can be strings, lists or dicts) */
  exports.classNames = classNames = (...classes) => {
    var cls;
    cls = classes.reduce(((o, x) => {
      if (typeof x !== 'object') {
        x = `${x}`.split(' ');
      }
      return merge(o, (!isArray(x) ? x : merge(...x.map((k) => {
        return k && {
          [k]: k
        };
      }))));
    }), {});
    return (keys(cls)).filter((k) => {
      return cls[k];
    }).join(' ');
  };

  _quiet = (handler) => {
    if (typeof handler !== 'function') {
      return handler;
    } else {
      return function(event) {
        event.redraw = false;
        return handler.call(this, event);
      };
    }
  };

  _quietEvents = (attrs, o = {}) => {
    var k, v;
    for (k in attrs) {
      v = attrs[k];
      (o[k] = k.slice(0, 2) !== 'on' ? v : _quiet(v));
    }
    return o;
  };

  prepareAttrs = (tag, props) => {
    if (typeof tag !== 'string') {
      return props;
    } else {
      return ['class', 'className', 'classList'].reduce(((o, k) => {
        o[k] && (o[k] = classNames(o[k]));
        return o;
      }), _quietEvents(props));
    }
  };

  _createElement = (type, first, rest) => { // performance optimization
    var _rest, ref, ref1;
    _rest = ((ref = first[1]) != null ? (ref1 = ref.attrs) != null ? ref1.key : void 0 : void 0) != null ? rest : [rest];
    return _moveParent(_mithril_(type, prepareAttrs(type, first[0]), first[1], ..._rest));
  };

  /* Invokes Mithril directly to produce a vnode (props are optional if no children are given) */
  exports.createElement = (type, props, ...children) => {
    return _createElement(type, [props || {}], children);
  };

  /* Produces the vnode of current (most recent?) component */
  exports.currentComponent = () => {
    return _vnode;
  };

  /* Returns children of the Mithril vnode */
  exports.children = children = (vnode) => {
    return vnode.children;
  };

  /* Returns props of the Mithril vnode */
  exports.props = props = (vnode) => {
    return vnode.attrs;
  };

  /* Produces the Hiccup form of the Reagent component from vnode */
  exports.argv = argv = (vnode) => {
    return vnode.attrs.argv;
  };

  /* Returns RAtom containing state of a Reagent component (from vnode) */
  exports.stateAtom = stateAtom = (vnode) => {
    return vnode.state._atom;
  };

  /* Returns state of a Reagent component (from vnode) */
  exports.state = (vnode) => {
    return deref(stateAtom(vnode));
  };

  /* Replaces state of a Reagent component (from vnode) */
  exports.replaceState = (vnode, newState) => {
    return reset(stateAtom(vnode), newState);
  };

  /* Partially updates state of a Reagent component (from vnode) */
  exports.setState = (vnode, newState) => {
    return swap(stateAtom(vnode), merge, newState);
  };

}).call(this);

},{"./atom":"mreframe/atom","./util":"mreframe/util"}],"mreframe/util":[function(require,module,exports){
(function() {
  var _dict, _entries, assoc, assocIn, entries, eq, eqArr, eqObj, eqObjShallow, eqShallow, flatten, getIn, identical, identity, isArray, isDict, keys, merge, replacer, sorter, type, update, vals;

  exports.identity = identity = (x) => {
    return x;
  };

  exports.type = type = (x) => {
    if (x == null) {
      return x;
    } else {
      return Object.getPrototypeOf(x).constructor;
    }
  };

  exports.keys = keys = (x) => {
    return Object.keys(x || {});
  };

  exports.vals = vals = (x) => {
    return Object.values(x || {});
  };

  _entries = Object.entries || ((o) => {
    return keys(o).map((k) => {
      return [k, o[k]];
    });
  });

  exports.entries = entries = (o) => {
    return _entries(o || {});
  };

  _dict = Object.fromEntries || ((kvs) => {
    return merge(...kvs.map(([k, v]) => {
      return {
        [k]: v
      };
    }));
  });

  exports.dict = (x) => {
    return _dict(x || []);
  };

  exports.isArray = isArray = Array.isArray;

  exports.isDict = isDict = (x) => {
    return (type(x)) === Object;
  };

  exports.isFn = (x) => {
    return (typeof x) === 'function';
  };

  exports.merge = merge = (...os) => {
    return Object.assign({}, ...os);
  };

  exports.assoc = assoc = (o, k, v) => {
    o = isArray(o) && Number.isInteger(k) && k >= 0 ? o.slice(0) : {...o};
    o[k] = v;
    return o;
  };

  exports.dissoc = (o, ...ks) => {
    o = isArray(o) ? o.slice(0) : {...o};
    ks.forEach((k) => {
      return delete o[k];
    });
    return o;
  };

  exports.update = update = (o, k, f, ...args) => {
    return assoc(o, k, f(o != null ? o[k] : void 0, ...args));
  };

  exports.getIn = getIn = (o, path) => {
    return path.reduce(((x, k) => {
      return x != null ? x[k] : void 0;
    }), o);
  };

  exports.assocIn = assocIn = (o, path, v) => {
    if (path.length < 2) {
      return assoc(o, path[0], v);
    } else {
      return update(o, path[0], assocIn, path.slice(1), v);
    }
  };

  exports.updateIn = (o, path, f, ...args) => {
    return assocIn(o, path, f(getIn(o, path), ...args));
  };

  // dissocIn = (o, path, ...ks) => updateIn o, path, dissoc, ...ks
  exports.chunks = (xs, n) => {
    return Array.from({
      length: Math.ceil(xs.length / n)
    }, (_, i) => {
      return xs.slice(n * i, n * (i + 1));
    });
  };

  exports.flatten = flatten = (xs) => {
    if (!isArray(xs)) {
      return xs;
    } else {
      return xs.flatMap(flatten);
    }
  };

  exports.repr = (x) => {
    return JSON.stringify(x, replacer);
  };

  exports.identical = identical = (a, b) => {
    return a === b || (a !== a && b !== b);
  };

  exports.eq = eq = (a, b) => {
    return a === b || (a !== a ? b !== b : isArray(a) ? (isArray(b)) && eqArr(a, b, eq) : (isDict(a)) && (isDict(b)) && eqObj(a, b));
  };

  exports.eqShallow = eqShallow = (a, b) => {
    return a === b || (a !== a ? b !== b : isArray(a) ? (isArray(b)) && eqArr(a, b, identical) : (isDict(a)) && (isDict(b)) && eqObjShallow(a, b));
  };

  sorter = (o) => {
    return _dict((entries(o)).sort());
  };

  replacer = (_, v) => {
    if (type(v) === RegExp) {
      return `${v}`;
    } else if (!isDict(v)) {
      return v;
    } else {
      return sorter(v);
    }
  };

  eqArr = (xs, ys, eq) => {
    return xs.length === ys.length && xs.every((x, i) => {
      return eq(x, ys[i]);
    });
  };

  eqObj = (a, b, aks = keys(a), bks = new Set(keys(b))) => {
    return aks.length === bks.size && aks.every((k) => {
      return bks.has(k);
    }) && aks.every((k) => {
      return eq(a[k], b[k]);
    });
  };

  eqObjShallow = (a, b, aks = keys(a)) => {
    return aks.length === keys(b).length && aks.every((k) => {
      return k in b && identical(a[k], b[k]);
    });
  };

  exports.chain = (x, ...fs) => {
    return fs.map((f) => {
      if (isArray(f)) {
        return f;
      } else {
        return [f];
      }
    }).reduce(((x, f) => {
      return f[0](x, ...f.slice(1));
    }), x);
  };

  exports.multi = (dispatch = identity) => {
    var _default, _methods, self;
    _methods = new Map();
    _default = () => {
      throw TypeError("Invalid arguments");
    };
    return self = Object.assign(((...args) => {
      return ((_methods.get(dispatch(...args))) || _default)(...args);
    }), {
      when: (k, f) => {
        _methods.set(k, f);
        return self;
      },
      default: (f) => {
        _default = f;
        return self;
      }
    });
  };

}).call(this);

},{}],"mreframe":[function(require,module,exports){
(function() {
  var _init, atom, exports, reFrame, reagent, util;

  util = require('./util');

  atom = require('./atom');

  reagent = require('./reagent');

  ({_init} = reFrame = require('./re-frame'));

  exports = {util, atom, reagent, reFrame, _init};

  module.exports = exports; // preventing removal by tree-shaking

}).call(this);

},{"./atom":"mreframe/atom","./re-frame":"mreframe/re-frame","./reagent":"mreframe/reagent","./util":"mreframe/util"}]},{},[]);
