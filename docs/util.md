## `util` module

These are common low-level utilities which can be found in many libraries but were implemented locally instead
to minimize the library size. And, since they've been implemented already, I might as well expose them for external usage.

### [`identity (x)`](https://clojuredocs.org/clojure.core/identity)
Returns its argument.
```js
identity(x) // ⇒ x
```

### `type (x)`
Returns type of its argument (that is, the type constructor, or `x` itself for nil values).
```js
type(new Date)  // ⇒ Date
type(/x/)       // ⇒ RegExp
type([])        // ⇒ Array
type({})        // ⇒ Object
type(0)         // ⇒ Number
type(null)      // ⇒ null
type(void 0)    // ⇒ undefined
```

### [`keys (o)`](https://clojuredocs.org/clojure.core/keys)
Returns keys of its argument (same as `Object.keys(x)` except it doesn't fail on nil values);
in case of an `Array` its `keys` are stringified indices.
```js
keys({foo: 1, bar: 2, baz: 3})  // ⇒ ['foo', 'bar', 'baz']
keys(['a', 'b', 'c'])           // ⇒ ['0', '1', '2']
keys(null)                      // ⇒ []
keys(void 0)                    // ⇒ []
```

### [`vals (o)`](https://clojuredocs.org/clojure.core/vals)
Returns vals of its argument (same as `Object.values(x)` except it doesn't fail on nil values);
in case of an `Array` its `vals` are simply its items.
```js
vals({foo: 1, bar: 2, baz: 3})  // ⇒ ['foo', 'bar', 'baz']
vals(['a', 'b', 'c'])           // ⇒ ['0', '1', '2']
vals(null)                      // ⇒ []
vals(void 0)                    // ⇒ []
```

### `entries (o)`
Returns key-value pairs of its argument in unspecified order (same as `Object.entries` except it doesn't fail on nil values).
```js
entries({foo: 1, bar: 2, baz: 3}) // ⇒ [['foo', 1], ['bar', 2], ['baz', 3]]
entries(['a', 'b', 'c'])          // ⇒ [['0', 'a'], ['1', 'b'], ['2', 'c']]
```

### `dict (kvs)`
Returns a dictionary built from provided key-value pairs (same as `Object.fromEntries` except it doesn't fail on nil values).
```js
dict([['foo', 1], ['bar', 2], ['baz', 3]])  // ⇒ {foo: 1, bar: 2, baz: 3}
```
### [`isArray (x)`](https://clojuredocs.org/clojure.core/vector_q)
Checks if its argument is an `Array` (alias to `Array.isArray(x)`).
```js
isArray([])   // ⇒ true
isArray({})   // ⇒ false
isArray(null) // ⇒ false
```

### [`isDict (x)`](https://clojuredocs.org/clojure.core/map_q)
Checks if its argument is a dictionary, i.e. a plain object used as a by-key collection (its `type()` is `Object`).
```js
isDict([])    // ⇒ false
isDict(/x/)   // ⇒ false
isDict({})    // ⇒ true
isDict(null)  // ⇒ false
```

### [`isFn (x)`](https://cljs.github.io/api/cljs.core/fnQMARK)
Checks if its argument is a function (its `type()` is `Function`; note that JS classes are also, in fact, functions).
```js
isFn(() => {})  // ⇒ true
isFn(Date)      // ⇒ true
isFn(Object)    // ⇒ true
isFn({})        // ⇒ false
```

### [`merge (...os)`](https://clojuredocs.org/clojure.core/merge)
Returns a dictionary composed by merging keys from `os` into an empty object (alias to `Object.assign({}, ...os)`);
merging is done successively left-to-right (right-fold), so in case of repeating keys, the last instance will be used.
```js
merge({foo: 1}, {bar: 2}, {baz: 3})     // ⇒ {foo: 1, bar: 2, baz: 3}
merge({foo: 1, bar: 2}, null, {foo: 3}) // ⇒ {foo: 3, bar: 2}
merge(['a', 'b', 'c'])                  // ⇒ {0: 'a', 1: 'b', 2: 'c'}
merge()                                 // ⇒ {}
```

### [`assoc (o, k, v)`](https://clojuredocs.org/clojure.core/assoc)
Returns a copy of dictionary `o` with the value for key `k` set to `v` (alias to `merge(o, {[k]: v})`).
```js
assoc({foo: 1, bar: 2}, 'baz', 3) // ⇒ {foo: 1, bar: 2, baz: 3}
assoc({foo: 1, bar: 2}, 'foo', 3) // ⇒ {foo: 3, bar: 2}
assoc(null, 'answer', 42)         // ⇒ {answer: 42}
```

### [`dissoc (o, ...ks)`](https://clojuredocs.org/clojure.core/dissoc)
Returns a copy of dictionary `o` without the keys `ks`.
```js
dissoc({foo: 1, bar: 2, baz: 3}, 'bar', 'baz') // ⇒ {foo: 1}
dissoc(null, 'foo')                            // ⇒ {}
```

### [`update (o, k, f, ...args)`](https://clojuredocs.org/clojure.core/update)
Returns a copy of dictionary `o` with the value `k` updated by calling the function `f` on it
(same as `assoc(o, k, f(o[k], ...args))` except it doesn't fail on a missing key).
```js
update({answer: 42}, 'answer', n => n+1)        // ⇒ {answer: 42}
update({foo: {bar: 1}}, 'foo', assoc, 'baz', 2) // ⇒ {foo: {bar: 1, baz: 2}}
```

### [`getIn (o, path)`](https://clojuredocs.org/clojure.core/get-in)
Returns the value in a nested structure, where `path` is a sequence of keys (e.g. `getIn(o, [foo, bar, baz])`
is equivalent to `o[foo][bar][baz]`, except it doesn't fail on missing keys); `getIn` can be used
as a trivial extractor (e.g. `rf.regSub('foo', getIn)` implements the `['foo']` query –
as well as `['foo', 'items']`, `['foo', 'items', 4]`, etc.).
```js
getIn({foo: {bar: 1}}, ['foo', 'bar'])  // ⇒ 1
getIn([{answer: 42}], [0, 'answer'])    // ⇒ 42
getIn({foo: {bar: 1}}, ['baz', 'bar'])  // ⇒ undefined
getIn(null, ['foo', 'bar'])             // ⇒ undefined
```

### [`assocIn (o, path, v)`](https://clojuredocs.org/clojure.core/assoc-in)
Returns a copy of dictionary `o` with the value for `getIn(it, path)` set to `v`;
if part of the path is missing, an empty dict is provided instead (thus, `path` is guaranteed to exist).
```js
assocIn({foo: {bar: 1}}, ['foo', 'bar'], 42)  // ⇒ {foo: {bar: 42}}
assocIn([{answer: 12}], [0, 'answer'], 42)    // ⇒ {0: {answer: 42}}
assocIn({foo: {bar: 1}}, ['baz', 'bar'], 42)  // ⇒ {foo: {bar: 1}, baz: {bar: 42}}
assocIn(null, ['foo', 'bar'], 42)             // ⇒ {foo: {bar: 42}}
```

### [`updateIn (o, path, f, ...args)`](https://clojuredocs.org/clojure.core/update-in)
Returns a copy of dictionary `o` with the value for `getIn(it, path)` set to `f(v, ...args)` (where `v` is the previous value);
if part of the path is missing, an empty dict is provided instead (thus, `path` is guaranteed to exist).
```js
updateIn({foo: {bar: 1}}, ['foo', 'bar'], n => n+1)          // ⇒ {foo: {bar: 2}}
updateIn([{answer: 12}], [0, 'answer'], ((a, b) => a-b), 2)  // ⇒ {0: {answer: 10}}
updateIn({foo: {bar: 1}}, ['baz', 'bar'], () => 42)          // ⇒ {foo: {bar: 1}, baz: {bar: 42}}
updateIn(null, ['foo', 'bar'], () => 42)                     // ⇒ {foo: {bar: 42}}
let dissocIn = (o, path, ...ks) => updateIn(o, path, dissoc, ...ks);
```

### [`chunks (xs, n)`](https://clojuredocs.org/clojure.core/partition-all)
Returns the array passed to it split into chunks the size of `n`;
leftover values are put in an extra chunk (equivalent to `(partition-all n xs)`).
```js
chunks([1, 2, 3, 4, 5], 2)  // ⇒ [[1, 2], [3, 4], [5]]
chunks("abcdef", 3)         // ⇒ ["abc", "def"]
chunks("", 2)               // ⇒ []
```

### [`flatten (xs)`](https://clojuredocs.org/clojure.core/flatten)
Returns a flattened version of the provided array (with every element in nested arrays
insterted in place of those arrays, until there's no array elements left).
```js
flatten([[1], [2, [3], 4], 5])  // ⇒ [1, 2, 3, 4, 5]
```

### `repr (x)`
Returns a normalized stringified version of its argument; equivalent to `JSON.stringify(x)`,
except the dict keys are sorted, and `RegExp` values are replaced with their `.toString()` (e.g. `/x/g` → `"/x/g"`);
used as a workaround for `Map` only supporting identity comparison.
```js
repr( [{foo: 1, bar: 2, baz: /3/}] )  // ⇒ `[{"bar": 2, "baz": "/3/", "foo": 1}]`
```

### [`identical (a, b)`](https://clojuredocs.org/clojure.core/identical_q)
Is a by-pointer identity comparison; it's the comparison function used by `reagent` and `re-frame` modules for most ratom update checks.
The difference from `===` is that it also checks for `NaN` (so that any value is identical to itself).
```js
identical("foo", "foo")  // ⇒ true
identical(NaN, NaN)      // ⇒ true
```

### [`eq (a, b)`](https://clojuredocs.org/clojure.core/%3D)
Is a by-value deep-comparison of plain data structures (supporting arrays and dictionaries);
it's the comparison function used by `re-frame` module for db update checks (can be overridden by calling `_init({eq: …})`).
```js
eq([{foo: 1, bar: NaN}], [{bar: NaN, foo: 1}])  // ⇒ true
```

### eqShallow (a, b)
Is a by-value shallow-comparison of plain data structures (supporting arrays and dictionaries);
it's used for comparing flat data structures.
```js
eqShallow({foo: 1, bar: NaN}, {bar: NaN, foo: 1})    // ⇒ true
eqShallow(['foo', 'bar', NaN], ['foo', 'bar', NaN])  // ⇒ true
```

### [`chain (x, ...fns)`](https://clojuredocs.org/clojure.core/-%3E)
Threads `x` through the provided list of functions, passing either `x` or result of previous function as the first argument;
extra arguments can be passed if you wrap the function in an array.
```js
chain({foo: 1, bar: 2, baz: 3},
      [merge, {answer: 42}],
      [dissoc, 'foo'],
      keys)
// ⇒ ['bar', 'baz', 'answer']
```

### [`multi (dispatch=identity)`](https://clojuredocs.org/clojure.core/defmulti)
Is a simple multimethod generator; it produces a function which dispatches using the `dispatch` function
(by identity comparison; default dispatch is by 1st argument) over the map of provided implementations.
* [`.when (x, f)`](https://clojuredocs.org/clojure.core/defmethod) sets the dispatched value `x` to implementation `f`
  (returns the multimethod so it can be chained)
* [`.default (f)`](https://clojuredocs.org/clojure.core/defmethod) sets the fallback dispatch to `f`
  (without it a `TypeError` is thrown instead; also returns the multimethod); equivalent to `(defmethod … :default …)`
```js
let foo = multi((...args) => args.length).when(0, () => "").when(1, x => `[${x}]`)
foo()                 // ⇒ ""
foo('bar')            // ⇒ "[bar]"
foo('bar', 'baz', 42) // TypeError("Invalid arguments")
foo.when(2, (k, v) => `{${k}: ${v}}`)
foo('bar', 'baz')     // ⇒ "{bar: baz}"
foo.default((...args) => repr(args))
foo('bar', 'baz', 42) // ⇒ `["bar","baz",42]`
```
