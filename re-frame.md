# `mreframe/re-frame`: Build web apps, in ~~ClojureScript~~ JavaScript, leveraging ~~React~~ Mithril.

**Note: This is a small introduction to `mreframe/re-frame`, partially based on the [original tutorial for re-frame (a React/ClojureScript library)](https://day8.github.io/re-frame/re-frame)**

McCoy might report “It's MVC, Jim, but not as we know it”. And you would respond “McCoy, you trouble maker, why even mention an OO pattern? re-frame is a **functional framework**.”

So, it is about `data`, and the `functions` which transform that data. And, because it is a **reactive framework**, `data` coordinates `functions`, not the other way around.

## The Data Loop

The original [re-frame](https://day8.github.io/re-frame) framework is a [Clojure](https://clojure.org) library, and Clojure is a LISP. The reason this is important is because a (defining) property of a LISP is that any program in it is also valid LISP data. It may not seem obvious at the first glance, but it defines the very experience of programming in Clojure at a profound level. You are _programming in data_.

So, it will come as no surprise, then, to find that re-frame has a data-oriented design. Events are data. Effects are data. DOM is data. The functions which transform data are registered and looked up via data. Interceptors (data) are preferred to middleware (higher order functions). Etc.

And re-frame apps are reactive which further elevates data because in reactive systems, it is the arrival of data which coordinates the calling of functions, not the other way around.

* * *

Architecturally, re-frame implements “a perpetual loop”.

To build an app, you hang pure functions on certain parts of this loop, and re-frame looks after the **conveyance of data** around the loop, into and out of the transforming functions you provide. The tag line for re-frame is “derived values, flowing”.

re-frame provides the conveyance of the data around the loop. You design what's flowing, and then you hang functions on the loop at various points to compute the data's phase changes.

* * *

Each iteration of the re-frame loop has 6 stages, happening one after the other:

1.  Event dispatch
2.  Event handling
3.  Effect handling
4.  Query
5.  View (handled by Reagent)
6.  DOM (handled by Mithril)

* * *

An _event_ is sent when something happens - the user clicks a button, or a websocket receives a new message. (Similarly to a Reagent component, it's an array containing the ID – a function in case of Reagent – followed by arguments, if needed.)

Then, a _context_ dict is created; it's directed through a chain of _interceptors_, at the end of which an _event handler_ is placed; then the chain is followed backwards, ending up with a final version of the event context.

The true result of handling an event is an _effects_ dict residing within the context; it contains the set of effects that need to be evoked as the consequence.

After this, a Mithril redraw is typically triggered; Reagent recalculates its components, which query _subscriptions_ – Reagent atoms (or cursors, more specifically), that are calculated from the current app state: the `rf.appDb` RAtom value (either directly or via other subscriptions). Same as for the effects, a subscription is an array containing its ID followed by arguments, if needed.

Finally, the values are provided to views (Reagent components), which – in case these values changed – get recalculated, and Mithril propagates these changes to the DOM.

As per the famous React formula, `v = f(s)`: view is a function of the app state.

(**Note:** all of these parts are only connected at runtime by the framework, allowing you to define, use and test them independently of each other)

## Subscriptions and DB events

The backbone of the data loop, as well as the most basic interaction, is handling of the app state (app-db); let's take a look at those.

While you _can_ work with the state RAtom directly, it's much better to use means of the framework itself: subscriptions and events. To register a data-changing event, use `rf.regEventDb()`:

```js
let rf = require('mreframe/re-frame');


// replaces db state with APP_DB
rf.regEventDb('init-db', (db, event) => APP_DB);

rf.dispatchSync(['init-db']);  // immediately evoke init-db{} (i.e. before r.render)


rf.regEventDb('set-view', (db, [_, view]) => ({...db, view}));

rf.dispatch(['set-view', 'main']);  // asynchronously evoke set-view{'main'}


rf.regEventDb('add-counter', (db, [_, n=1]) => ({...db, counter: db.counter+n}));

rf.disp(['add-counter', 5]);  // asynchronously evoke add-counter{5}
// rf.disp(evt, ...args) <=> evt && rf.dispatch([...evt, ...args])
```

As you can tell, it accepts two arguments: the event ID (used for dispatching handlers) and the handler function (which in turn accepts app-db and the event). (There's also a third, optional argument, but we can ignore it for the time being.)

(**Note:** do _not_ mutate the DB dict or values within it; doing so _will_ mess up change detection)

* * *

To query this app-db value, subscriptions are registered using `rf.regSub()`:

```js
let rf = require('mreframe/re-frame');


rf.regSub('view', (db, sub) => db.view);

rf.subscribe(['view']) // => RCursor returning current db.view value


rf.regSub('item', (db, [_, key]) => db.dict[key]);

rf.dsub(['item', 'foo']) // db.dict['foo']
// rf.dsub(sub) <=> deref( rf.subscribe(sub) )
```

The API is pretty much the same as for DB events: we pass query ID (used for dispatching), as well as the handler function (which accepts app-db and the query).

These are _extractors_: subscriptions which give direct access to values from app-db. It's often not even necessary to define query functions: just use `getIn` instead (it accepts the same arguments: dict followed by a path to follow).

* * *

Other than extractors, there's also _computation_ subscriptions; they use other subscriptions as inputs, in place of app-db. To register such a subscription, you need to provide additional argument(s) to `rf.regSub()` _after the query ID_; it's either a function (accepting the query and returning a single subscription, or an array or dict thereof), or a sequence of `'<-'` keywords each followed by a query literal (which is equivalent to a single subscription or an array thereof):

```js
let {reFrame: rf, util: {getIn, identity, dict}} = require('mreframe');

// extraction subscription
rf.regSub('list', getIn);  // getIn(db, ['list']) | getIn(db, ['list', idx]) | ...

// computation subscriptions (simple)
rf.regSub('#list', '<-', ['list'],    list => list.length);
rf.regSub('first', '<-', ['list', 0], identity);

// (derived from multiple)
rf.regSub('pair', '<-', ['first'], '<-', ['list', 1],
          ([first, second], _sub) => first + ", " + second);

// (calculated dependency)
rf.regSub('reverse', ([_, idx]) => rf.subscribe(['list', idx]),
          (item, _sub) => item.split("").reverse().join(""));

// (multiple)
rf.regSub('palindrome',
          ([_, idx]) => [['list', idx], ['reverse', idx]].map(rf.subscribe),
          ([item, reverse], _sub) => item + reverse);

// (dict)
rf.regSub('sizes',
          ([_, ...keys]) => dict( keys.map(k => [k, rf.subscribe(['item', k])]) ),
          (dict, [_, ...keys]) => dict( keys.map(k => [k, dict[k].length]) ));
```

Both events and subscriptions are pure functions (no side-effects, no external inputs) and exist independently of each other (except for dependency subscriptions).

* * *

With just this, you already have the minimum basis of using re-frame: use subscriptions to access app state (i.e. in a Reagent component), and invoke events to change it.

## FX events and effects

Naturally, there's things your app may need to do beyond mere state manipulation; things such as sending network requests, using browser API, or scheduling actions. In other words, _invoking side-effects_.

To register such an event, `rf.regEventFx()` can be used. It works similarly to `rf.regEventDb()`, except the handler function has a somewhat more complex API: instead of app-db, it accepts a dict of _coeffects_, and the returned value is similarly a dict of _effects_ – each key matches an existing effect, and the corresponding value is an argument.

Aside from effects defined by you, there's a few predefined ones; one of them is the `db` effect which accepts new app state as its value; similarly, the coeffects dict contains current app state in its `db` key. And yes, `rf.regEventDb()` is effectively a wrapper for `rf.regEventFx()` with simplified API.

```js
let {reFrame: rf, util: {merge}} = require('mreframe');


// evokes reminder{message} after specified delay
rf.regEventFx('delayed-reminder', (cofx, [_, message, delayMsec]) =>
  ({dispatchLater: {dispatch: ['reminder', message],  ms: delayMsec}}));

// displays the reminder (adds to appDb) and unsets it after 5 sec
rf.regEventFx('reminder', ({db}, [_, reminder]) =>
  merge({db: merge(db, {reminder})},
        reminder &&
          {dispatchLater: {dispatch: ['reminder'],  ms: 5000}}));


// dispatches multiple events in the given order
rf.regEventFx('schedule-reminders', (cofx, [_, ...reminders]) =>
  ({fx: reminders.map(it => ['dispatch', ['reminder', it]])}));
```

* * *

As for the effects themselves, they're impure functions (with side-effects), which accept a single argument; they can be registered using `rf.regFx()`:

```js
let {reFrame: rf, util: {assocIn}} = require('mreframe');


// side-effect alert(arg)
rf.regFx('alert', arg => alert(arg));

// event alert{msg} causes side-effect alert
rf.regEventFx('alert', (cofx, [_, msg]) => ({alert: msg});


let _jsonRequest = response =>
  (response.ok ? response.json() : Promise.reject(response.status));
// downloads JSON from a URL, then evokes passed event with added param
rf.regFx('fetchJson', ({url, params, onSuccess, onFailure}) =>
  fetch(url, params).then(_jsonRequest)
                    .then(data => rf.disp(onSuccess, data))
                    .catch(status => rf.disp(onFailure, status));

// event fetch-json{key, url} causes side-effect fetchJson
rf.regEventFx('fetch-json', ({db}, [_, key, url]) =>
  ({fetchJson: {url,  params: db.params,  onSuccess: ['-fetch-json', key]}}));

// evoked by fetchJson on success
rf.regEventFx('-fetch-json', ({db}, [_, key, data]) =>
  ({db:    assocIn(db, ['cache', key], data),
    alert: "Fetched '" + key + "'!"}));
```

(**Note:** other DB and FX events, there are CTX events which manipulate event context directly; they rarely come up in regular code, however.)

## Coeffects and interceptors

In the DB events section I've mentioned that `rf.regEvents*` API accepts an additional, optional argument. This argument (similarly to `rf.regSub()` placed _after the event ID_) is a list of _interceptors_.

Interceptors are added to the event pre/post-processing chain, and their main purpose is operating the event context. For instance, they're used for populating the coeffects dict passed into FX event handlers; such interceptors are registered using `rf.regCofx()`, and injected using `rf.injectCofx()`:

```js
let {reFrame: rf, util: {assoc, merge}} = require('mreframe');


// adds a value named 'now' into the cofx dict (non-pure function)
rf.regCofx('time', cofx => merge(cofx, {now: new Date}));

// uses the time coeffect (pure function)
rf.regEventFx('show-time', [rf.injectCofx('time')], ({now}) =>
  ({alert: "Current time is: " + now}));


// loads a value from localStorage
rf.regCofx('load', (cofx, key) => {
  try {return assoc(cofx, key, JSON.parse( localStorage.getItem(key) ))}
  catch (e) {return cofx}
});

// loads 'state' from localStorage and adds it into appDb
rf.regEventFx('load-state', [rf.injectCofx('load', 'state')], ({db, state}) =>
  ({db: merge(db, {state})}));
```

* * *

An interceptor is a simple dict of three keys: `id` (used for debugging), `before` and `after`; the latter two are functions called on the context object before and after event handling (accepting and returning a context):

```js
let {reFrame: rf, util: {merge}} = require('mreframe');

// this interceptor prints out event context before and after its handling
let dbg = rf.toInterceptor({
  id: 'dbg',
  before: context => {
    console.debug("before:", context);
    return context;
  },
  after:  context => {
    console.debug("after:", context);
    return context;
  },
});

rf.regEventDb('set-foo', [dbg], (db, [_, foo]) => merge(db, {foo}));
```

So, the event handling is done the following way:

1.  An initial context is formed; its coeffects dict contains app state and the event itself
2.  The interceptors are walked _left-to-right_, each applying `.before()` to the context
3.  The event handler is applied to the context, producing a new context (with effects)
4.  The interceptors are walked _right-to-left_, each applying `.after()` to the context
5.  The effects dict of resulting context is then used for effects handling

* * *

`mreframe/re-frame` includes a few builtin interceptors/interceptor generators which cover main patterns of their usage:

```js
let {reFrame: rf, util: {merge, assoc, assocIn}} = require('mreframe');


// rf.path works on specified subpath of db (similarly to using assocIn)
rf.regEventDb('set-foo', [rf.path('foo')], (db, [_, foo]) => foo);


// rf.unwrap and rf.trimV simplify event data passed into handler
rf.regEventDb('set', [rf.trimV], (db, [key, value]) => assoc(db, key, value));
rf.regEventDb('set-foo', [rf.unwrap], (db, foo) => merge(db, {foo}));


// rf.enrich and rf.after do post-processing of db after the event
let ensureNumber = rf.enrich((db, [_, key]) =>
  assoc(db, key, Number(db[key]) || 0));           // db is updated
let saveState = rf.after((db, event) =>
  localStorage.setItem('db', JSON.stringify(db))); // side-effect

// after setting the value, it's converted to a number, then db is saved
rf.regEventDb('set-number', [saveState, ensureNumber], (db, [_, key, value]) =>
  assoc(db, key, value));


// rf.onChanges is similar to rf.enrich but recalculates conditionally
let calcTotal = rf.onChanges((n1, n2, n3) => n1 + n2 + n3,
                             ['outputs', 'total'],
                             ['inputs', 1], ['inputs', 2], ['inputs', 3]);

// if any of the three inputs is changed, db.outputs.total is recalculated
rf.regEventDb('set-input', [calcTotal], (db, [_, key, value]) =>
  assocIn(db, ['inputs', key], value));
```

## Live demo

Here's a (slightly modified) version of the [original live demo](https://github.com/day8/re-frame/blob/master/examples/simple/src/simple/core.cljs)

```js
let {reFrame: rf, reagent: r, util: {merge}} = require('mreframe');


// -- event dispatch ----------------------------------------------------------

let dispatchTimerEvent = () =>
  rf.dispatch(['timer', new Date]);  // <-- dispatch used

// Call the dispatching function every second.
setInterval(dispatchTimerEvent, 1000);  // doTimer


// -- event handlers ----------------------------------------------------------

rf.regEventDb(               // sets up initial application state
 'initialize',               // usage:  rf.dispatch(['initialize'])
 () =>                       // the two parameters are not important here, so omitting them
   ({time: new Date,         // What it returns becomes the new application state
     timeColor: "#f88"}));   // so the application state will initially be a dict with two keys


rf.regEventDb(                 // usage:  rf.dispatch(['time-color-change', 34562])
 'time-color-change',          // dispatched when the user enters a new colour into the UI text field
 (db, [_, newColorValue]) =>   // DB event handlers given 2 parameters: application state and event (an array)
   merge(db, {timeColor: newColorValue}));   // compute and return the new application state


rf.regEventDb(                  // usage:  rf.dispatch(['timer', aJsDate])
 'timer',                       // every second an event of this kind will be dispatched
 (db, [_, newTime]) =>          // note how the 2nd parameter is destructured to obtain the data value
   merge(db, {time: newTime})); // compute and return the new application state


// -- query -------------------------------------------------------------------

rf.regSub(
 'time',
 (db, _) =>     // db is current app state. 2nd unused param is query array
   db.time);    // return a query computation over the application state

rf.regSub('timeColor', db => db.timeColor);

rf.regSub('time-show', '<-', ['time'], it =>
  it.toTimeString().split(" ")[0]);


// -- view functions ----------------------------------------------------------

let clock = () =>
  ['div.example-clock', {style: {color: rf.dsub(['timeColor'])}},
    rf.dsub(['time-show'])];

let colorInput = () =>
  ['div.color-input',
    "Time color: ",
    ['input', {type:    'text',
               value:   rf.dsub(['timeColor']),
               oninput: e => rf.dispatch(['time-color-change', e.target.value])}]];  // <---

let ui = () =>
  ['div',
    ['h1', "Hello world, it is now"],
    [clock],
    [colorInput]];


// -- entry point -------------------------------------------------------------

rf.dispatchSync(['initialize']);                // put a value into application state
r.render([ui], document.getElementById('app')); // mount the application's ui into '<div id="app"/>'
```

```html
<div>
  <h1>Hello world, it is now</h1>
  <div class="example-clock" style="color:#f88">
    02:25:00
  </div>
  <div class="color-input">
    Time color: <input type="text" value="#f88">
  </div>
</div>
```
