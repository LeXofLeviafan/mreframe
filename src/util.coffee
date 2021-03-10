exports.identity = identity = (x) => x
exports.type = type = (x) => unless x? then x else x.__proto__.constructor
exports.keys = keys = (x) => Object.keys x or {}
exports.entries = entries = Object.entries or ((o) => keys(o).map (k) => [k, o[k]])
exports.dict = dict = Object.fromEntries or ((kvs) => merge ...kvs.map ([k, v]) => [k]: v)
exports.isArray = isArray = Array.isArray
exports.isDict = isDict = (x) => (type x) is Object
exports.isFn = (x) => (type x) is Function
exports.merge = merge = (...os) => Object.assign {}, ...os
exports.assoc = assoc = (o, k, v) => merge o, [k]: v
exports.dissoc = (o, k) => o = merge o;   delete o[k];   o
exports.update = update = (o, k, f, ...args) => assoc o, k, f o?[k], ...args
exports.getIn = (o, ks) => ks.reduce ((x, k) => x?[k]), o
exports.assocIn = assocIn = (o, ks, v) =>
  if ks.length < 2 then assoc o, ks[0], v
  else update o, ks[0], assocIn, ks[1..], v

exports.chunks = (xs, n) => Array.from length: (Math.ceil xs.length / n),
                                       (_, i) => xs[n*i ... n*(i+1)]	# /
exports.flatten = flatten = (xs) => unless isArray xs then xs else [].concat ...xs.map flatten
exports.repr = (x) => JSON.stringify x, replacer
exports.eq = eq = (a, b) => a is b or
  if a isnt a       then b isnt b
  else if isArray a then (isArray b) and eqArr a, b
  else (isDict a) and (isDict b) and eqObj a, b

sorter = (o) => dict (entries o).sort()

replacer = (_, v) =>
  if type(v) is RegExp then "#{v}"
  else unless isDict v then v
  else sorter v

eqArr = (xs, ys) => xs.length is ys.length and xs.every (x, i) => eq x, ys[i]
eqObj = (a, b, aks = (keys a), bks = (keys b)) =>
  aks.length is bks.length and (eqArr aks.sort(), bks.sort()) and aks.every (k) => eq a[k], b[k]

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
