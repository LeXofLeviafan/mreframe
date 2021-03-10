# API reference

These are the modules provided by the `mreframe` library.

Each of these can be used separately (`require('mreframe/<name>')`), or as part of the main module
(`require('mreframe').<name>`; `.reFrame` in case of `re-frame` module). Note that the nodeps bundle doesn't load
Mithril libraries by default (so you'll have to call the `_init` function which it also exports).

As most of these functions are based on existing ClojureScript equivalents, I'll provide links to respective CLJ docs
for anyone interested (although, if you're familiar with these concepts, you'll get the idea from the function name
in most cases). A major difference, of course, is that instead of vectors, JS arrays are used, and dictionaries
(plain objects) are used instead of maps; instead of keywords, strings are uses (`:foo` → `'foo'`).
Since [Wisp](https://github.com/Gozala/wisp) does the same, using `mreframe` with Wisp makes for
mostly identical code to that of CLJS `reagent`/`re-frame` (at least in regular usecases).

## `re-frame` module

Based on ClojureScript [re-frame](https://day8.github.io/re-frame) library; used for managing state, events and side-effects
in a [reagent](#reagent-module) application.

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

Includes built-in effects (see `rf.regEventFx`):
- [`'db'`](https://day8.github.io/re-frame/api-builtin-effects/#db) resets app-db to its argument
  ```js
  {db: assoc(db, 'answer', 42)}
  ```
- [`'fx'`](https://day8.github.io/re-frame/api-builtin-effects/#fx) actions effects in the given order
  (e.g. `fx: [['foo', 1], ['bar', 2]]` invokes `foo: 1` then `bar: 2`);
  also allows for actioning the same effect multiple times, or to action effects conditionally
  ```js
  {fx: [['db', assoc(db, 'answer', 42)],
        (db.answer !== 42) && ['alert', "State was updated!"]]}
  {fx: [['fetch', {url: "/api/foo", onSuccess: ['setFoo']}],
        ['fetch', {url: "/api/bar", onSuccess: ['setBar']}]]}
  ```
- [`'dispatchLater'`](https://day8.github.io/re-frame/api-builtin-effects/#dispatch-later) dispatches an event after a delay
  (see `rf.dispatch()`); expects a dict of `{ms, dispatch}` (where `ms` is delay time, and `dispatch` is the dispatched event)
  ```js
  {dispatchLater: {dispatch: ['setTitle', "Ready!"], ms: 5000}}
  {dispatchLater: {dispatch: ['setAnswer', 42]}}
  ```

Module functions/interceptors:

* `_init(opts)` is a setup function (only necessary if you're using `nodeps` bundle); `opts` may include:
  - `eq`: deep equality comparison (for subscription update checks; defaults to [`util.eq`](#util-module))
  
  This is the `_init` exported in the main `mreframe` module. It also invokes [`r._init()`](#reagent-module),
  which is where most `opts` are actually used.
* [`dispatch(event)`](https://day8.github.io/re-frame/api-re-frame.core/#dispatch) asynchronously dispatches an event
  (described as `['id', ...args]`)
  ```js
  rf.dispatch(['set', 'key', value]) // dispatches event ['set', 'key', value] after a tick
  ```
* [`dispatchSync(event)`](https://day8.github.io/re-frame/api-re-frame.core/#dispatch-sync) dispatches an event _immediately_
  (use for synchronous updates, like `oninput` of a text fields with supplied `value`, or for state initialization)
  ```js
  rf.dispatchSync(['set', 'key', value]) // *immediately* dispatches the event
  rf.dispatchSync(['init-db', initialState])
  ```
* [`regEventDb(id, [interceptors], handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-event-db)
  assigns `handler` to event `id`, with optional `interceptors` added to the processing chain;
  handler accepts `(db, event)` as arguments and returns new `db`
  ```js
  rf.regEventDb('set', (db, [_, key, value]) => assoc(db, key, value))
  rf.regEventDb('set-in', [trimV], (db, [path, value]) => // removed event id from the query
    assocIn(db, path, value))
  ```
* [`regEventFx(id, [interceptors], handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-event-fx)
  same, but handler accepts `(coeffects, event)` as arguments (`db` is accessible as `coffects.db`) and returns `effects`
  (dict of key-value pairs describing effects to be actioned; the one updating app-db is called `'db'`)
  ```js
  rf.regEventFx('fetch-data', ({db}, [_, url, key]) =>
    ({db:    assoc(db, 'lastUrl', url),
      fetch: {url, onSuccess: ['set', key]}}))
  rf.regEventFx('show-time', [rf.injectCofx('now')], ({time}, _) => // 'time' supplied by custom coeffect
    ({alert: `Current time is ${time}`}))
  ```
* [`regEventCtx(id, [interceptors], handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-event-ctx)
  same, but handler accepts `(context)` as argument
  ```js
  rf.regEventCtx('debug', context => ({...context, effects: {log: context}}))  // logs context value
  rf.regEventCtx('walk-back', [injectCofx(foo), injectCofx(bar)], context =>
    ({...context, stack: context.stack.slice().reverse()})) // reverse interceptors list on walk back
  ```
* [`clearEvent(id?)`](https://day8.github.io/re-frame/api-re-frame.core/#clear-event) removes a single event by `id`,
  or all events if no `id` was provided
  ```js
  rf.clearEvent('debug')  // remove event at runtime
  rf.clearEvent()         // remove all events
  ```
* [`regSub(id, computation)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-sub) registers a subscription;
  `computation` accepts `(db, query)` as arguments and returns its result
  ```js
  rf.regSub('lists', getIn) // supports queries ['lists'], ['lists', id], ['lists', id, 5]…
  ```
* [`regSub(id, signals, computation)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-sub) registers a subscription;
  `computation` accepts `(inputs, query)` as arguments, with `inputs` depending on result of calling `signals(query)`:
  - `deref( signals() )` if `signals` is a function regurning an atom
  - `signals().map(deref)` if `signals` is a function returning a list of atoms
  - `dict( entries( signals() ).map(([k, v]) => [k, deref(v)]) )` if `signals` is a function returning a dictionary of atoms
  
  ```js
  rf.regSub('count', ([_, id] => rf.subscribe(['lists', id])), (list, _) => list.length)
  rf.regSub('join', ([_, ...ids] => ids.map(id => rf.subscribe(['lists', id]))), (lists, _) =>
    [].concat(...lists))
  rf.regSub('subset',
            ([_, foo, bar] => {[foo]: rf.subscribe(['lists', foo]), [bar]: rf.subscribe(['lists', bar])}),
            (o, [_, foo, bar]) => ({foo: o[foo], bar: o[bar]}))
  ```
* [`regSub(id, ...signals, computation)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-sub)
  same, but `signals` function is presented as a list of subscription shorthands  
  (`'<-', ['foo', 1], '<-', ['bar', 2]` is equivalent to `_ => [rf.subscribe(['foo', 1]), rf.subscribe(['bar', 2])]`);  
  in case of one subscription it's a single-value instead (`'<-', ['foo', 1]` → `_ => rf.subscribe(['foo', 1])`)
  ```js
  rf.regSub('total-length', '<-', ['lists'], (lists, _) =>
    Object.values(lists).map(xs => xs.length).reduce((n, m) => n+m, 0))
  rf.regSub('foo&bar',
            '<-', ['lists', 'foo'],
            '<-', ['lists', 'bar'],
            ([foo, bar], _) => [].concat(foo, bar))
  ```
* [`subscribe(query)`](https://day8.github.io/re-frame/api-re-frame.core/#subscribe)
  returns an atom which `deref`s to the current value of subscription defined by `query`
  (with the result of `computation` being cached by its `signals` for each `query`);
  **abstain from passing non-plain data here!** (only scalars, strings, arrays, dicts, and `RegExp`s are supported)
  ```js
  rf.subscribe(['lists', 'foo'])  // cursor that queries 'lists' with parameter 'foo'
  ```
* [`clearSub(id?)`](https://day8.github.io/re-frame/api-re-frame.core/#clear-event) removes a single subscription by `id`,
  or all subscriptions if no `id` was provided
  ```js
  rf.clearSub('total-length') // remove subscription at runtime
  rf.clearSub()               // remove all subscriptions
  ```
* [`clearSubscriptionCache()`](https://day8.github.io/re-frame/api-re-frame.core/#clear-subscription-cache)
  removes all subscriptions from the cache (useful for development/debugging)
* [`regFx(id, handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-fx) registers an effect by `id`;
  `handler` accepts one argument passed by the event that triggers it (so `foo: 1` triggers effect `foo` with argument `1`)
  ```js
  rf.regFx('fetch', ({url, onSuccess, onFailure}) =>
    fetch(url).then(x => x.text()).then(s => {onSuccess && rf.dispatch([...onSuccess, s])})
              .catch(error => {onFailure && rf.dispatch([...onFailure, error])}))
  ```
* [`clearFx(id?)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-fx) removes a single effect by `id`,
  or all effects if no `id` was provided
  ```js
  rf.clearFx('fetch') // remove effect at runtime
  rf.clearFx()        // remove all effects
  ```
* [`toInterceptor({id, before, after})`](https://day8.github.io/re-frame/api-re-frame.core/#-interceptor)
  produces an interceptor with `before` and `after` methods (`id` is decorative)
  ```js
  let fxLogger = rf.toInterceptor({
    id: 'fx-logger',
    after: context => (console.warn( rf.getEffect(context) ), context),
  })
  // ⇒ interceptor structure which prints out effects on backtracking (for debug purposes)
  rf.regEventFx('some-event', [fxLogger], someFxEvent)
  ```
* [`regCofx(id, handler)`](https://day8.github.io/re-frame/api-re-frame.core/#reg-cofx) registers a coeffect by `id`;
  `handler` accepts `(coeffects, arg?)` and returns new `coeffects` dictionary
  ```js
  rf.regCofx('now', cofx => assoc(cofx, key, new Date())) // see rf.regEventFx example
  rf.regCofx('load', (cofx, key) =>
    assoc(cofx, key, JSON.parse(localStorage.getItem(key) || "null")))
  ```
* [`injectCofx(id, arg?)`](https://day8.github.io/re-frame/api-re-frame.core/#inject-cofx) returns an interceptor calling `id`
  coeffect in its `before` call
  ```js
  rf.injectCofx('now')          // ⇒ interceptor that supplies current time as coeffects.time
  rf.injectCofx('load', 'foo')  // ⇒ interceptor that supplies localStorage.foo as coeffects.foo
  rf.regEventFx('reset-foo', [rf.injectCofx('load', 'foo')], ({db, foo}, _) =>
    ({db: merge(db, {foo})}))
  ```
* [`clearCofx(id?)`](https://day8.github.io/re-frame/api-re-frame.core/#clear-cofx) removes a single coeffect by `id`,
  or all coeffects if no `id` was provided
  ```js
  rf.clearCofx('now') // remove coeffect at runtime
  rf.clearCofx()      // remove all coeffects
  ```
* [`path(...path)`](https://day8.github.io/re-frame/api-re-frame.core/#path) produces an interceptor which substitudes
  `db` with its `path` in the context with its `before` method, and replaces subvalue of `db` in `path` with 
  `db` value in context (from `effects` or `coeffects`); `path` may contain nested lists
  ```js
  rf.regEventDb('inc-5th-foo', [rf.path('lists', 'foo', 5)], n => n+1)
  // equivalent to db => assocIn(db, ['lists', 'foo', 5], 1 + getIn(db, ['lists', 'foo', 5]))
  const urls = ['config', 'urls']
  let fetchFxEvent = (url, [_, key]) => ({fetch: {url, onSuccess: ['set', key]}})
  urlIds.forEach(id => rf.regEventFx(`fetch-${id}`, [rf.path(urls, id)], fetchFxEvent)
  // equivalent to {fetch: {url: getIn(db, [...urls, id]), onSuccess: ['set', key]}}
  ```
* [`enrich(f)`](https://day8.github.io/re-frame/api-re-frame.core/#enrich) produces an interceptor which applies `f` to
  `db` and `event` in its `after` method and replaces `effects.db` with it
  ```js
  let fallbackStr = rf.enrich((db, [_, key]) => assoc(db, key, db[key] || ""))
  rf.regEventDf('set-string', [fallbackStr], (db, [_, key, value]) => assoc(db, key, value))
  // ensure that a string value db[key] is never changed to nil
  ```
* [`unwrap`](https://day8.github.io/re-frame/api-re-frame.core/#unwrap) is an interceptor which replaces event in context
  with its first parameter (original event is set in `coeffects.originalEvent`)
  ```js
  rf.regEventDb('inc-counter', [rf.unwrap], (db, key) => update(db, key, n => n+1))
  rf.dispatch(['inc-counter', 'foo'])
  ```
* [`trimV`](https://day8.github.io/re-frame/api-re-frame.core/#trim-v) is an interceptor which replaces event in context
  with its parameters (original event is set in `coeffects.originalEvent`)
  ```js
  rf.regEventFx('log-value', [rf.trimV], (db, path) => ({log: getIn(db, path)}))
  rf.dispatch(['log-value', 'lists', 'foo', 5]) // prints out db.lists.foo[5]
  rf.dispatch(['log-value'])                    // prints out db
  ```
* [`after(f)`](https://day8.github.io/re-frame/api-re-frame.core/#after) produces an interceptor which applies a side-effect
  to `db`
  ```js
  rf.regEventDb('add-list', [rf.trimV, rf.path('lists'), rf.after(console.warn)],
                (lists, [k, v]) => assoc(lists, k, v))
  // an event which alters db.lists then prints it out
  ```
* [`onChanges(f, outPath, ...inPaths)`](https://day8.github.io/re-frame/api-re-frame.core/#on-changes) produces an interceptor
  which updates `outPath` if any of the values on `inPaths` got changed, by calling `f()` on these values
  ```js
  let concat = (...xss) => [].concat(...xss)
  rf.regEventDb('set-list',
                [rf.trimV, rf.path('lists'), rf.onChanges(concat, ['fooBar'], ['foo'], ['bar'])],
                (lists, [k, v]) => assoc(lists, k, v))
  // an event which sets a value in db.lists, and recalculates .fooBar if .foo or .bar change
  ```
* [`getCoeffect(context, key?, notFound?)`](https://day8.github.io/re-frame/api-re-frame.core/#get-coeffect) returns coeffects
  from event context (or one of coeffects by `key`, or `notFound` if it wasn't in there)
  ```js
  rf.getCoeffect(context)             // ⇒ coeffects
  rf.getCoeffect(context, 'foo')      // ⇒ coeffects.foo
  rf.getCoeffect(context, 'foo', 42)  // ⇒ coeffects.foo or 42 (if .foo was not found)
  ```
* [`assocCoeffect(context, key, value)`](https://day8.github.io/re-frame/api-re-frame.core/#assoc-coeffect) returns updated
  context where `key` field in `coeffects` is set to `value`
  ```js
  rf.assocCoeffect(context, 'foo', 42)  // ⇒ updated context, coeffects.foo = 42
  ```
* [`getEffect(context, key?, notFound?)`](https://day8.github.io/re-frame/api-re-frame.core/#get-effect) returns effects from
  event context (or one of effects by `key`, or `notFound` if it wasn't in there)
  ```js
  rf.getEffect(context)                                       // ⇒ effects
  rf.getEffect(context, 'db')                                 // ⇒ effects.db
  rf.getEffect(context, 'db', rf.getCoeffect(context, 'db'))  // ⇒ effects.db or coeffects.db
  ```
* [`assocEffect(context, key, value)`](https://day8.github.io/re-frame/api-re-frame.core/#assoc-effect) returns updated context
  where `key` field in `effects` is set to `value`
  ```js
  rf.assocEffect(context, 'db', rf.getCoeffect(context, 'db'))  // reset changes to db
  ```
* [`enqueue(context, interceptors)`](https://day8.github.io/re-frame/api-re-frame.core/#enqueue) adds more interceptors to the
  end of the interceptors queue
  ```js
  rf.enqueue(context, [rf.path( rf.getCoeffect('event')[1] )])
  // dynamically add rf.path from event parameter
  ```
* [`purgeEventQueue()`](https://day8.github.io/re-frame/api-re-frame.core/#purge-event-queue) cancels all scheduled events
* `dsub(query)` is an alias to `deref( subscribe(query) )`
  ```js
  rf.dsub(['lists', 'foo']) // same as deref( rf.subscribe(['lists', 'foo']) )
  ```
* `disp(event, ...args)` is a helper for dispatching partial events
  ```js
  rf.regFx('fetch', ({url, onSuccess, onFailure}) =>
    fetch(url).then(x => x.text()).then(s => rf.disp(onSuccess, s))
              .catch(error => rf.disp(onFailure, error)))
  ```

## `reagent` module

Based on ClojureScript [reagent](http://reagent-project.github.io) library; used for writing a simplified interface
to [Mithril components](https://mithril.js.org/#components) (mostly for defining components as functions returning `view`
in [Hiccup](https://github.com/weavejester/hiccup) format, as well as tying redraws to state changes).

Short overview of [Hiccup format](https://cljdoc.org/d/reagent/reagent/1.0.0/doc/tutorials/using-hiccup-to-describe-html)
(in mreframe/Mithril context):
- `['tag#id.class1.class2', props, ...children]` is eqivalent to `m('tag#id.class1.class2', props, ...children)`  
  (nesting notation of `'tag>child1>child2'` is currently not supported)
- `['>', Component, props, ...children]` is equivalent to `m(Component, props, ...children)`
- `['<>', ...items]` is equivalent to `[...items]`
- `r.with(meta, ['<>', ...items])` is equivalent to `m.fragment(meta, [...items])`  
  (`r.with({key: id}, ['<>', foo, bar])` is equivalent to `^{:key id} [:<> foo bar baz]` in Clojure)
- `[component, ...args]` is equivalent to `m(component, {}, ...args)` (with `component(...args)` called internally)
- `r.with(meta, [component, ...args])` is similarly equivalent to `m(component, meta, ...args)`

Suggested imported module name is `r`.

Compared to regular Mithril components, each of Reagent components will have a RAtom (`r.atom`) defined in `state`
of its vnode; additionally, they can be defined as functions returning Hiccup (or functions returning such functions).
The vnode of current component can be accessed at runtime by calling `r.currentComponent()`.

Since JS doesn't support adding metadata easily, you can use `r.with` to supply props
(particularly [`key`](https://mithril.js.org/keys.html)) to Reagent components or to
[fragments](https://mithril.js.org/fragment.html). For tags and adapted components, use the first argument (like in Mithril).

* `_init(opts)` is a setup function (only necessary if you're using `nodeps` bundle); `opts` may include:
  - `redraw`: redraw hook function (defaults to `m.redraw`)
  - `hyperscript`: vnode generation function (defaults to `m`; `.fragment` is used for rendering fragments if present)
  - `eq`: deep equality comparison (for RAtom/RCursor update checks; defaults to [`util.eq`](#util-module))
  
  Only included options are updated, so to replace `eq` with Lodash version you can simply call `r._init({eq: _.isEqual})`.
* `resetCache()` clears function-components cache (shouldn't really be necessary)
* [`atom(x)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-atom) creates an [atom](#atom-module);
  it calls the redraw hook on every successful data update (but doesn't update when new value equals the old one)
  ```js
  var x = r.atom(42)      // ⇒ RAtom(42)
  reset(x, {answer: 42})  // ⇒ {answer: 42} /* m.redraw() is called on update */
  reset(x, {answer: 42})  // ⇒ {answer: 42} /* m.redraw() is not called as the value has not changed */
  ```
* [`cursor(src, path)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-cursor) creates a derived
  [atom](#atom-module); it also skips updates when new value equals the old one
  - if `src` is a function, `deref(rcursor)` returns `src(path)`, and `reset(rcursor, value)` calls `src(path, value)`
  - otherwise, `deref()` returns `getIn(deref(src), path)`, and `reset()` calls `swap(src, assocIn, path, value)`
  ```js
  var x = r.atom({foo: {bar: 42, baz: 5}}),  y = r.cursor(x, ['foo', 'bar'])
  deref(y)      // ⇒ 42
  reset(y, 12)  // ⇒ 12 /* x was updated, so m.redraw() is called */
  deref(x)      // ⇒ {foo: {bar: 12, baz: 5}}
  reset(y, 12)  // ⇒ 12 /* x wasn't updated, so m.redraw() isn't called */
  var inBounds = (([l, r], v) => (v ? reset(y, v) : Math.max(l, Math.min(r, deref(y))))),
      z        = r.cursor(f, [1, 10])
  deref(z)      // ⇒ 10
  reset(z, 4)   // ⇒ 4
  deref(x)      // ⇒ {foo: {bar: 4, baz: 5}}
  ```
* [`classNames(...classes)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-class-names) combines
  multiple CSS class definitions into a `class` attribute value (a definition can be a string, a list, or a dictionary)
  ```js
  r.classNames("foo bar", [1 && 'x', 0 && 'y', 'z'],
               {answer: 42, foo: null, error: false}) // ⇒ "bar x z answer"
  ```
* [`createElement(type, [props], ...children)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-create-element)
  invokes Mithril directly to produce a vnode (`props` are optional); when `props` are provided (they must be `isDict()`),
  each of Mithril CSS class (`class`, `className` & `classList`) attributes is replaced using `classNames()` (unless it's nil).
  ```js
  r.createElement('div', {class: ['foo', x && 'bar', 'baz']}, "Hello World")
  // ~ m('div', {class: r.classNames(['foo', x && 'bar', 'baz'])}, "Hello World")
  ```
* [`adaptComponent(c)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-adapt-react-class)
  converts a Mithril component into a Reagent component.
  ```js
  var x = r.adaptComponent({view: ({children}) => m('div', "Hello, World", children)}),
      y = () => [x, 1, 2, 3] // ~ ['>', x, 1, 2, 3]
  ```
* [`asElement(form)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-as-element)
  converts Hiccup form(s) into Mithril vnodes
  ```js
  r.asElement(['>', mComponent, 1, 2, 3])          // ⇒ m(mComponent, 1, 2, 3)
  r.asElement([rComponent, 1, 2, 3])               // ⇒ m(/*rComponent*/, {}, 1, 2, 3)
  r.asElement(['<>', ['div', {class: 'foo'}, 42]]) // ⇒ m.fragment({}, [m('div', {class: 'foo'}, 42)])
  ```
* `with(meta, form)` adds metadata (`meta`) to the `form` of a fragment or a Reagent component in place of props;
  can be used to supply a [`key`](https://mithril.js.org/keys.html)
  ```js
  r.asElement( r.with({key: 42}, [rComponent, 1, 2, 3]) )  // ⇒ m(/*rComponent*/, {key: 42}, 1, 2, 3)
  r.asElement( r.with({key: 42}, ['<>', x && ['div', {id: x}]]) )
  // ⇒ m.fragment({key: 42}, [x && ['div', {id: x}]])
  ```
* [`createClass(spec)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-create-class) creates an Reagent
  component based on provided hook methods (mostly based on Clojure equivalents; in Wisp, use symbols as keys):
  - `getInitialState` produces initial state of the state atom (runs at the start)
  - `constructor` [initialises the component](https://mithril.js.org/lifecycle-methods.html#oninit)
    (currently runs after `getInitialState`)
  - `componentDidMount` [runs after first render to DOM](https://mithril.js.org/lifecycle-methods.html#oncreate)
  - `componentDidUpdate` [runs after a DOM update](https://mithril.js.org/lifecycle-methods.html#onupdate)
  - `componentWillUnmount` [runs before removal from DOM](https://mithril.js.org/lifecycle-methods.html#onremove)
  - `shouldComponentUpdate` [checks if there's a need for update](https://mithril.js.org/lifecycle-methods.html#onbeforeupdate)
  - `beforeComponentUnmounts` [runs pre-removal code/promise for the root of a subtree that is being removed](https://mithril.js.org/lifecycle-methods.html#onbeforeremove)
  - `render` renders a Mithril component (see [`view`](https://mithril.js.org/components.html) method)
  - `renderReagent` is the same as `render` but renders Hiccup instead (same as function components)
  
  For all of these, vnode is bound to `this` as well as passed as the first argument (like in Mithril),
  and `constructor` additionally accepts props as the 2nd argument. The only exception is `renderReagent`
  which only expects function arguments (same as function components).
  ```js
  var canvas = r.createClass({
    componentDidMount: ({dom, state}) => {state.gl = dom.getContext('webgl')},
    componentWillUnmount: ({state}) => state.gl.getExtension('WEBGL_lose_context').loseContext(),
    reagentRender: () => ['canvas'],
  })
  // ~ {
  //   oncreate ({dom}) {this.gl = dom.getContext('2d')},
  //   onremove () {this.gl.getExtension('WEBGL_lose_context').loseContext()},
  //   view: () => m('canvas'),
  // }
  ```
* [`render(form, container)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-render)
  mounts a Hiccup form as a component onto a DOM element
  ```js
  r.render([App], document.body)
  // ~ m.mount(document.body, {view: () => r.asElement([App])})
  ```
* [`currentComponent()`](http://reagent-project.github.io/docs/master/reagent.core.html#var-current-component)
  returns the vnode of current component (in a function component or a method of a Reagent component)
  ```js
  var rComponent = () => [...r.currentComponent().children] // ~ {view: ({children}) => [...children]}
  ```
* [`children(vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-children)
  returns children of the Mithril vnode
  ```js
  var rComponent = () => [...r.children( r.currentComponent() )]
  // ~ {view: ({children}) => [...children]}
  ```
* [`props(vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-props)
  returns props (`attrs`) of the Mithril vnode
  ```js
  var rComponent = () => ['div', r.attrs( r.currentComponent() )]
  // ~ {view: ({attrs}) => m('div', attrs)}
  ```
* [`argv(vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-argv)
  returns the Hiccup form passed to the Reagent component
  ```js
  var rComponent = () => {console.log(r.argv( r.currentComponent() ));  return ['div']}
  // prints [rComponent, 1, 2, 3] if used as such
  ```
* [`stateAtom(vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-state-atom)
  returns RAtom containing state of a Reagent component
  ```js
  var rComponent = r.createClass({
    getInitialState: () => ({answer: 42}),
    reagentRender: self => ['div', "Answer: ", deref( r.stateAtom(self) ).answer],
  })
  ```
* [`state(vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-state)
  returns state of a Reagent component (same as `deref( r.stateAtom(vnode) )`)
  ```js
  var rComponent = r.createClass({
    getInitialState: () => ({answer: 42}),
    reagentRender: self => ['div', "Answer: ", r.state(self).answer],
  })
  ```
* [`replaceState(vnode, newState)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-replace-state)
  replaces state of a Reagent component (same as `reset(r.stateAtom(vnode), newState)`)
  ```js
  var rComponent = r.createClass({
    getInitialState: () => ({answer: 42}),
    reagentRender: self => {
      let x = r.state(self).answer;
      return ['div',
               "Answer: ", x, " ",
               ['button', {onclick: () => r.replaceState(self, {answer: x+1})}, "+1"]],
    }
  })
  ```
* [`setState(vnode, newState)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-set-state)
  partially updates state of a Reagent component (same as `swap(r.stateAtom(vnode), merge, newState)`)
  ```js
  var rComponent = r.createClass({
    getInitialState: () => ({answer: 42, foo: 1}),
    reagentRender: self => {
      let x = r.state(self);
      return ['div',
               "Answer: ", x.answer, " (", x.foo, ") ",
               ['button', {onclick: () => r.setState(self, {answer: x+1})}, "+1"]],
    }
  })
  ```

## `atom` module

Based on Clojure atoms (except that watch functions and validators aren't implemented), i.e. a holder for a changing value;
also includes default implementation for most operations (with synchronicity expectation,
but they're supposed to be atomic anyway), so to implement your own atom you only need to define `deref`
as well as one of `reset`, `resetVals`, `swap` or `swapVals` for it. These functions can be used with RAtoms and RCursors.

* [`atom(x)`](https://clojuredocs.org/clojure.core/atom) produces a regular atom holding `x`
  (`undefined` if nothing was passed)
  ```js
  atom(42)  // ⇒ Atom(42)
  ```
* [`deref(atom)`](https://clojuredocs.org/clojure.core/deref) returns the value held by `atom` (also in Wisp: `@atom`)
  ```js
  var x = atom(42)
  deref(x)  // ⇒ 42
  ```
* [`reset(atom, value)`](https://clojuredocs.org/clojure.core/reset!) replaces the value held by `atom` with `value`
  (`value` is returned)
  ```js
  var x = atom(42)
  reset(x, 10)  // ⇒ 10
  deref(x)      // ⇒ 10
  ```
* [`resetVals(atom, value)`](https://clojuredocs.org/clojure.core/reset-vals!) replaces the value held by `atom`
  with `value` (`[oldValue, value]` is returned)
  ```js
  var x = atom(42)
  resetVals(x, 10)  // ⇒ [42, 10]
  deref(x)          // ⇒ 10
  ```
* [`swap(atom, f, ...args)`](https://clojuredocs.org/clojure.core/swap!) updates the value held by `atom` by applying
  function `f` on it (the new value is returned)
  ```js
  var x = atom({answer: 42})
  swap(x, assoc, 'foo', 10) // ⇒ {answer: 42, foo: 10}
  deref(x)                  // ⇒ {answer: 42, foo: 10}
  ```
* [`swapVals(atom, f, ...args)`](https://clojuredocs.org/clojure.core/swap-vals!) updates the value held by `atom`
  by applying function `f` on it (`[oldValue, newValue]` is returned)
  ```js
  var x = atom({answer: 42})
  swapVals(x, assoc, 'foo', 10) // ⇒ [{answer: 42}, {answer: 42, foo: 10}]
  deref(x)                      // ⇒ {answer: 42, foo: 10}
  ```
* [`compareAndSet(atom, oldval, newval)`](https://clojuredocs.org/clojure.core/compare-and-set!) replaces the value held by
  `atom` with `newval` _if_ the current value is **identical** to `oldval` (`true`/`false` is returned depending on success)
  ```js
  var x = atom(42),  y = atom({answer: 42})
  compareAndSet(x, 42, 12)           // ⇒ true
  deref(x)                           // ⇒ 12
  compareAndSet(x, 42, 11)           // ⇒ false /* because @x is 12 */
  deref(x)                           // ⇒ 12
  compareAndSet(y, {answer: 42}, 12) // ⇒ false /* because @y is not the same dict */
  deref(y)                           // ⇒ {answer: 42}
  ```

## `util` module

These are common low-level utilities which can be found in many libraries but were implemented locally instead
to minimize the library size. And, since they've been implemented already, I might as well expose them for external usage.

* [`identity(x)`](https://clojuredocs.org/clojure.core/identity) returns its argument
  ```js
  identity(x) // ⇒ x
  ```
* `type(x)` returns type of its argument (that is, the type constructor, or `x` itself for nil values)
  ```js
  type(new Date)  // ⇒ Date
  type(/x/)       // ⇒ RegExp
  type([])        // ⇒ Array
  type({})        // ⇒ Object
  type(0)         // ⇒ Number
  type(null)      // ⇒ null
  type(void 0)    // ⇒ undefined
  ```
* [`keys(o)`](https://clojuredocs.org/clojure.core/keys) returns keys of its argument
  (same as `Object.keys(x)` except it doesn't fail on nil values); in case of an `Array` its `keys` are stringified indices
  ```js
  keys({foo: 1, bar: 2, baz: 3})  // ⇒ ['foo', 'bar', 'baz']
  keys(['a', 'b', 'c'])           // ⇒ ['0', '1', '2']
  keys(null)                      // ⇒ []
  keys(void 0)                    // ⇒ []
  ```
* `entries(o)` returns key-value pairs of its argument in unspecified order (same as `Object.entries`)
  ```js
  entries({foo: 1, bar: 2, baz: 3}) // ⇒ [['foo', 1], ['bar', 2], ['baz', 3]]
  entries(['a', 'b', 'c'])          // ⇒ [['0', 'a'], ['1', 'b'], ['2', 'c']]
  ```
* `dict(kvs)` returns a dictionary built from provided key-value pairs (same as `Object.fromEntries`)
  ```js
  dict([['foo', 1], ['bar', 2], ['baz', 3]])  // ⇒ {foo: 1, bar: 2, baz: 3}
  ```
* [`isArray(x)`](https://clojuredocs.org/clojure.core/vector_q) checks if its argument is an `Array`
  (alias to `Array.isArray(x)`)
  ```js
  isArray([])   // ⇒ true
  isArray({})   // ⇒ false
  isArray(null) // ⇒ false
  ```
* [`isDict(x)`](https://clojuredocs.org/clojure.core/map_q) checks if its argument is a dictionary,
  i.e. a plain object used as a by-key collection (its `type()` is `Object`)
  ```js
  isDict([])    // ⇒ false
  isDict(/x/)   // ⇒ false
  isDict({})    // ⇒ true
  isDict(null)  // ⇒ false
  ```
* [`isFn(x)`](https://cljs.github.io/api/cljs.core/fnQMARK) checks if its argument is a function
  (its `type()` is `Function`; note that JS classes are also, in fact, functions)
  ```js
  isFn(() => {})  // ⇒ true
  isFn(Date)      // ⇒ true
  isFn(Object)    // ⇒ true
  isFn({})        // ⇒ false
  ```
* [`merge(...os)`](https://clojuredocs.org/clojure.core/merge) returns a dictionary composed by merging keys from `os`
  into an empty object (alias to `Object.assign({}, ...os)`); merging is done successively left-to-right (right-fold),
  so in case of repeating keys, the last instance will be used
  ```js
  merge({foo: 1}, {bar: 2}, {baz: 3})     // ⇒ {foo: 1, bar: 2, baz: 3}
  merge({foo: 1, bar: 2}, null, {foo: 3}) // ⇒ {foo: 3, bar: 2}
  merge(['a', 'b', 'c'])                  // ⇒ {0: 'a', 1: 'b', 2: 'c'}
  merge()                                 // ⇒ {}
  ```
* [`assoc(o, k, v)`](https://clojuredocs.org/clojure.core/assoc) returns a copy of dictionary `o` with the value for key `k`
  set to `v` (alias to `merge(o, {[k]: v})`)
  ```js
  assoc({foo: 1, bar: 2}, 'baz', 3) // ⇒ {foo: 1, bar: 2, baz: 3}
  assoc({foo: 1, bar: 2}, 'foo', 3) // ⇒ {foo: 3, bar: 2}
  assoc(null, 'answer', 42)         // ⇒ {answer: 42}
  ```
* [`dissoc(o, k)`](https://clojuredocs.org/clojure.core/dissoc) returns a copy of dictionary `o` without the key `k`
  ```js
  dissoc({foo: 1, bar: 2, baz: 3}, 'bar') // ⇒ {foo: 1, baz: 3}
  dissoc(null, 'foo')                     // ⇒ {}
  ```
* [`update(o, k, f, ...args)`](https://clojuredocs.org/clojure.core/update) returns a copy of dictionary `o`
  with the value `k` updated by calling the function `f` on it (same as `assoc(o, k, f(o[k], ...args))`
  except it doesn't fail on a missing key)
  ```js
  update({answer: 42}, 'answer', n => n+1)        // ⇒ {answer: 42}
  update({foo: {bar: 1}}, 'foo', assoc, 'baz', 2) // ⇒ {foo: {bar: 1, baz: 2}}
  ```
* [`getIn(o, path)`](https://clojuredocs.org/clojure.core/get-in) returns the value in a nested structure, where `path` is
  a sequence of keys (e.g. `getIn(o, [foo, bar, baz])` is equivalent to `o[foo][bar][baz]`, except it doesn't fail
  on missing keys); `getIn` can be used as a trivial extractor (e.g. `rf.regSub('foo', getIn)` implements
  the `['foo']` query – as well as `['foo', 'items']`, `['foo', 'items', 4]`, etc.)
  ```js
  getIn({foo: {bar: 1}}, ['foo', 'bar'])  // ⇒ 1
  getIn([{answer: 42}], [0, 'answer'])    // ⇒ 42
  getIn({foo: {bar: 1}}, ['baz', 'bar'])  // ⇒ undefined
  getIn(null, ['foo', 'bar'])             // ⇒ undefined
  ```
* [`assocIn(o, path, v)`](https://clojuredocs.org/clojure.core/assoc-in) returns a copy of dictionary `o`
  with the value for `getIn(it, path)` set to `v`; if part of the path is missing, an empty dict is provided instead
  (thus, `path` is guaranteed to exist)
  ```js
  assocIn({foo: {bar: 1}}, ['foo', 'bar'], 42)  // ⇒ {foo: {bar: 42}}
  assocIn([{answer: 12}], [0, 'answer'], 42)    // ⇒ {0: {answer: 42}}
  assocIn({foo: {bar: 1}}, ['baz', 'bar'], 42)  // ⇒ {foo: {bar: 1}, baz: {bar: 42}}
  assocIn(null, ['foo', 'bar'], 42)             // ⇒ {foo: {bar: 42}}
  ```
* [`chunks(xs, n)`](https://clojuredocs.org/clojure.core/partition-all) returns the array passed to it split into chunks
  the size of `n`; leftover values are put in an extra chunk (equivalent to `(partition-all n xs)`)
  ```js
  chunks([1, 2, 3, 4, 5], 2)  // ⇒ [[1, 2], [3, 4], [5]]
  chunks("abcdef", 3)         // ⇒ ["abc", "def"]
  chunks("", 2)               // ⇒ []
  ```
* [`flatten(xs)`](https://clojuredocs.org/clojure.core/flatten) returns a flattened version of the provided array
  (with every element in nested arrays insterted in place of those arrays, until there's no array elements left)
  ```js
  flatten([[1], [2, [3], 4], 5])  // ⇒ [1, 2, 3, 4, 5]
  ```
* `repr(x)` returns a normalized stringified version of its argument; equivalent to `JSON.stringify(x)`,
  except the dict keys are sorted, and `RegExp` values are replaced with their `.toString()` (e.g. `/x/g` → `"/x/g"`);
  used as a workaround for `Map` only supporting identity comparison
  ```js
  repr( [{foo: 1, bar: 2, baz: /3/}] )  // ⇒ `[{"bar": 2, "baz": "/3/", "foo": 1}]`
  ```
* [`eq(a, b)`](https://clojuredocs.org/clojure.core/%3D) is a by-value deep-comparison of plain data structures
  (supporting arrays and dictionaries); it's the comparison function used by `reagent` and `re-frame` modules
  by default (can be overridden by calling `_init({eq: …})`)
  ```js
  eq([{foo: 1, bar: NaN}], [{bar: NaN, foo: 1}])  // ⇒ true
  ```
* [`chain(x, ...fns)`](https://clojuredocs.org/clojure.core/-%3E) threads `x` through the provided list of functions,
  passing either `x` or result of previous function as the first argument; extra arguments can be passed if you wrap
  the function in an array
  ```js
  chain({foo: 1, bar: 2, baz: 3},
        [merge, {answer: 42}],
        [dissoc, 'foo'],
        keys)
  // ⇒ ['bar', 'baz', 'answer']
  ```
* [`multi(dispatch=identity)`](https://clojuredocs.org/clojure.core/defmulti) is a simple multimethod generator;
  it produces a function which dispatches using the `dispatch` function (by identity comparison;
  default dispatch is by 1st argument) over the map of provided implementations
  - [`.when(x, f)`](https://clojuredocs.org/clojure.core/defmethod) sets the dispatched value `x` to implementation `f`
    (returns the multimethod so it can be chained)
  - [`.default(f)`](https://clojuredocs.org/clojure.core/defmethod) sets the fallback dispatch to `f`
    (without it a `TypeError` is thrown instead; also returns the multimethod); equivalent to `(defmethod … :default …)`
  ```js
    let foo = multi((...args) => args.length).when(0, () => "").when(1, x => `[${x}]`)
                                             .when(2, (k, v) => `{${k}: ${v}}`);
    foo()                 // ⇒ ""
    foo('bar')            // ⇒ "[bar]"
    foo('bar', 'baz')     // ⇒ "{bar: baz}"
    foo('bar', 'baz', 42) // TypeError("Invalid arguments")
  ```
