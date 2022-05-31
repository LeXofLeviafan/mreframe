exports.identity = identity = (x) => x
exports.type = type = (x) => unless x? then x else x.__proto__.constructor
exports.keys = keys = (x) => Object.keys x or {}
exports.vals = vals = (x) => Object.values x or {}
_entries = Object.entries or ((o) => keys(o).map (k) => [k, o[k]])
exports.entries = entries = (o) => _entries o or {}
_dict = Object.fromEntries or ((kvs) => merge ...kvs.map ([k, v]) => [k]: v)
exports.dict = (x) => _dict x or []
exports.isArray = isArray = Array.isArray
exports.isDict = isDict = (x) => (type x) is Object
exports.isFn = (x) => (type x) is Function
exports.merge = merge = (...os) => Object.assign {}, ...os
exports.assoc = assoc = (o, k, v) =>
  o = if isArray(o) and Number.isInteger(k) and k >= 0 then o[..] else {o...}
  o[k] = v
  o
exports.dissoc = (o, ...ks) =>
  o = if isArray(o) then o[..] else {o...}
  ks.forEach (k) => delete o[k]
  o
exports.update = update = (o, k, f, ...args) => assoc o, k, f o?[k], ...args
exports.getIn = getIn = (o, path) => path.reduce ((x, k) => x?[k]), o
exports.assocIn = assocIn = (o, path, v) =>
  if path.length < 2 then assoc o, path[0], v
  else update o, path[0], assocIn, path[1..], v
exports.updateIn = (o, path, f, ...args) => assocIn o, path, (f (getIn o, path), ...args)
# dissocIn = (o, path, ...ks) => updateIn o, path, dissoc, ...ks

exports.chunks = (xs, n) => Array.from length: (Math.ceil xs.length / n),
                                       (_, i) => xs[n*i ... n*(i+1)]	# /
exports.flatten = flatten = (xs) => unless isArray xs then xs else xs.flatMap flatten
exports.repr = (x) => JSON.stringify x, replacer
exports.identical = identical = (a, b) => a is b or (a isnt a and b isnt b)
exports.eq = eq = (a, b) => a is b or
  if a isnt a       then b isnt b
  else if isArray a then (isArray b) and eqArr a, b, eq
  else (isDict a) and (isDict b) and eqObj a, b
exports.eqShallow = eqShallow = (a, b) => a is b or
  if a isnt a       then b isnt b
  else if isArray a then (isArray b) and eqArr a, b, identical
  else (isDict a) and (isDict b) and eqObjShallow a, b

sorter = (o) => _dict (entries o).sort()

replacer = (_, v) =>
  if type(v) is RegExp then "#{v}"
  else unless isDict v then v
  else sorter v

eqArr = (xs, ys, eq) => xs.length is ys.length and xs.every (x, i) => eq x, ys[i]
eqObj = (a, b, aks = (keys a), bks = new Set(keys b)) =>
  aks.length is bks.size and aks.every((k) => bks.has(k)) and aks.every (k) => eq a[k], b[k]
eqObjShallow = (a, b, aks = (keys a)) =>
  aks.length is keys(b).length and aks.every (k) => k of b and identical a[k], b[k]

exports.chain = (x, ...fs) => fs.map((f) => if isArray f then f else [f]).reduce ((x, f) => f[0] x, ...f[1..]), x

exports.multi = (dispatch=identity) =>
  _methods = new Map
  _default = => throw TypeError "Invalid arguments"
  self = Object.assign (
    (...args) => ((_methods.get dispatch ...args) or _default) ...args
  ), {
    when: (k, f) => _methods.set k, f;  self
    default: (f) => _default = f;  self
  }
