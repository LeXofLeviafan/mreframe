{multi, type} = require './util'

exports.deref = deref = multi type
# these default definitions are clearly non-atomic but JS is single-threaded anyway
exports.resetVals = resetVals = (multi type).default (self, value) =>
  [(deref self), (reset self, value)]
exports.reset = reset = (multi type).default (self, value) =>
  swap self, => value
exports.swapVals = swapVals = (multi type).default (self, f, ...args) =>
  resetVals self, (f (deref self), ...args)
exports.swap = swap = (multi type).default (...args) =>
  (swapVals ...args)[1]
exports.compareAndSet = compareAndSet = multi(type).default (self, oldval, newval) =>
  (oldval is deref self) and (reset self, newval;  yes)

Atom = (@x) ->
deref.when Atom, (self) => self.x
reset.when Atom, (self, value) => self.x = value
exports.atom = (x) => new Atom x
