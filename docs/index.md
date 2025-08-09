## main module

The main module imported with `require('mreframe')`.

Exports the following items:
* [`util`](util.md) – the `mreframe/util` submodule
* [`atom`](atom.md) – the `mreframe/atom` submodule
* [`reagent`](reagent.md) – the `mreframe/reagent` submodule
* [`reFrame`](re-frame.md) – the `mreframe/re-frame` submodule
* [`_init (opts)`](re-frame.md#_init-opts) from re-frame submodule
* [`inNamespace (namespace)`](re-frame.md#innamespace-namespace) which produces a copy of the above,
  but replacing `reFrame` with its respective namespace.

There's also [`jsx-runtime`](jsx-runtime.md) which isn't included in main module (it implements JSX support).
