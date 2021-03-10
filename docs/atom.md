## `atom` module

Based on Clojure atoms (except that watch functions and validators aren't implemented), i.e. a holder for a changing value;
also includes default implementation for most operations (with synchronicity expectation,
but they're supposed to be atomic anyway), so to implement your own atom you only need to define `deref`
as well as one of `reset`, `resetVals`, `swap` or `swapVals` for it. These functions can be used with RAtoms and RCursors.

All functions except for `atom` are multimethods dispatched by argument type (class).

### [`atom (x)`](https://clojuredocs.org/clojure.core/atom)
Produces a regular atom holding `x` (`undefined` if nothing was passed).
```js
atom(42)  // ⇒ Atom(42)
```

### [`deref (atom)`](https://clojuredocs.org/clojure.core/deref)
Returns the value held by `atom` (also in Wisp: `@atom`).
```js
var x = atom(42)
deref(x)  // ⇒ 42
```

### [`reset (atom, value)`](https://clojuredocs.org/clojure.core/reset!)
Replaces the value held by `atom` with `value` (`value` is returned).
```js
var x = atom(42)
reset(x, 10)  // ⇒ 10
deref(x)      // ⇒ 10
```

### [`resetVals (atom, value)`](https://clojuredocs.org/clojure.core/reset-vals!)
Replaces the value held by `atom` with `value` (`[oldValue, value]` is returned).
```js
var x = atom(42)
resetVals(x, 10)  // ⇒ [42, 10]
deref(x)          // ⇒ 10
```

### [`swap (atom, f, ...args)`](https://clojuredocs.org/clojure.core/swap!)
Updates the value held by `atom` by applying function `f` on it (the new value is returned).
```js
var x = atom({answer: 42})
swap(x, assoc, 'foo', 10) // ⇒ {answer: 42, foo: 10}
deref(x)                  // ⇒ {answer: 42, foo: 10}
```

### [`swapVals (atom, f, ...args)`](https://clojuredocs.org/clojure.core/swap-vals!)
Updates the value held by `atom` by applying function `f` on it (`[oldValue, newValue]` is returned).
```js
var x = atom({answer: 42})
swapVals(x, assoc, 'foo', 10) // ⇒ [{answer: 42}, {answer: 42, foo: 10}]
deref(x)                      // ⇒ {answer: 42, foo: 10}
```

### [`compareAndSet (atom, oldval, newval)`](https://clojuredocs.org/clojure.core/compare-and-set!)
Replaces the value held by `atom` with `newval` _if_ the current value is **identical** to `oldval`
(`true`/`false` is returned depending on success).
```js
var x = atom(42),  y = atom({answer: 42})
compareAndSet(x, 42, 12)           // ⇒ true
deref(x)                           // ⇒ 12
compareAndSet(x, 42, 11)           // ⇒ false /* because @x is 12 */
deref(x)                           // ⇒ 12
compareAndSet(y, {answer: 42}, 12) // ⇒ false /* because @y is not the same dict */
deref(y)                           // ⇒ {answer: 42}
```
