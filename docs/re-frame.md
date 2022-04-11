## `re-frame` module

Based on ClojureScript [re-frame](https://day8.github.io/re-frame) library; used for managing state, events and side-effects
in a [reagent](reagent.md) application.

Suggested imported module name is `rf`.

The general usage is as follows:
- a view (component) can dispatch events (`rf.dispatch()`/`rf.dispatchSync()`), and subscribe to queries (`rf.subscribe()`)
- an event handler is a pure function which receives event query and current state (computed by coeffects),
  and returns a set of effects to be actioned later (dictionary of key-value pairs, each determining an effect and its argument)
- a coeffect is a value obtained via impure calculation (like _current_ time or a `localStorage` value)
- an effect is a function which produces side-effects (like sending AJAX requests or updating `localStorage`)
- an interceptor is a modifier which is added to event processing chain to alter its coeffects or effects
- interceptors have 2 methods (`before` & `after`); `before` is called when processing the chain upwards to the event handler,
  `after` is called when the event handler had been run and chain is being processed downwards

Aside from implementing most of re-frame API, this module exports 2 helper functions: `dsub` (`deref`+`subscribe`), and `disp`
(`dispatch` wrapper to be used in effects, includes event existence check & allows for supplying additional parameters).

Includes 4 built-in effects (see [`rf.regEventFx`](#regeventfx-id-interceptors-handler)): [`db`](#db-builtin-effect),
[`fx`](#fx-builtin-effect), [`dispatch`](#dispatch-builtin-effect), and [`dispatchLater`](#dispatchlater-builtin-effect).

### `_init (opts)`
A setup function (only necessary if you're using `nodeps` bundle); `opts` may include:
* `eq`: deep equality comparison (for db update checks; defaults to [`util.eq`](util.md#eq-a-b));
* additional `opts` for [`r._init()`](reagent.md#_init-opts).

This is the `_init` exported in the main `mreframe` module. It also invokes [`r._init()`](reagent.md#_init-opts),
which is where most `opts` are actually used.

To replace db update checks with shallow-equality, run `rf._init({eq: eqShallow})`, and to use identity checks instead,
run `rf._init({eq: identical})` (see [`util`](util.md)).

### [`dispatch (event)`](https://day8.github.io/re-frame/api-re-frame.core/#dispatch)
Asynchronously dispatches an event (described as `['id', ...args]`).
```js
rf.dispatch(['set', 'key', value]) // dispatches event ['set', 'key', value] after a tick
```

### [`dispatchSync (event)`](https://day8.github.io/re-frame/api-re-frame.core/#dispatch-sync)
Dispatches an event _immediately_ (use for synchronous updates,
like `oninput` of a text fields with supplied `value`, or for state initialization).
```js
rf.dispatchSync(['set', 'key', value]) // *immediately* dispatches the event
rf.dispatchSync(['init-db', initialState])
```

### [`regEventDb (id, [interceptors], handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-event-db)
Assigns `handler` to event `id`, with optional `interceptors` added to the processing chain;
handler accepts `(db, event)` as arguments and returns new `db`.
```js
rf.regEventDb('set', (db, [_, key, value]) => assoc(db, key, value))
rf.regEventDb('set-in', [trimV], (db, [path, value]) => // removed event id from the query
ssocIn(db, path, value))
```

### [`regEventFx (id, [interceptors], handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-event-fx)
Same, but handler accepts `(coeffects, event)` as arguments (`db` is accessible as `coffects.db`) and returns `effects`
(dict of key-value pairs describing effects to be actioned; the one updating app-db is called `'db'`).
```js
rf.regEventFx('fetch-data', ({db}, [_, url, key]) =>
  ({db:    assoc(db, 'lastUrl', url),
    fetch: {url, onSuccess: ['set', key]}}))
rf.regEventFx('show-time', [rf.injectCofx('now')], ({time}, _) => // 'time' supplied by custom coeffect
  ({alert: `Current time is ${time}`}))
```

### [`regEventCtx (id, [interceptors], handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-event-ctx)
Same, but handler accepts `(context)` as argument.
```js
rf.regEventCtx('debug', context => ({...context, effects: {log: context}}))  // logs context value
rf.regEventCtx('walk-back', [injectCofx(foo), injectCofx(bar)], context =>
  ({...context, stack: context.stack.slice().reverse()})) // reverse interceptors list on walk back
```

### [`clearEvent (id?)`](https://day8.github.io/re-frame/api-re-frame.core/#clear-event)
Removes a single event by `id`, or all events if no `id` was provided.
```js
rf.clearEvent('debug')  // remove event at runtime
rf.clearEvent()         // remove all events
```

### [`regSub (id, computation)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-sub)
Registers a subscription; `computation` accepts `(db, query)` as arguments and returns its result.
```js
rf.regSub('lists', getIn) // supports queries ['lists'], ['lists', id], ['lists', id, 5]…
```

### [`regSub (id, signals, computation)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-sub)
Registers a subscription; `computation` accepts `(inputs, query)` as arguments, with `inputs` depending on result of calling `signals(query)`:
* `deref( signals() )` if `signals` is a function regurning an atom
* `signals().map(deref)` if `signals` is a function returning a list of atoms
* `dict( entries( signals() ).map(([k, v]) => [k, deref(v)]) )` if `signals` is a function returning a dictionary of atoms
```js
rf.regSub('count', ([_, id] => rf.subscribe(['lists', id])), (list, _) => list.length)
rf.regSub('join', ([_, ...ids] => ids.map(id => rf.subscribe(['lists', id]))), (lists, _) =>
  [].concat(...lists))
rf.regSub('subset',
          ([_, foo, bar] => {[foo]: rf.subscribe(['lists', foo]), [bar]: rf.subscribe(['lists', bar])}),
          (o, [_, foo, bar]) => ({foo: o[foo], bar: o[bar]}))
```

### [`regSub (id, ...signals, computation)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-sub)
Same, but `signals` function is presented as a list of subscription shorthands  
(`'<-', ['foo', 1], '<-', ['bar', 2]` is equivalent to `_ => [rf.subscribe(['foo', 1]), rf.subscribe(['bar', 2])]`);  
in case of one subscription it's a single-value instead (`'<-', ['foo', 1]` → `_ => rf.subscribe(['foo', 1])`).
```js
rf.regSub('total-length', '<-', ['lists'], (lists, _) =>
  Object.values(lists).map(xs => xs.length).reduce((n, m) => n+m, 0))
rf.regSub('foo&bar',
          '<-', ['lists', 'foo'],
          '<-', ['lists', 'bar'],
          ([foo, bar], _) => [].concat(foo, bar))
```

### [`subscribe (query)`](https://day8.github.io/re-frame/api-re-frame.core/#subscribe)
Returns an atom which `deref`s to the current value of subscription defined by `query`
(with the result of `computation` being cached by its `signals` for each `query`);
**abstain from passing non-plain data here!** (only scalars, strings, arrays, dicts, and `RegExp`s are supported).
```js
rf.subscribe(['lists', 'foo'])  // cursor that queries 'lists' with parameter 'foo'
```

### [`clearSub (id?)`](https://day8.github.io/re-frame/api-re-frame.core/#clear-event)
Removes a single subscription by `id`, or all subscriptions if no `id` was provided.
```js
rf.clearSub('total-length') // remove subscription at runtime
rf.clearSub()               // remove all subscriptions
```

### [`clearSubscriptionCache ()`](https://day8.github.io/re-frame/api-re-frame.core/#clear-subscription-cache)
Removes all subscriptions from the cache (useful for development/debugging).

### [`regFx (id, handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-fx)
Registers an effect by `id`; `handler` accepts one argument passed by the event that triggers it
(so `foo: 1` triggers effect `foo` with argument `1`).
```js
rf.regFx('fetch', ({url, onSuccess, onFailure}) =>
  fetch(url).then(x => x.text()).then(s => {onSuccess && rf.dispatch([...onSuccess, s])})
            .catch(error => {onFailure && rf.dispatch([...onFailure, error])}))
```

### [`clearFx (id?)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-fx)
Removes a single effect by `id`, or all effects if no `id` was provided.
```js
rf.clearFx('fetch') // remove effect at runtime
rf.clearFx()        // remove all effects
```

### [`toInterceptor ({id, before, after})`](https://day8.github.io/re-frame/api-re-frame.core/#-interceptor)
Produces an interceptor with `before` and `after` methods (`id` is decorative).
```js
let fxLogger = rf.toInterceptor({
  id: 'fx-logger',
  after: context => (console.warn( rf.getEffect(context) ), context),
})
// ⇒ interceptor structure which prints out effects on backtracking (for debug purposes)
rf.regEventFx('some-event', [fxLogger], someFxEvent)
```

### [`regCofx (id, handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-cofx)
Registers a coeffect by `id`; `handler` accepts `(coeffects, arg?)` and returns new `coeffects` dictionary.
```js
rf.regCofx('now', cofx => assoc(cofx, key, new Date())) // see rf.regEventFx example
rf.regCofx('load', (cofx, key) =>
  assoc(cofx, key, JSON.parse(localStorage.getItem(key) || "null")))
```

### [`injectCofx (id, arg?)`](https://day8.github.io/re-frame/api-re-frame.core/#inject-cofx)
Returns an interceptor calling `id` coeffect in its `before` call.
```js
rf.injectCofx('now')          // ⇒ interceptor that supplies current time as coeffects.time
rf.injectCofx('load', 'foo')  // ⇒ interceptor that supplies localStorage.foo as coeffects.foo
rf.regEventFx('reset-foo', [rf.injectCofx('load', 'foo')], ({db, foo}, _) =>
  ({db: merge(db, {foo})}))
```

### [`clearCofx (id?)`](https://day8.github.io/re-frame/api-re-frame.core/#clear-cofx)
Removes a single coeffect by `id`, or all coeffects if no `id` was provided.
```js
rf.clearCofx('now') // remove coeffect at runtime
rf.clearCofx()      // remove all coeffects
```

### [`path (...path)`](https://day8.github.io/re-frame/api-re-frame.core/#path)
Produces an interceptor which substitudes `db` with its `path` in the context with its `before` method,
and replaces subvalue of `db` in `path` with `db` value in context (from `effects` or `coeffects`);
`path` may contain nested lists.
```js
rf.regEventDb('inc-5th-foo', [rf.path('lists', 'foo', 5)], n => n+1)
// equivalent to db => assocIn(db, ['lists', 'foo', 5], 1 + getIn(db, ['lists', 'foo', 5]))
const urls = ['config', 'urls']
let fetchFxEvent = (url, [_, key]) => ({fetch: {url, onSuccess: ['set', key]}})
urlIds.forEach(id => rf.regEventFx(`fetch-${id}`, [rf.path(urls, id)], fetchFxEvent)
// equivalent to {fetch: {url: getIn(db, [...urls, id]), onSuccess: ['set', key]}}
```

### [`enrich (f)`](https://day8.github.io/re-frame/api-re-frame.core/#enrich)
Produces an interceptor which applies `f` to `db` and `event` in its `after` method and replaces `effects.db` with it.

```js
let fallbackStr = rf.enrich((db, [_, key]) => assoc(db, key, db[key] || ""))
rf.regEventDf('set-string', [fallbackStr], (db, [_, key, value]) => assoc(db, key, value))
// ensure that a string value db[key] is never changed to nil
```

### [`unwrap`](https://day8.github.io/re-frame/api-re-frame.core/#unwrap)
An interceptor which replaces event in context with its first parameter (original event is set in `coeffects.originalEvent`).
```js
rf.regEventDb('inc-counter', [rf.unwrap], (db, key) => update(db, key, n => n+1))
rf.dispatch(['inc-counter', 'foo'])
```

### [`trimV`](https://day8.github.io/re-frame/api-re-frame.core/#trim-v)
An interceptor which replaces event in context with its parameters (original event is set in `coeffects.originalEvent`).
```js
rf.regEventFx('log-value', [rf.trimV], (db, path) => ({log: getIn(db, path)}))
rf.dispatch(['log-value', 'lists', 'foo', 5]) // prints out db.lists.foo[5]
rf.dispatch(['log-value'])                    // prints out db
```

### [`after (f)`](https://day8.github.io/re-frame/api-re-frame.core/#after)
Produces an interceptor which applies a side-effect to `db`.
```js
rf.regEventDb('add-list', [rf.trimV, rf.path('lists'), rf.after(console.warn)],
              (lists, [k, v]) => assoc(lists, k, v))
// an event which alters db.lists then prints it out
```

### [`onChanges (f, outPath, ...inPaths)`](https://day8.github.io/re-frame/api-re-frame.core/#on-changes)
Produces an interceptor which updates `outPath` if any of the values on `inPaths` got changed, by calling `f()` on these values.
```js
let concat = (...xss) => [].concat(...xss)
rf.regEventDb('set-list',
              [rf.trimV, rf.path('lists'), rf.onChanges(concat, ['fooBar'], ['foo'], ['bar'])],
              (lists, [k, v]) => assoc(lists, k, v))
// an event which sets a value in db.lists, and recalculates .fooBar if .foo or .bar change
```

### [`getCoeffect (context, key?, notFound?)`](https://day8.github.io/re-frame/api-re-frame.core/#get-coeffect)
Returns coeffects from event context (or one of coeffects by `key`, or `notFound` if it wasn't in there).
```js
rf.getCoeffect(context)             // ⇒ coeffects
rf.getCoeffect(context, 'foo')      // ⇒ coeffects.foo
rf.getCoeffect(context, 'foo', 42)  // ⇒ coeffects.foo or 42 (if .foo was not found)
```

### [`assocCoeffect (context, key, value)`](https://day8.github.io/re-frame/api-re-frame.core/#assoc-coeffect)
Returns updated context where `key` field in `coeffects` is set to `value`
```js
rf.assocCoeffect(context, 'foo', 42)  // ⇒ updated context, coeffects.foo = 42
```

### [`getEffect (context, key?, notFound?)`](https://day8.github.io/re-frame/api-re-frame.core/#get-effect)
Returns effects from event context (or one of effects by `key`, or `notFound` if it wasn't in there).
```js
rf.getEffect(context)                                       // ⇒ effects
rf.getEffect(context, 'db')                                 // ⇒ effects.db
rf.getEffect(context, 'db', rf.getCoeffect(context, 'db'))  // ⇒ effects.db or coeffects.db
```

### [`assocEffect (context, key, value)`](https://day8.github.io/re-frame/api-re-frame.core/#assoc-effect)
Returns updated context where `key` field in `effects` is set to `value`
```js
rf.assocEffect(context, 'db', rf.getCoeffect(context, 'db'))  // reset changes to db
```

### [`enqueue (context, interceptors)`](https://day8.github.io/re-frame/api-re-frame.core/#enqueue)
Adds more interceptors to the end of the interceptors queue.
```js
rf.enqueue(context, [rf.path( rf.getCoeffect('event')[1] )])
// dynamically add rf.path from event parameter
```

### [`purgeEventQueue ()`](https://day8.github.io/re-frame/api-re-frame.core/#purge-event-queue)
Cancels all scheduled events.

### `dsub (query)`
An alias to `deref( subscribe(query) )`.
```js
rf.dsub(['lists', 'foo']) // same as deref( rf.subscribe(['lists', 'foo']) )
```

### `disp (event, ...args)`
A helper for dispatching partial events.
```js
rf.regFx('fetch', ({url, onSuccess, onFailure}) =>
  fetch(url).then(x => x.text()).then(s => rf.disp(onSuccess, s))
            .catch(error => rf.disp(onFailure, error)))
```

### [`'db'`](https://day8.github.io/re-frame/api-builtin-effects/#db) builtin effect
Resets app-db to its argument.
```js
{db: assoc(db, 'answer', 42)}
```

### [`'fx'`](https://day8.github.io/re-frame/api-builtin-effects/#fx) builtin effect
Actions effects in the given order (e.g. `fx: [['foo', 1], ['bar', 2]]` invokes `foo: 1` then `bar: 2`);
also allows for actioning the same effect multiple times, or to action effects conditionally.
```js
{fx: [['db', assoc(db, 'answer', 42)],
      (db.answer !== 42) &&
        ['alert', "State was updated!"]]}
{fx: [['fetch', {url: "/api/foo", onSuccess: ['setFoo']}],
      ['fetch', {url: "/api/bar", onSuccess: ['setBar']}]]}
```

### [`'dispatchLater'`](https://day8.github.io/re-frame/api-builtin-effects/#dispatch-later) builtin effect
Dispatches an event after a delay (see `rf.dispatch()`); expects a dict of `{ms, dispatch}`
(where `ms` is delay time, and `dispatch` is the dispatched event).
```js
{dispatchLater: {dispatch: ['setTitle', "Ready!"], ms: 5000}}
{dispatchLater: {dispatch: ['setAnswer', 42]}}
```

### [`'dispatch'`](https://day8.github.io/re-frame/api-builtin-effects/#dispatch) builtin effect
Shorthand for `dispatchLater` with no `ms` argument. Conveniend to use in `fx`.
```js
{dispatch: ['setAnswer', 42]}
{fx: [['dispatch', ['foo']],
      ['dispatch', ['bar']]]}
```
