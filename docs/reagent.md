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

### `_init (opts)`
Is a setup function (only necessary if you're using `nodeps` bundle); `opts` may include:
* `redraw`: redraw hook function (defaults to `m.redraw`);
* `mount`: vnode mount function (defaults to `m.mount`);
* `hyperscript`: vnode generation function (defaults to `m`; `.fragment` is used for rendering fragments if present);

Only included options are updated, so if you need to disable redraw for some reason you can simply call `r._init({redraw: identity})`.

### `resetCache ()`
Clears function-components cache (shouldn't really be necessary).

### [`atom (x)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-atom)
Creates an [atom](atom.md); it calls the `redraw` hook on every successful data update
(but doesn't update when setting the same value).
```js
var x = r.atom(42)      // ⇒ RAtom(42)
reset(x, {answer: 42})  // ⇒ {answer: 42} /* m.redraw() is called on update */
reset(x, {answer: 42})  // ⇒ {answer: 42} /* m.redraw() is not called as the value has not changed */
```

### [`cursor (src, path)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-cursor)
creates a derived [atom](atom.md); it also skips updates when new value is the same as the old one
* if `src` is a function, `deref(rcursor)` returns `src(path)`, and `reset(rcursor, value)` calls `src(path, value)`;
* otherwise, `deref()` returns `getIn(deref(src), path)`, and `reset()` calls `swap(src, assocIn, path, value)`.
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

### [`classNames (...classes)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-class-names)
Combines multiple CSS class definitions into a `class` attribute value (a definition can be a string, a list, or a dictionary).
```js
r.classNames("foo bar", [1 && 'x', 0 && 'y', 'z'],
             {answer: 42, foo: null, error: false}) // ⇒ "bar x z answer"
```

### [`createElement (type, props?, ...children)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-create-element)
Invokes Mithril directly to produce a vnode (`props` are optional when there's no children); when `props` are provided,
each of Mithril CSS class (`class`, `className` & `classList`) attributes is replaced using `classNames()` (unless it's nil).  
Note: for performance, children are passed to Mithril as an array (fragment with no metadata).
```js
r.createElement('div', {class: ['foo', x && 'bar', 'baz']}, "Hello World")
// ~ m('div', {class: r.classNames(['foo', x && 'bar', 'baz'])}, "Hello World")
```
Note regarding `classList`: in Mithril, it works same way as `class` or `className` (accepts a string and not a list),
except that including classes in tag selector (e.g. `div.foo`) _overrides_ it instead of it being appended to generated CSS classes.

### [`adaptComponent (c)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-adapt-react-class)
Converts a Mithril component into a Reagent component.  
Its arguments are passed to the vnode as `children`, and metadata is passed as `attrs`.
```js
var x = r.adaptComponent({view: ({attrs, children}) => m('div', attrs, "Hello, World", children)}),
    y = () => r.with(meta, [x, 1, 2, 3]) // ~ ['>', x, meta, 1, 2, 3]
```

### [`asElement (form)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-as-element)
Converts Hiccup form(s) into Mithril vnodes.
```js
r.asElement(['>', mComponent, 1, 2, 3])          // ⇒ m(mComponent, 1, 2, 3)
r.asElement([rComponent, 1, 2, 3])               // ⇒ m(/*rComponent*/, {}, 1, 2, 3)
r.asElement(['<>', ['div', {class: 'foo'}, 42]]) // ⇒ m.fragment({}, [m('div', {class: 'foo'}, 42)])
```

### `with (meta, form)`
Adds metadata (`meta`) to the `form` of a fragment or a Reagent component in place of props;
can be used to supply a [`key`](https://mithril.js.org/keys.html).
```js
r.asElement( r.with({key: 42}, [rComponent, 1, 2, 3]) )  // ⇒ m(/*rComponent*/, {key: 42}, 1, 2, 3)
r.asElement( r.with({key: 42}, ['<>', x && ['div', {id: x}]]) )
// ⇒ m.fragment({key: 42}, [x && ['div', {id: x}]])
```

### [`createClass (spec)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-create-class)
Creates a Reagent component based on provided hook methods (mostly based on Clojure equivalents; in Wisp, use symbols as keys):
- `getInitialState` produces initial state of the state atom (runs at the start)
- `constructor` [initialises the component](https://mithril.js.org/lifecycle-methods.html#oninit)
  (currently runs after `getInitialState`)
- `componentDidMount` [runs after first render to DOM](https://mithril.js.org/lifecycle-methods.html#oncreate)
- `componentDidUpdate` [runs after a DOM update](https://mithril.js.org/lifecycle-methods.html#onupdate)
- `componentWillUnmount` [runs before removal from DOM](https://mithril.js.org/lifecycle-methods.html#onremove)
- `shouldComponentUpdate` [checks if there's a need for update](https://mithril.js.org/lifecycle-methods.html#onbeforeupdate)
- `beforeComponentUnmounts` [runs pre-removal code/promise for the root of a subtree that is being removed](https://mithril.js.org/lifecycle-methods.html#onbeforeremove)
- `render` renders a Mithril component (see [`view`](https://mithril.js.org/components.html) method)
- `reagentRender` is the same as `render` but renders Hiccup instead (same as function components)

**Note:** `shouldComponentUpdate` overrites Reagent changes detection

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

### [`render (form, container)`](https://reagent-project.github.io/docs/master/reagent.dom.html#var-render)
Mounts a Hiccup form as a component onto a DOM element.
```js
r.render([App], document.body)
// ~ m.mount(document.body, {view: () => r.asElement([App])})
```

### [`currentComponent ()`](http://reagent-project.github.io/docs/master/reagent.core.html#var-current-component)
Returns the vnode of current component (in a function component or a method of a Reagent component).  
Note that if you use an unbound `function` in either case, the vnode will be accessible as `this`.
```js
var rComponent = () => [...r.currentComponent().children] // ~ {view: ({children}) => [...children]}
```

### [`children (vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-children)
Returns children of the Mithril vnode.
```js
var rComponent = () => [...r.children( r.currentComponent() )]
// ~ {view: ({children}) => [...children]}
```

### [`props (vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-props)
Returns props (`attrs`) of the Mithril vnode.
```js
var rComponent = () => ['div', r.attrs( r.currentComponent() )]
// ~ {view: ({attrs}) => m('div', attrs)}
```

### [`argv (vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-argv)
Returns the Hiccup form passed to the Reagent component.
```js
var rComponent = () => {console.log(r.argv( r.currentComponent() ));  return ['div']}
// prints [rComponent, 1, 2, 3] if used as such
```

### [`stateAtom (vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-state-atom)
Returns RAtom containing state of a Reagent component.
```js
var rComponent = r.createClass({
  getInitialState: () => ({answer: 42}),
  reagentRender: () => ['div', "Answer: ", deref(r.stateAtom( r.currentComponent() )).answer],
})
```

### [`state (vnode)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-state)
Returns state of a Reagent component (same as `deref( r.stateAtom(vnode) )`).
```js
var rComponent = r.createClass({
  getInitialState: () => ({answer: 42}),
  reagentRender: () => ['div', "Answer: ", r.state( r.currentComponent() ).answer],
})
```

### [`replaceState (vnode, newState)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-replace-state)
Replaces state of a Reagent component (same as `reset(r.stateAtom(vnode), newState)`).
```js
var rComponent = r.createClass({
  getInitialState: () => ({answer: 42}),
  reagentRender () {
    let x = r.state(this).answer;
    return ['div',
             "Answer: ", x, " ",
             ['button', {onclick: () => r.replaceState(this, {answer: x+1})}, "+1"]],
  },
})
```
### [`setState (vnode, newState)`](http://reagent-project.github.io/docs/master/reagent.core.html#var-set-state)
Partially updates state of a Reagent component (same as `swap(r.stateAtom(vnode), merge, newState)`).
```js
var rComponent = r.createClass({
  getInitialState: () => ({answer: 42, foo: 1}),
  reagentRender () {
    let x = r.state(this);
    return ['div',
             "Answer: ", x.answer, " (", x.foo, ") ",
             ['button', {onclick: () => r.setState(this, {answer: x+1})}, "+1"]],
  },
})
```
