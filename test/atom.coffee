[o, _atom, r] = ['ospec', '../src/atom', '../src/reagent'].map require
{deref, resetVals, reset, swap, swapVals, compareAndSet, atom} = _atom

testAtom = exports.testAtom = (mkAtom) ->
  it = mkAtom 42
  sub = (a, b) -> a - b
  rem = (a, b) -> a % b
  o(deref it).equals(42)				"deref() returns stored value"
  o(resetVals it, 19).deepEquals([42, 19])		"resetVals() returns stored and new value"
  o(deref it).equals(19)				"resetVals() replaces stored value"
  o(reset it, 11).equals(11)				"reset() returns new value"
  o(deref it).equals(11)				"reset() replaces stored value"
  o(swap it, sub, 2).equals(9)				"swap() returns updated value"
  o(deref it).equals(9)					"swap() replaces stored value"
  o(swapVals it, rem, 2).deepEquals([9, 1])		"swapVals() returns stored and updated value"
  o(deref it).equals(1)					"swapvals() replaces stored value"
  o(compareAndSet it, 1, 5).equals(true)		"compareAndSet() returns true if stored value is matched"
  o(deref it).equals(5)					"compareAndSet() replaces stored value"
  o(compareAndSet it, 2, 9).equals(false)		"compareAndSet() returns false if stored value isn't matched"
  o(deref it).equals(5)					"compareAndSet() doesn't replace stored value when it's not matched"

o.spec "mreframe/atom", ->

  o "atom()", -> testAtom atom

  # to implement an atom, it's enough to define deref() and any setter except for compareAndSet()
  for [method, definition] in [['resetVals', (self, value) -> [self.ø, self.ø = value]],
                               ['reset',     (self, value) -> self.ø = value],
                               ['swapVals',  (self, f, ...args) -> [self.ø, self.ø = (f self.ø, ...args)]],
                               ['swap',      (self, f, ...args) -> self.ø = (f self.ø, ...args)]]
    do (method, definition) ->
      NewAtom = (@ø) ->
      deref.when NewAtom, (self) -> self.ø
      _atom[method].when NewAtom, definition
      o "#{method}()", -> testAtom (x) -> new NewAtom x
