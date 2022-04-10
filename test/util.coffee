[o, util] = ['ospec', '../src/util'].map require
{identity, type, keys, vals, entries, dict, merge, assoc, dissoc, update, getIn,
 assocIn, updateIn, chunks, flatten, repr, eq, chain, multi} = util

o.spec "mreframe/util", ->

  o "identity()", ->
    x = {}
    o(identity x).equals(x)				"returns passed value"

  o "type()", ->
    Foo = ->
    class Bar
    o(type()).equals(undefined)				"type of undefined is undefined"
    o(type null).equals(null)				"type of null is null"
    o(type 0).equals(Number)				"type of 0 is Number"
    o(type false).equals(Boolean)			"type of false is Boolean"
    o(type 'foo').equals(String)			"type of 'foo' is String"
    o(type {}).equals(Object)				"type of {} is Object"
    o(type []).equals(Array)				"type of [] is Array"
    o(type /x/).equals(RegExp)				"type of /x/ is RegExp"
    o(type Foo).equals(Function)			"type of a function is Function"
    o(type new Foo).equals(Foo)				"type of a constructed object is its function"
    o(type =>).equals(Function)				"type of a lambda is Function"
    o(type new Bar).equals(Bar)				"type of a class member is its class"
    o(type Bar).equals(Function)			"type of a class is Function (because JavaScript)"
    o(type constructor: ->).equals(Object)		"overriding constructor doesn't break the function"

  o "keys()", ->
    o(keys {}).deepEquals([])				"works on empty objects"
    o(keys foo: 'bar').deepEquals(['foo'])		"works on single-key objects"
    o( keys(foo: 1, bar: 2, baz: 3).sort() )
      .deepEquals(['bar', 'baz', 'foo'])		"works on multi-key objects"
    o(keys "foo").deepEquals(['0', '1', '2'])		"works on strings"
    o(keys ['foo', 'bar']).deepEquals(['0', '1'])	"works on arrays"
    o(keys null).deepEquals([])				"works on null"
    o( keys() ).deepEquals([])				"works on undefined"

  o "vals()", ->
    o(vals {}).deepEquals([])				"works on empty objects"
    o(vals foo: 'bar').deepEquals(['bar'])		"works on single-key objects"
    o( vals(foo: 1, bar: 2, baz: 3).sort() )
      .deepEquals([1, 2, 3])				"works on multi-key objects"
    o(vals "foo").deepEquals(['f', 'o', 'o'])		"works on strings"
    o(vals ['foo', 'bar']).deepEquals(['foo', 'bar'])	"works on arrays"
    o(vals null).deepEquals([])				"works on null"
    o( vals() ).deepEquals([])				"works on undefined"

  o "entries()", ->
    a = foo: 1, bar: 2, baz: 3
    b = foo: 1, bar: 2, baz: 3
    o((entries a).sort())
      .deepEquals([['bar', 2], ['baz', 3], ['foo', 1]])	"works"
    o(a).deepEquals(b)					"doesn't mutate arguments"
    o(entries {}).deepEquals([])			"works on empty dicts"
    o(entries ['a', 'b'])
      .deepEquals([['0', 'a'], ['1', 'b']])		"works on lists"
    o(entries null).deepEquals([])			"works on null"
    o( entries() ).deepEquals([])			"works on undefined"

  o "dict()", ->
    a = foo: 1, bar: 2, baz: 3
    b = entries a
    o(dict b).deepEquals(a)				"works"
    o(b).deepEquals(entries a)				"doesn't mutate arguments"
    o(dict []).deepEquals({})				"works on empty lists"
    o(dict null).deepEquals({})				"works on null"
    o(dict()).deepEquals({})				"works on undefined"

  for [check, value] in [['isArray', Array], ['isDict', Object], ['isFn', Function]]
    do (check, value) -> o "#{check}()", ->
      Foo = ->
      class Bar
      for x in [undefined, null, 0, false, 'foo', {}, [], /x/, Foo, new Foo, (=>), new Bar, Bar]
        o(util[check] x).equals((type x) is value)	"works on #{(type x)?.name or x}"

  o "merge()", ->
    a = foo: 1, bar: 1.5
    b = bar: 2, baz: 2.5
    c = baz: 3
    o(merge a, b, c)
      .deepEquals(foo: 1, bar: 2, baz: 3)		"combines dicts in order"
    o(a).deepEquals(foo: 1, bar: 1.5)			"doesn't mutate arguments"
    o(b).deepEquals(bar: 2, baz: 2.5)			"doesn't mutate arguments"
    o(c).deepEquals(baz: 3)				"doesn't mutate arguments"
    o(merge a).deepEquals(a)				"returns a copy with one argument"
    o( merge() ).deepEquals({})				"returns an empty object with no arguments"
    o( merge() ).notEquals( merge() )			"returns new object on every call"
    o(merge a).notEquals(a)				"returns new object on every call"

  o "assoc()", ->
    a = foo: 1, bar: 1.5
    b = merge a
    o(assoc a, 'baz', 42)
      .deepEquals(foo: 1, bar: 1.5, baz: 42)		"adds a key to a dict"
    o(a).deepEquals(b)					"doesn't mutate arguments"
    o(assoc a, 'bar', 42).deepEquals(foo: 1, bar: 42)	"replaces an existing key"
    o(assoc null, 'foo', 42).deepEquals(foo: 42)	"works on null"
    o(assoc undefined, 'foo', 42).deepEquals(foo: 42)	"works on undefined"

  o "dissoc()", ->
    a = foo: 1, bar: 1.5, answer: 42
    b = merge a
    o(dissoc a, 'bar').deepEquals(foo: 1, answer: 42)	"works with a single key"
    o(dissoc a, 'bar', 'answer').deepEquals(foo: 1)	"works with multiple keys"
    o(a).deepEquals(b)					"doesn't mutate arguments"
    o(dissoc a, 'baz').deepEquals(a)			"works on nonexisting keys"
    o(dissoc null, 'foo').deepEquals({})		"works on null"
    o(dissoc undefined, 'foo').deepEquals({})		"works on undefined"

  o "update()", ->
    inc = (n) -> n + 1
    sub = (n, m) -> n - m
    a = foo: 1, bar: 1.5
    b = merge a
    o(update a, 'foo', inc)
      .deepEquals(foo: 2, bar: 1.5)			"applies a function to a key"
    o(a).deepEquals(b)					"doesn't mutate arguments"
    o(update a, 'bar', sub, 2)
      .deepEquals(foo: 1, bar: -0.5)			"passes value as first argument"
    o(update a, 'baz', identity)
      .deepEquals(foo: 1, bar: 1.5, baz: undefined)	"works on nonexisting keys"
    o(update null, 'foo', identity)
      .deepEquals(foo: undefined)			"works on null"
    o(update undefined, 'foo', identity)
      .deepEquals(foo: undefined)			"works on undefined"

  o "getIn()", ->
    a = foo: bar: baz: 42
    o(getIn a, ['foo', 'bar', 'baz']).equals(42)	"returns field value from path"
    o(getIn a, ['foo']).deepEquals(bar: baz: 42)	"works with one key"
    o(getIn a, []).equals(a)				"returns the object with empty path"
    o(getIn a, ['foo', 'baz', 'bar']).equals(undefined)	"returns undefined for nonexistent path"
    o(getIn null, ['foo']).equals(undefined)		"works on null"
    o(getIn undefined, ['foo']).equals(undefined)	"works on undefined"

  o "assocIn()", ->
    a = foo: bar: baz: 42
    b = foo: bar: baz: 42
    o(a).deepEquals(b)
    o(assocIn a, ['foo', 'bar', 'baz'], 'X')
      .deepEquals(foo: bar: baz: 'X')			"returns a dict with updated deep field"
    o(a).deepEquals(b)					"doesn't mutate the dict"
    o(assocIn a, ['foo', 'baz', 'bar'], 'X')
      .deepEquals(foo: bar: {baz: 42}, baz: {bar: 'X'})	"works on nonexistent paths"
    o(assocIn a, ['foo'], 'X').deepEquals(foo: 'X')	"replaces paths"
    o(assocIn null, ['foo'], 'X').deepEquals(foo: 'X')	"works on null"
    o(assocIn undefined, ['foo', 'bar'], 'X')
      .deepEquals(foo: bar: 'X')			"works on undefined"
    o(assocIn a, [], 'X')
      .deepEquals(foo: {bar: baz: 42}, undefined: 'X')	"on empty path sets 'undefined' key"

  o "updateIn()", ->
    inc = (n) -> n + 1
    sub = (n, m) -> n - m
    a = foo: bar: baz: 42
    b = foo: bar: baz: 42
    o(a).deepEquals(b)
    o(updateIn a, ['foo', 'bar', 'baz'], inc)
      .deepEquals(foo: bar: baz: 43)			"returns a dict with updated deep field"
    o(a).deepEquals(b)					"doesn't mutate the dict"
    o(updateIn a, ['foo', 'bar', 'baz'], sub, 1)
      .deepEquals(foo: bar: baz: 41)			"passes value as the first argument"
    o(updateIn a, ['foo', 'baz', 'bar'], -> 'X')
      .deepEquals(foo: bar: {baz: 42}, baz: {bar: 'X'})	"works on nonexistent paths"
    o(updateIn a, ['foo'], -> 'X').deepEquals(foo: 'X')	"replaces paths"
    o(updateIn null, ['foo'], -> 'X')
      .deepEquals(foo: 'X')				"works on null"
    o(updateIn undefined, ['foo', 'bar'], -> 'X')
      .deepEquals(foo: bar: 'X')			"works on undefined"
    o(updateIn a, [], -> 'X')
      .deepEquals(foo: {bar: baz: 42}, undefined: 'X')	"on empty path sets 'undefined' key"
    c = foo: bar: {baz: 42}, baz: {bar: 'X'}
    o(updateIn c, ['foo'], dissoc, 'baz')
      .deepEquals(a)					"dissocIn = (o, path, ...ks) => updateIn(o, path, dissoc, ...ks)"

  o "chunks()", ->
    a = [1, 2, 3, 4, 5]
    b = a.slice()
    o(chunks a, 2).deepEquals( [[1, 2], [3, 4], [5]] )	"splits a list into parts of given size"
    o(a).deepEquals(b)					"doesn't mutate the list"
    o(chunks "abcdef", 3).deepEquals(["abc", "def"])	"works on strings"
    o(chunks [], 2).deepEquals([])			"returns 0 chunks for an empty list"
    o(chunks "", 2).deepEquals([])			"returns 0 chunks for an empty string"
    o(chunks a, 5).deepEquals([a])			"doesn't add an empty chunk"
    o(chunks a, 10).deepEquals([a])			"works with chunks larger than list"

  o "flatten()", ->
    o(flatten [[[1], [2, [3]], [[[4]]], [[5, 6, 7]]], 8, 9])
      .deepEquals([1, 2, 3, 4, 5, 6, 7, 8, 9])		"works"
    o(flatten []).deepEquals([])			"works on empty lists"
    o(flatten 42).equals(42)				"returns non-arrays as-is"

  o "repr()", ->
    a = foo: 1, bar: {q: 'x', answer: 42}, baz: 3
    stringified = '{"foo":1,"bar":{"q":"x","answer":42},"baz":3}'
    normalized = '{"bar":{"answer":42,"q":"x"},"baz":3,"foo":1}'
    o(keys a).deepEquals(['foo', 'bar', 'baz'])
    o(keys a.bar).deepEquals(['q', 'answer'])
    o(JSON.stringify a).equals(stringified)
    o(repr a).equals(normalized)			"reorders keys in alphabetic order"
    o(repr [9, 1, 3]).equals("[9,1,3]")			"works on lists"
    o(repr [/x/]).equals('["/x/"]')			"replaces RegExp with its pattern"

  o "eq()", ->
    o(eq 1, 1).equals(true)				"tests for equality [1]"
    o(eq 1, 2).equals(false)				"tests for equality [2]"
    o(eq [1, 2, 3], [1, 2, 3]).equals(true)		"works on lists [1]"
    o(eq [1, 2, 3], [1, 3, 2]).equals(false)		"works on lists [2]"
    o(eq [1, 2, 3], "1,2,3").equals(false)		"works on lists [3]"
    o(eq {foo: 1, bar: 2}, {bar: 2, foo: 1})
      .equals(true)					"works on dicts [1]"
    o(eq {foo: 1, bar: 2}, {foo: 2, bar: 1})
      .equals(false)					"works on dicts [2]"
    o(eq {foo: 1, bar: 2, baz: 3}, {foo: 1, bar: 2})
      .equals(false)					"works on dicts [3]"
    o(eq {foo: 1, bar: 2}, {foo: 1, bar: 2, baz: 3})
      .equals(false)					"works on dicts [4]"
    o(eq [{foo: 1, bar: 2}], [{bar: 2, foo: 1}])
      .equals(true)					"works on nested dicts [1]"
    o(eq [{foo: 1, bar: 2}], [{foo: 2, bar: 1}])
      .equals(false)					"works on nested dicts [2]"
    o(eq {baz: {foo: 1, bar: 2}}, {baz: {bar: 2, foo: 1}})
      .equals(true)					"works on nested dicts [3]"
    o(eq {baz: {foo: 1, bar: 2}}, {baz: {foo: 2, bar: 1}})
      .equals(false)					"works on nested dicts [4]"
    o(eq [[1, 2, 3]], [[1, 2, 3]]).equals(true)		"works on nested lists [1]"
    o(eq [[1, 2, 3]], [[1, 3, 2]]).equals(false)	"works on nested lists [2]"
    o(eq {foo: [1], bar: [2]}, {bar: [2], foo: [1]})
      .equals(true)					"works on nested lists [3]"
    o(eq {foo: [1], bar: [2]}, {foo: [2], bar: [1]})
      .equals(false)					"works on nested lists [4]"
    o(eq null, null).equals(true)			"works on null"
    o(eq undefined, undefined).equals(true)		"works on undefined"
    o(eq null, undefined).equals(false)			"null is not equal to undefined"
    o(eq NaN, NaN).equals(true)				"works on NaN (all values are equal to themselves)"

  o "chain()", ->
    a = foo: 1, bar: 2, baz: 3
    o(chain a, [merge, bar: 42])
      .deepEquals(foo: 1, bar: 42, baz: 3)		"returns first argument with functions applied to it"
    o(chain a, [merge, bar: 42], [update, 'bar', (n) => n+1])
      .deepEquals(foo: 1, bar: 43, baz: 3)		"applies functions in the passed order"
    o(chain a, [merge, answer: 42], keys)
      .deepEquals(['foo', 'bar', 'baz', 'answer'])	"supports passing functions without extra arguments"

  o "multi()", ->
    fn = multi().when('answer', -> 42).when('foo', -> 'bar').when('foo', -> 'baz')
    o(fn 'answer').equals(42)				"works on initially defined argument"
    o(fn 'foo').equals('baz')				"overriding is allowed"
    o(-> fn 'bar').throws(TypeError)			"fallback is throwing a TypeError"
    o(-> fn 'bar').throws("Invalid arguments")		"fallback error has a generic message"
    o(fn.default -> '?!').equals(fn)			"fallback can also be overridden"
    o(-> fn 'bar').notThrows(Object)			"overridden fallback replaces default"
    o(-> fn 'bar').notThrows(String)			"overridden fallback replaces default"
    o(fn 'bar').equals('?!')				"overridden fallback replaces default"
    o(fn.when 'bar', -> 111).equals(fn)			"adding new methods is still allowed"
    o(fn 'bar').equals(111)				"overridden method works"
    o(fn 'baz').equals('?!')				"overridden fallback also works"

    fn2 = (multi type).when(Object, repr).when(Array, (x) -> repr x.slice().sort())
    o(fn2 answer: 42).equals('{"answer":42}')		"dispatch by value can be overridden"
    o(fn2 [4, 1, 8]).equals("[1,4,8]")			"dispatch by type works"

    fn3 = (multi (...args) -> args.length).when(0, -> '[]').when(1, (x) -> "[#{x}]").when(2, (x, y) -> "{#{x}: #{y}}")
    o( fn3() ).equals("[]")				"multi-argument dispatch can be provided"
    o(fn3 'foo').equals("[foo]")			"multi-argument dispatch works [1]"
    o(fn3 'foo', 'bar').equals("{foo: bar}")		"multi-argument dispatch works [2]"
    o(-> fn3 'foo', 'bar', 'baz').throws(TypeError)	"multi-argument dispatch works [3]"
