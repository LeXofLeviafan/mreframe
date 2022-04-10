[o, {deref, reset}, r, rf] = ['ospec', '../src/atom', '../src/reagent', '../src/re-frame'].map require

hstype = 'ø'

hyperscript = (tag, attrs, ...children) ->
  [attrs, children] = [{}, [attrs, ...children]] if attrs?.hstype is hstype
  {tag, attrs, children, hstype, _parent: null}

delay = (timeout) -> new Promise (resolve) -> setTimeout(resolve, timeout)


redraw = o.spy()

constant = ->
  constant._render()
  ['span', "NOOP"]

ext = ->
  ext._render()
  ['span', rf.dsub(['value'])]  # this also tests RCursor (as it's returned by rf.subscribe)

foo = (n) ->
  foo._render()
  ['span', n]

bar = ->
  counter = r.atom(1)
  ->
    bar._render()
    _counter = deref counter
    # WARNING: using swap() here would schedule counter increment on EVERY render of [bar]
    setTimeout(-> reset counter, _counter + 1)  if _counter < 3
    ['div',
      [constant]
      [foo, _counter]
      [ext]]

baz = -> baz._render();  [bar]


_init = (comp, vnode, parent=null) ->
  comp._vnode = vnode
  comp._state = vnode.state = {}
  vnode.tag.oninit.call(comp._state, vnode)
  _subs = comp._state._subs
  comp._clearSubs = _subs.clear = o.spy _subs.clear.bind _subs
  o(vnode._parent).equals(parent)			"verifying the parent of #{comp.name}"

_view = (comp) ->
  comp._vnode.state = comp._state
  comp._vnode.tag.view.call(comp._state, comp._vnode)

_redrawCheck = (comp, value, comment, vnode = comp._vnode) ->
  comp._vnode = vnode
  vnode.state = comp._state
  shouldRedraw = vnode.tag.onbeforeupdate.call(comp._state, vnode)
  o(shouldRedraw).equals(value)				".onbeforeupdate should return #{value} #{comment} for #{comp.name}"
  shouldRedraw


_assertSubs = (it, comment) ->
  it = _assertSubs.last = {..._assertSubs.last, ...it}
  count = _assertSubs.count += 1
  _comment = if comment then "#{comment} (##{count})" else "check ##{count}"
  o(baz._state?._subs?.size).equals(it.baz)		"#{_comment}: baz component should have #{it.baz} subs"
  o(baz._clearSubs?.callCount).equals(it.bazClear)	"#{_comment}: baz component should have cleared subs #{it.bazClear} times"
  o(bar._state?._subs?.size).equals(it.bar)		"#{_comment}: bar component should have #{it.bar} subs"
  o(bar._clearSubs?.callCount).equals(it.barClear)	"#{_comment}: bar component should have cleared subs #{it.barClear} times"
  o(constant._state?._subs?.size).equals(it.constant)	"#{_comment}: constant component should have #{it.constant} subs"
  o(constant._clearSubs?.callCount)
    .equals(it.constClear)				"#{_comment}: constant component should have cleared subs #{it.constClear} times"
  o(foo._state?._subs?.size).equals(it.foo)		"#{_comment}: foo component should have #{it.foo} subs"
  o(foo._clearSubs?.callCount).equals(it.fooClear)	"#{_comment}: foo component should have cleared subs #{it.fooClear} times"
  o(ext._state?._subs?.size).equals(it.ext)		"#{_comment}: ext component should have #{it.ext} subs"
  o(ext._clearSubs?.callCount).equals(it.extClear)	"#{_comment}: ext component should have cleared subs #{it.extClear} times"

_assertRedraws = (it, comment="") ->
  it = _assertRedraws.last = {..._assertRedraws.last, ...it}
  count = _assertRedraws.count += 1
  _comment = if comment then "#{comment} (##{count})" else "check ##{count}"
  o(baz._render.callCount).equals(it.baz)		"#{_comment}: baz component should've been redrawn #{it.baz} times"
  o(bar._render.callCount).equals(it.bar)		"#{_comment}: bar component should've been redrawn #{it.bar} times"
  o(constant._render.callCount).equals(it.constant)	"#{_comment}: constant component should've been redrawn #{it.constant} times"
  o(foo._render.callCount).equals(it.foo)		"#{_comment}: foo component should've been redrawn #{it.foo} times"
  o(ext._render.callCount).equals(it.ext)		"#{_comment}: ext component should've been redrawn #{it.ext} times"
  o(redraw.callCount).equals(it.redraw)			"#{_comment}: redraw should've been called #{it.redraw} times"


