## `jsx-runtime` module

Implements a JSX interface for [Babel API](https://babeljs.io/docs/babel-plugin-transform-react-jsx).  
You're likely not going to use this directly.

Exports the following items:
* `jsx (tag, {children?, ...attrs}, key?)` – a replacement for single-child (or childless) JSX element
* `jsxs (tag, {children=[], ...attrs}, key?)` – a replacement for multi-child JSX element
* `Fragment` – the `tag` value for `<>` tags (equals to `'<>'`, as per Hiccup definition)


### Usage

In order to use `mreframe` with JSX, you need to do the following:
* install NPM packages `@babel/cli`, `@babel/core`, `@babel/plugin-transform-react-jsx`;
  optionally `@babel/plugin-transform-modules-commonjs` (to use produced files directly in browser)
* configure Babel (i.e. in `.babelrc`):
  ```js
  {
    "plugins": [
      ["@babel/plugin-transform-react-jsx", {
        "runtime":      "automatic",
        "importSource": "mreframe"
      }],
      // uncomment this to have require() instead of import; this makes JSX output messier though
      //["@babel/plugin-transform-modules-commonjs"]
    ]
  }
  ```
* add a `script` command (in `package.json`) to run Babel; e.g.
  ```json
  {
    ...
    "script": {
      "build": "babel src/ -d dist/"
    }
    ...
  }
  ```
  such a command can be run as `npm run build` (or `yarn build` when using `yarn`)


### Issues

JSX is not particularly compatible with Reagent-style components; you're likely to encounter following issues:

* component arguments have to be passed as `children` array; this may take one of the following forms:
  - `<Component>{[foo, bar, baz]}</Component>`
  - `<Component>{foo}{bar}{baz}</Component}`
  - `<Component children={[foo, bar, baz]}/>`
  - `{[Component, foo, bar, baz]}`

* single arguments can be passed without wrapping into an array… unless it's an array value: in this case not
  wrapping it would result in it being treated as an argument list

* attributes can be used, but they're _not_ included in the component arguments; they're passed as `meta`/`attrs`
  (i.e. `r.props( r.currentComponent() )`)

* native (Mithril) components must be [adapted](reagent.md#adaptcomponent-c) before you can use them

* attributes named `children` or `argv` are unsupported
