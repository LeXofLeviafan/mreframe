[Homepage](https://lexofleviafan.github.io/mreframe)
[![Unit tests](https://github.com/LeXofLeviafan/mreframe/actions/workflows/test.yml/badge.svg)](https://github.com/LeXofLeviafan/mreframe/actions/workflows/test.yml)

`mreframe` is a plain JavaScript re-implementation of [`reagent`](http://reagent-project.github.io) and
[`re-frame`](https://day8.github.io/re-frame) libraries from [ClojureScript](https://clojurescript.org);
it's a mini-framework for single-page apps (using Mithril as the base renderer, with some interop).

* _Lightweight_, both in size and use: just load a small JavaScript file, `require` it as a library, and you're good to go
* _No language/stack requirement_ – you can use JS directly, or any language that transpiles into it as long as it has interop
* _Simple, data-centric API_ using native JS data structures and plain functions for rendering, event handling, and querying state
* Components, events and queries have _no need to expose their inner workings_ beyond the level of a simple function call

Install: `npm i mreframe`/`yarn add mreframe` or `<script src="https://unpkg.com/mreframe/dist/mreframe.min.js"></script>`.

Here's a full app code example:

```js
let {reagent: r, reFrame: rf} = require('mreframe');

// registering events
rf.regEventDb('init',        () => ({counter: 0}));  // initial app state
rf.regEventDb('counter-add', (db, [_, n]) => ({...db, counter: db.counter + n}));

// registering state queries
rf.regSub('counter', db => db.counter);

// component functions
let IncButton = (n, caption) =>
  ['button', {onclick: () => rf.dispatch(['counter-add', n])},  // invoking counter-add event on button click
    caption];

let Counter = () =>
  ['main',
    ['span.counter', rf.dsub(['counter'])],  // accessing app state
    " ",
    [IncButton, +1, "increment"]];

// initializing the app
rf.dispatchSync(['init']);  // app state needs to be initialized immediately, before first render
r.render([Counter], document.body);
```

Tutorial / live demo: [Reagent (components)](https://lexofleviafan.github.io/mreframe/reagent.html),
[re-frame (events/state management)](https://lexofleviafan.github.io/mreframe/re-frame.html).

* [Intro](#intro)
* [Usage](#usage)
* [Q & A](#q--a)
* [Examples](#examples)
* [API reference](#api-reference)


# Intro

[ClojureScript](https://clojurescript.org) has a very good functional interface to React (as third party libraries),
allowing one to [model DOM using data literals](https://github.com/weavejester/hiccup),
to [define components as plain functions (or functions returning functions)](http://reagent-project.github.io),
and to [make best use of pure functions when defining calculations and decision-making logic](https://day8.github.io/re-frame).

[Wisp](https://github.com/Gozala/wisp) is a lightweight Lisp variant based on ClojureScript; however, it's harder to use for
SPAs as there's no similar library available for it. `mreframe` is meant to deal with this issue; however, after some thinking,
I've decided to make it a regular JS library instead (since Wisp would interop with it seamlessly anyway).

To minimize dependencies (and thus keep the library lightweight as well, as well as make it easy to use), `mreframe` uses
[Mithril](https://mithril.js.org) in place of React; it also has no other runtime dependencies. In current version, it has size
of 10Kb (4Kb gzipped) by itself, and with required Mithril submodules included it merely goes up to 26Kb (9.5Kb gzipped).

The library includes two main modules: [`reagent`](docs/reagent.md) (function components modelling DOM with data literals),
and [`re-frame`](docs/re-frame.md) (state/side-effects management). You can decide to only use one of these as they're mostly
independent of each other (although `re-frame` uses `reagent` atoms internally to trigger redraws on state updates). It also
includes [`atom`](docs/atom.md) module for operating state (though you can avoid operating state atoms directly), as well as
[`util`](docs/util.md) module for non-mutating data updates (these were implemented internally to avoid external dependencies).

Both `reagent` and `re-frame` were implemented mostly based on their
[`reagent.core`](http://reagent-project.github.io/docs/master/reagent.core.html) and
[`re-frame.core`](https://day8.github.io/re-frame/api-intro) APIs respectively, with minor changes to account for the switch
from ClojureScript to JS and from React to Mithril. The most major change would be that since Mithril relies on minimizing
calculations rather than keeping track of dependency changes, state atoms in `mreframe` don't support subscription mechanisms
(they do however register themselves with the current component and its ancestors to enable re-rendering detection);
also, I omitted a few things like global interceptors and post-event callbacks from `re-frame` module, and added a couple
helper functions to make it easier to use in JS. And, of course, in cases where switching to camelCase would make an identifier
more convenient to use in JS, I did so.

For further information, I suggest checking out the original (ClojureScript) [`reagent`](https://reagent-project.github.io)
and [`re-frame`](https://day8.github.io/re-frame/re-frame) libraries documentation. Code examples specific to `mreframe` can
be found in the following Examples section, as well as in the API reference.


# Usage

Install the NPM package into a project with `npm i mreframe`/`yarn add mreframe`;  
or, import as a script in webpage from a CDN: `<script src="https://unpkg.com/mreframe/dist/mreframe.min.js"></script>`.

Access in code by requiring either main module:
```js
let {reFrame: rf, reagent: r, atom: {deref}, util: {getIn}} = require('mreframe');
```
or separate submodules:
```js
let rf = require('mreframe/re-frame');
let {getIn} = require('mreframe/util');
```
In case you're using nodeps bundle, or if you want to customize the equality function used by mreframe, run `_init` first:
```js
rf._init({eq: _.eq});
```
`_init` is exposed by `reagent` submodule (affects only the submodule itself), and also by `re-frame` and the main module
(affects both `re-frame` and `reagent` submodules).

[`mreframe/atom`](docs/atom.md) module implements a data storing mechanism called [atoms](https://clojure.org/reference/atoms);
the main operations provided by it are `deref(atom)` which returns current atom value, `reset(atom, value)` which replaces
the atom value, and `swap(atom, f, ...args)` which updates atom value (equivalent to `reset(atom, f(deref(atom), ...args))`).

For further information, see [API reference](#api-reference) below and the following tutorials / live demo pages:
[Reagent (components)](https://lexofleviafan.github.io/mreframe/reagent.html),
[re-frame (events/state management)](https://lexofleviafan.github.io/mreframe/re-frame.html).


# Q & A

* Q: It says I shouldn't mutate the data stored in atoms; how do I update it in that case?  
  A: Non-mutating updates can be done using functions from [`mreframe/util`](docs/util.md), or a full-scale functional library
  like [Lodash](https://lodash.com) / [Ramda](https://ramdajs.com) (/ [Rambda](https://selfrefactor.github.io/rambda)).
* Q: How do I inject raw HTML?  
  A: If you absolutely have to, use [`m.trust`](https://mithril.js.org/trust.html).
* Q: What about routing?  
  A: Use [Mitrhil routing API](https://mithril.js.org/route.html).
* Q: But neither is available in `dist/mreframe.min.js`!  
  A: If you're using JS files from CDN, pick `dist/mreframe-nodeps.min.js` instead, and load Mithril as a separate script;
  then run [`rf._init`](docs/re-frame.md#_init-opts) to connect them.
* Q: Are there any third-party libraries (components etc.) I can use with this?  
  A: Yes, pretty much any [Mithril library](https://awesomeopensource.com/project/orbitbot/awesome-mithril) should be compatible.
* Q: How stable is this API?  
  A: The Reagent + re-frame combination has existed since 2015 without much change; as I'm reusing it pretty much directly,
  there's no reason to change much for me either (the only breaking changes so far were in v0.1 update, where I properly
  implemented subscription detection/redraw cutoff).
* Q: And how performant is this thing?  
  A: Mithril boasts high speed in raw rendering; `mreframe/reagent` naturally slows it down to an extent (up to several times),
  but in v0.1 a redraw cutoff was added, which greatly reduces recalculated area in complex pages with large amount of components.
  (See render performance comparison for [Mithril](https://lexofleviafan.github.io/mreframe/performance/mithril.html) and
  [mreframe](https://lexofleviafan.github.io/mreframe/performance/mreframe.html) – though they're mostly testing raw render performance)
* Q: I have a _huge_ amount of DB events per second in my app, can I disable the deep-equality check in `db` effect handler?  
  A: Specify `eq` in [`rf._init`](docs/re-frame.md#_init-opts) to replace it with either [`eqShallow`](docs/util.md#eqShallow-a-b)
  or [`indentical`](docs/util.md#identical-a-b).


# Examples

* [Reagent form-2 components + Reagent/Mithril interop](examples/reagent.js.html) (scripted in JavaScript)
  [[live]](https://lexofleviafan.github.io/mreframe/examples/reagent.js.html)
* [Re-frame state/side-effects management with Reagent components](examples/re-frame.coffee.html) (scripted in CoffeeScript)
  [[live]](https://lexofleviafan.github.io/mreframe/examples/re-frame.coffee.html)
* [Routing using `m.route` (from external Mithril bundle, connected via `_init`)](examples/route.wisp.html) (scripted in Wisp)
  [[live]](https://lexofleviafan.github.io/mreframe/examples/route.wisp.html)
* [Rendering HTML from Reagent components using `mithril-node-render`](examples/node-render.coffee) (scripted in CoffeeScript)


# API reference

[`mreframe`](docs/index.md) exposes following submodules:
* [`util`](docs/util.md) includes utility functions (which were implemented in mreframe to avoid external dependencies
  and were exposed so that it can be used without dependencies other than Mithril);
* [`atom`](docs/atom.md) defines a simple equivalent for [Clojure atoms](https://clojure.org/reference/atoms), used for
  controlled data updates (as holders for changing data);
* [`reagent`](docs/reagent.md) defines an alternative,
  [Hiccup](https://cljdoc.org/d/reagent/reagent/1.0.0/doc/tutorials/using-hiccup-to-describe-html)-based component interface
  for Mithril;
* [`re-frame`](docs/re-frame.md) defines a system for managing state/side-effects in a Reagent/Mithril application.

Each of these can be used separately (`require('mreframe/<name>')`), or as part of the main module
(`require('mreframe').<name>`; `.reFrame` in case of `re-frame` module). Note that the nodeps bundle doesn't load
Mithril libraries by default (so you'll have to call the `_init` function which it also exports).

As most of these functions are based on existing ClojureScript equivalents, I'll provide links to respective CLJ docs
for anyone interested (although, if you're familiar with these concepts, you'll get the idea from the function name
in most cases). A major difference, of course, is that instead of vectors, JS arrays are used, and dictionaries
(plain objects) are used instead of maps; instead of keywords, strings are uses (`:foo` → `'foo'`).
Since [Wisp](https://github.com/Gozala/wisp) does the same,
using `mreframe` with Wisp makes for mostly identical code to that of CLJS
[`reagent`](http://reagent-project.github.io)/[`re-frame`](https://day8.github.io/re-frame) (at least in regular usecases).

`mreframe` module API:
* setup: [`_init`](docs/re-frame.md#_init-opts) (normally not needed);
* submodules: [`reFrame`](docs/re-frame.md), [`reagent`](docs/reagent.md), [`atom`](docs/atom.md), [`util`](docs/util.md).

`mreframe/re-frame` module API:
* setup: [`rf._init`](docs/re-frame.md#_init-opts) (normally not needed);
* events (decision-making logic defined as pure functions):
  - registering functions ([`rf.regEventDb`](docs/re-frame.md#regEventDb-id-interceptors-handler),
    [`rf.regEventFx`](docs/re-frame.md#regEventFx-id-interceptors-handler),
    [`rf.regEventCtx`](docs/re-frame.md#regEventCtx-id-interceptors-handler)),
  - dispatching functions ([`rf.dispatch`](docs/re-frame.md#dispatch-event),
    [`rf.dispatchSync`](docs/re-frame.md#dispatchSync-event)),
  - unregistering function for development ([`rf.clearEvent`](docs/re-frame.md#clearEvent-id)),
  - helper function [`rf.purgeEventQueue`](docs/re-frame.md#purgeEventQueue-) (for cancelling scheduled events);
* subscriptions (computations for views, with caching):
  - registering function ([`rf.regSub`](docs/re-frame.md#regSub-id-computation)),
  - querying functions ([`rf.subscribe`](docs/re-frame.md#subscribe-query), [`rf.dsub`](docs/re-frame.md#dsub-query)),
  - unregistering function for development ([`rf.clearSub`](docs/re-frame.md#clearSub-id)),
  - cache clearing function for development ([`rf.clearSubscriptionCache`](docs/re-frame.md#clearSubscriptionCache-));
* effects (implementation of side-effects for use in events):
  - registering function ([`rf.regFx`](docs/re-frame.md#regFx-id-handler)),
  - unregistering function for development ([`rf.clearFx`](docs/re-frame.md#clearFx-id)),
  - helper function [`rf.disp`](docs/re-frame.md#disp-event-args) (for dispatching `onSuccess`/`onFailure` events),
  - builtin effects ([`db`](docs/re-frame.md#db-builtin-effect), [`fx`](docs/re-frame.md#fx-builtin-effect),
    [`dispatchLater`](docs/re-frame.md#dispatchLater-builtin-effect), [`dispatch`](docs/re-frame.md#dispatch-builtin-effect));
* interceptors (‘wrappers’ that alter event processing when used in event registering function):
  - creator function ([`rf.toInterceptor`](docs/re-frame.md#toInterceptor-id-before-after)),
  - predefined interceptors ([`rf.unwrap`](docs/re-frame.md#unwrap), [`rf.trimV`](docs/re-frame.md#trimV)) and generators
    ([`rf.path`](docs/re-frame.md#path-path), [`rf.enrich`](docs/re-frame.md#enrich-f), [`rf.after`](docs/re-frame.md#after-f),
    [`rf.onChanges`](docs/re-frame.md#onChanges-f-outPath-inPaths)),
  - helper functions ([`rf.getCoeffect`](docs/re-frame.md#getCoeffect-context-key-notFound),
    [`rf.assocCoeffect`](docs/re-frame.md#assocCoeffect-context-key-value),
    [`rf.getEffect`](docs/re-frame.md#getEffect-context-key-notFound),
    [`rf.assocEffect`](docs/re-frame.md#assocEffect-context-key-value),
    [`rf.enqueue`](docs/re-frame.md#enqueue-context-interceptors));
* coeffects (‘external’ input getters for events, used as interceptors):
  - registering function ([`rf.regCofx`](docs/re-frame.md#regCofx-id-handler)),
  - interceptor creator function ([`rf.injectCofx`](docs/re-frame.md#injectCofx-id-arg)),
  - unregistering function for development ([`rf.clearCofx`](docs/re-frame.md#clearCofx-id)).

`mreframe/reagent` module API:
* setup: [`r._init`](docs/reagent.md#_init-opts) (normally not needed);
* atoms: [`r.atom`](docs/reagent.md#atom-x) (triggers redraw on update), [`r.cursor`](docs/reagent.md#cursor-src-path)
  (‘wrapper’ atom);
* component creation functions:
  - [`r.adaptComponent`](docs/reagent.md#adaptComponent-c) for using Mithril components,
  - [`r.createClass`](docs/reagent.md#createClass-spec) for creating Reagent components with hooks;
* component rendering functions:
  - [`r.createElement`](docs/reagent.md#createElement-type-props-children) for directly invoking Mithril hyperscript,
  - [`r.asElement`](docs/reagent.md#asElement-form) for rendering Hiccup,
  - [`r.with`](docs/reagent.md#with-meta-form) for supplying metadata (props) to Reagent components,
  - [`r.render`](docs/reagent.md#render-form-container) for mounting Reagent/Hiccup view on DOM,
  - [`r.resetCache`](docs/reagent.md#resetCache-) for clearing function components cache (for development);
* component helper functions:
  - [`r.classNames`](docs/reagent.md#classNames-classes) for generating/combining CSS classes lists,
  - [`r.curentComponent`](docs/reagent.md#currentComponent-) for accessing Mithril component from Reagent views,
  - component data accessors ([`r.children`](docs/reagent.md#children-vnode), [`r.props`](docs/reagent.md#props-vnode),
    [`r.argv`](docs/reagent.md#argv-vnode), [`r.stateAtom`](docs/reagent.md#stateAtom-vnode)),
  - Reagent component state reader function ([`r.state`](docs/reagent.md#state-vnode) and updater functions
    ([`r.setState`](docs/reagent.md#setState-vnode-newState), [`r.replaceState`](docs/reagent.md#replaceState-vnode-newState)).

`mreframe/atom` module API:
* regular atom creator function ([`atom`](docs/atom.md#atom-x));
* atom state reader ([`deref`](docs/atom.md#deref-atom));
* atom state updaters ([`reset`](docs/atom.md#reset-atom-value), [`resetVals`](docs/atom.md#resetVals-atom-value),
  [`swap`](docs/atom.md#swap-atom-f-args), [`swapVals`](docs/atom.md#swapVals-atom-f-args),
  [`compareAndSet`](docs/atom.md#compareAndSet-atom-oldval-newval)).

`mreframe/util` module API:
* general-use functions ([`identity`](docs/util.md#identity-x), [`eq`](docs/util.md#eq-a-b), [`eqShallow`](docs/util.md#eqShallow-a-b),
  [`indentical`](docs/util.md#identical-a-b), [`chain`](docs/util.md#chain-x-fns), [`repr`](docs/util.md#repr-x));
* type check functions ([`type`](docs/util.md#type-x), [`isArray`](docs/util.md#isArray-x), [`isDict`](docs/util.md#isDict-x),
  [`isFn`](docs/util.md#isFn-x));
* functions for arrays ([`chunks`](docs/util.md#chunks-xs-n), [`flatten`](docs/util.md#flatten-xs));
* functions for dicts ([`dict`](docs/util.md#dict-kvs), [`entries`](docs/util.md#entries-o), [`keys`](docs/util.md#keys-o),
  [`vals`](docs/util.md#vals-o));
* functions manipulating collections ([`merge`](docs/util.md#merge-os), [`assoc`](docs/util.md#assoc-o-k-v),
  [`dissoc`](docs/util.md#dissoc-o-ks), [`update`](docs/util.md#update-o-k-f-args), [`getIn`](docs/util.md#getIn-o-path),
  [`assocIn`](docs/util.md#assocIn-o-path-v), [`updateIn`](docs/util.md#updateIn-o-path-f-args));
* a simple [multimethods](https://clojure.org/reference/multimethods) implementation
  ([`multi`](docs/util.md#multi-dispatchIdentity)).