o.spec "redraw detection", ->

  o.before ->
    rf._init {hyperscript, redraw, mount: (->)}
    rf.regEventDb 'init', -> value: 1
    rf.regEventDb 'inc-value', (db) -> {...db, value: db.value + 1}
    rf.regEventDb 'set', [rf.trimV], (db, [key, value]) -> {...db, [key]: value}
    rf.regSub 'value', (db) -> db.value
    constant._render = o.spy()
    ext._render = o.spy()
    foo._render = o.spy()
    bar._render = o.spy()
    baz._render = o.spy()
    _assertSubs.last = baz: undefined, bazClear: undefined, bar: undefined, barClear: undefined,\
                       foo: undefined, fooClear: undefined, ext: undefined, extClear: undefined,\
                       constant: undefined, constClear: undefined
    _assertSubs.count = 0
    _assertRedraws.last = baz: 0, bar: 0, foo: 0, ext: 0, constant: 0, redraw: 0
    _assertRedraws.count = 0


  o "initial render", ->
    rf.dispatchSync ['init']
    _assertRedraws {redraw: 1}, "dispatch-sync [:init]"
    _init baz, r.asElement([baz])
    _assertSubs {baz: 0, bazClear: 0}
    _redrawCheck baz, yes, "before 1st render"
    _assertRedraws {}, "init [baz] / redraw-check [baz]"
    _init bar, (_view baz), baz._vnode
    _assertRedraws {baz: 1}, "render [baz] / init [bar]"
    _assertSubs {bazClear: 1, bar: 0, barClear: 0}, "init [bar]"
    _redrawCheck bar, yes, "before 1st render"
    {children: [constVnode, [fooVnode, extVnode]]} = _view bar  # 'div' vnode
    _assertRedraws {bar: 1}, "render [baz]"
    _assertSubs {barClear: 1, bar: 1, baz: 1}, "render [baz]"
    _init constant, constVnode, bar._vnode
    _init foo,      fooVnode,   bar._vnode
    _init ext,      extVnode,   bar._vnode
    _assertRedraws {}, "init [constant], [foo 1], [ext]"
    _assertSubs {foo: 0, fooClear: 0, ext: 0, extClear: 0, constant: 0, constClear: 0}, "init [constant] / init [foo] / init [ext]"

    _redrawCheck constant, yes, "before 1st render"
    _view constant
    _assertRedraws {constant: 1}, "render [constant]"
    o(r.argv fooVnode).deepEquals([foo, 1])		"initial form of [foo] is [foo 1]"
    _redrawCheck foo, yes, "before 1st render"
    _view foo
    _assertRedraws {foo: 1}, "render [foo 1]"
    _assertSubs {fooClear: 1, constClear: 1}, "render [foo 1]"
    _redrawCheck ext, yes, "before 1st render"
    {tag, children} = _view ext
    o([tag, ...children]).deepEquals(['span', 1, []])	"initial view of ext is ['span' 1]"
    _assertRedraws {ext: 1}, "render [ext]"
    _assertSubs {extClear: 1, ext: 1, bar: 2, baz: 2}, "render [ext]"

  o "initial redraw checks", ->
    redraw()
    _assertRedraws {redraw: 2}, "redraw() call"
    _redrawCheck comp, no, "before first change"  for comp in [baz, bar, constant, foo, ext]
    _assertRedraws {}, "redraw-check [baz], [bar], [constant], [foo 1], [ext]"
    _assertSubs    {}, "redraw-check [baz], [bar], [constant], [foo 1], [ext]"

  o "state change redraw", ->
    rf.dispatchSync ['inc-value']
    _assertRedraws {redraw: 3}, "dispatch-sync [:inc-value]"
    _redrawCheck baz, yes, "after 1st change"
    _assertSubs {}, "redraw-check [baz]"
    bar._vnode = _view baz
    _assertRedraws {baz: 2}, "render [baz]"
    _assertSubs {bazClear: 2, baz: 0}, "render [baz]"
    _redrawCheck bar, yes, "after 1st change"
    _assertSubs {}, "redraw-check [bar]"
    {children: [constVnode, [fooVnode, extVnode]]} = _view bar  # 'div' vnode
    _assertRedraws {bar: 2}, "render [bar]"
    _assertSubs {barClear: 2, bar: 1, baz: 1}, "render [bar]"

    _redrawCheck constant, no, "after 1st change", constVnode
    _assertSubs {}, "redraw-check [constant]"
    o(r.argv fooVnode).deepEquals([foo, 1])		"current form of foo is [foo 1]"
    _redrawCheck foo, no, "after 1st change", fooVnode
    _assertSubs {}, "redraw-check [foo 1]"
    _redrawCheck ext, yes, "after 1st change", extVnode
    _assertSubs {}, "redraw-check [ext]"
    {tag, children} = _view ext
    o([tag, ...children]).deepEquals(['span', 2, []])	"current view of ext is ['span' 2]"
    _assertRedraws {ext: 2}, "render [ext]"
    _assertSubs {extClear: 2, ext: 1, bar: 2, baz: 2}, "render [ext]"

  o "nil change redraw checks", ->
    rf.dispatchSync ['set', 'answer', 42]
    _assertRedraws {redraw: 4}, "dispatch-sync [:set :answer 42]"
    _redrawCheck comp, no, "after a nil change"  for comp in [baz, bar, constant, foo, ext]
    _assertRedraws {}, "redraw-check [baz], [bar], [constant], [foo 1], [ext]"
    _assertSubs    {}, "redraw-check [baz], [bar], [constant], [foo 1], [ext]"

  o "redraw triggered by bar ratom change (twice but 2nd change would be nil)", ->
    delay().then ->
      _assertRedraws {redraw: 5}, "redraw triggered by scheduled updates in [bar]"
      _redrawCheck baz, yes, "after 2nd change"
      _assertSubs {}, "redraw-check [baz]"
      bar._vnode = _view baz
      _assertRedraws {baz: 3}, "render [baz]"
      _assertSubs {bazClear: 3, baz: 0}, "render [baz]"
      _redrawCheck bar, yes, "after 2nd change"
      _assertSubs {}, "redraw-check [bar]"
      {children: [constVnode, [fooVnode, extVnode]]} = _view bar  # 'div' vnode
      _assertRedraws {bar: 3}, "render [bar]"
      _assertSubs {barClear: 3, bar: 1, baz: 1}, "render [bar]"

      _redrawCheck constant, no, "after 2nd change", constVnode
      _assertSubs {}, "redraw-check [constant]"
      o(r.argv fooVnode).deepEquals([foo, 2])		"current form of foo is [foo 2]"
      _redrawCheck foo, yes, "after 2nd change", fooVnode
      _assertSubs {}, "redraw-check [foo 2]"
      _view foo
      _assertRedraws {foo: 2}, "render [foo 2]"
      _assertSubs {fooClear: 2}, "render [foo 2]"
      _redrawCheck ext, no, "after 2nd change", extVnode
      _assertSubs {bar: 2, baz: 2}, "redraw-check [ext]"  # propagated [:value] subscription

  o "redraw triggered by another bar ratom change", ->
    delay().then ->
      _assertRedraws {redraw: 6}, "redraw triggered by scheduled update in [bar]"
      _redrawCheck baz, yes, "after 3rd change"
      _assertSubs {}, "redraw-check [baz]"
      bar._vnode = _view baz
      _assertRedraws {baz: 4}, "render [baz]"
      _assertSubs {bazClear: 4, baz: 0}, "render [baz]"
      _redrawCheck bar, yes, "after 3rd change"
      _assertSubs {}, "redraw-check [bar]"
      {children: [constVnode, [fooVnode, extVnode]]} = _view bar  # <div> vnode
      _assertRedraws {bar: 4}, "render [bar]"
      _assertSubs {barClear: 4, bar: 1, baz: 1}, "render [bar]"

      _redrawCheck constant, no, "after 3rd change", constVnode
      _assertSubs {}, "redraw-check [constant]"
      o(r.argv fooVnode).deepEquals([foo, 3])		"current form of foo is [foo 3]"
      _redrawCheck foo, yes, "after 3rd change", fooVnode
      _assertSubs {}, "redraw-check [foo 3]"
      _view foo
      _assertRedraws {foo: 3}, "render [foo 3]"
      _assertSubs {fooClear: 3}, "render [foo 3]"
      _redrawCheck ext, no, "after 3rd change", extVnode
      _assertSubs {bar: 2, baz: 2}, "redraw-check [ext]"  # propagated [:value] subscription

  o "bar ratom reached 3 and no longer causes redraws (see [bar] definition)", ->
    delay().then ->
      _assertRedraws {}, "no redraw triggered in [bar] anymore"

  o "2nd state change redraw", ->
    rf.dispatchSync ['set', 'value', 42]
    _assertRedraws {redraw: 7}, "dispatch-sync [:value 42]"
    _redrawCheck baz, yes, "after 4th change"
    _assertSubs {}, "redraw-check [baz]"
    bar._vnode = _view baz
    _assertRedraws {baz: 5}, "render [baz]"
    _assertSubs {bazClear: 5, baz: 0}, "render [baz]"
    _redrawCheck bar, yes, "after 4th change"
    _assertSubs {}, "redraw-check [bar]"
    {children: [constVnode, [fooVnode, extVnode]]} = _view bar  # <div> vnode
    _assertRedraws {bar: 5}, "render [bar]"
    _assertSubs {barClear: 5, bar: 1, baz: 1}, "render [bar]"

    _redrawCheck constant, no, "after 4th change", constVnode
    _assertSubs {}, "redraw-check [constant]"
    o(r.argv fooVnode).deepEquals([foo, 3])		"current form of foo is [foo 3]"
    _redrawCheck foo, no, "after 4th change", fooVnode
    _assertSubs {}, "redraw-check [foo 1]"
    _redrawCheck ext, yes, "after 4th change", extVnode
    _assertSubs {}, "redraw-check [ext]"
    {tag, children} = _view ext
    o([tag, ...children]).deepEquals(['span', 42, []])	"current view of ext is ['span' 42]"
    _assertRedraws {ext: 3}, "render [ext]"
    _assertSubs {extClear: 3, ext: 1, bar: 2, baz: 2}, "render [ext]"
