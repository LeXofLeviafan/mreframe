[o, {type, identity, keys, isDict, assocIn, merge, multi}, _atom, r, {testAtom}] = ['ospec', '../src/util', '../src/atom', '../src/reagent', './atom'].map require
{deref, reset, resetVals, swap, swapVals, compareAndSet} = _atom

CLS = class: undefined, className: undefined, classList: undefined
hstype = 'ø'
fgtag = '⌷'

m = hyperscript = (tag, ...args) ->
  [attrs, children] = if isDict args[0] then [args[0], args[1..]] else [{}, args]
  {tag, attrs, children, hstype}
hyperscript.fragment = (attrs, children) ->
  hyperscript fgtag, attrs, ...children

vnode = (tag, attrs={}, children=[]) -> {tag, children, hstype, attrs: merge CLS, attrs}

o.spec "mreframe/reagent", ->

  _reset = -> r._init {hyperscript, redraw: identity, mount: identity};  r.resetCache()

  o.before _reset
  o.afterEach _reset

  o "atom()", ->
    testAtom r.atom
    redraw = o.spy()
    r._init {redraw}
    x = r.atom()
    deref x
    o(redraw.callCount).equals(0)			"deref doesn't trigger a redraw"
    o(reset x, 42).equals(42)
    o(redraw.callCount).equals(1)			"reset triggers a redraw once"
    o(reset x, 42).equals(42)
    o(redraw.callCount).equals(1)			"reset doesn't trigger a redraw on repeated value"
    o(resetVals x, 11).deepEquals([42, 11])
    o(redraw.callCount).equals(2)			"resetVals triggers a redraw once"
    o(resetVals x, 11).deepEquals([11, 11])
    o(redraw.callCount).equals(2)			"resetVals doesn't trigger a redraw on repeated value"
    o(swap x, ((n, m) -> n + m), 19).equals(30)
    o(redraw.callCount).equals(3)			"swap triggers a redraw once"
    o(swap x, identity).equals(30)
    o(redraw.callCount).equals(3)			"swap doesn't trigger a redraw on repeated value"
    o(swapVals x, (n) -> n + 1).deepEquals([30, 31])
    o(redraw.callCount).equals(4)			"swapVals triggers a redraw once"
    o(swapVals x, identity).deepEquals([31, 31])
    o(redraw.callCount).equals(4)			"swapVals doesn't trigger a redraw on repeated value"
    o(compareAndSet x, deref(x), 42).equals(true)
    o(redraw.callCount).equals(5)			"successful compareAndSet triggers a redraw once"
    o(compareAndSet x, deref(x), 42).equals(true)
    o(redraw.callCount).equals(5)			"compareAndSet doesn't trigger a redraw on repeated value"
    o(compareAndSet x, 21, 42).equals(false)
    o(redraw.callCount).equals(5)			"failed compareAndSet doesn't trigger a redraw"

  o "cursor()", ->
    redraw = o.spy()
    r._init {redraw}
    data = answer: 42, foo: 2
    fn = (multi (...args) -> args.length).when(1, (key) -> data[key]).when(2, (key, value) -> data[key] = value)
    cur = r.cursor fn, 'answer'
    o(deref cur).equals(42)				"works on functions (deref)"
    o(redraw.callCount).equals(0)			"deref doesn't trigger redraw (function)"
    o(reset cur, 12).equals(12)				"works on functions (reset)"
    o(redraw.callCount).equals(1)			"reset triggers redraw (function)"
    o(data).deepEquals(answer: 12, foo: 2)		"function is called with 2 arguments on reset"
    o(deref cur).equals(12)				"reset changes deref result (function)"
    x = [12]
    o(reset cur, x).deepEquals([12])
    o(deref cur).equals(x)				"new value is passed as-is (function)"
    o(redraw.callCount).equals(2)
    o(reset cur, [12]).deepEquals([12])
    o(deref cur).equals(x)				"setting an equal value doesn't replace the old one (function)"
    o(redraw.callCount).equals(2)			"setting an equal value doesn't trigger a redraw (function)"
    data.answer = 42
    o(deref cur).equals(42)				"updating the source externally changes deref result (function)"
    atom = _atom.atom foo: {bar: 42, baz: 15}
    cur2 = r.cursor atom, ['foo', 'bar']
    o(deref cur2).equals(42)				"works on atoms (deref)"
    o(redraw.callCount).equals(2)			"deref doesn't trigger redraw (atom)"
    o(swap cur2, (n) -> n+1).equals(43)			"works on atoms (swap)"
    o(redraw.callCount).equals(3)			"swap triggers redraw (atom)"
    o(deref atom).deepEquals(foo: {bar: 43, baz: 15})	"data is updated in-path in the parent atom"
    o(deref cur2).equals(43)				"swap changes deref result (atom)"
    o(reset cur2, x).deepEquals([12])
    o(deref cur2).equals(x)				"new value is passed as-is (function)"
    o(redraw.callCount).equals(4)
    o(reset cur2, [12]).deepEquals([12])
    o(deref cur2).equals(x)				"setting an equal value doesn't replace the old one (atom)"
    o(redraw.callCount).equals(4)			"setting an equal value doesn't trigger a redraw (atom)"
    swap atom, assocIn, ['foo', 'bar'], 42
    o(deref cur2).equals(42)				"updating the source externally changes deref result (atom)"

  o "classNames()", ->
    cls1 = "foo bar"
    cls2 = [1 and 'x', 0 and 'y', 'z']
    cls3 = answer: 42, foo: null, error: false
    o(r.classNames cls1).equals(cls1)			"works on strings"
    o(r.classNames cls2).equals("x z")			"works on lists"
    o(r.classNames cls3).equals("answer")		"works on dicts"
    o(r.classNames cls1, cls2, cls3)
      .equals("bar x z answer")				"works on multiple arguments"
    o( r.classNames() ).equals("")			"works on zero arguments"

  o "createElement()", ->
    str = "Hello, World!"
    obj = foo: 1
    clsStr  = foo: 1, class: "foo bar"
    clsList = foo: 1, class: ['foo', null, false, undefined, 'bar']
    clsDict = foo: 1, class: {foo: yes, a: null, b: no, c: undefined, bar: 42}
    mcomp = view: -> 42
    o(r.createElement 'br').deepEquals(vnode 'br')	"renders tag vnodes"
    o(r.createElement 'img', obj)
      .deepEquals(vnode 'img', obj)			"renders tag vnodes with props"
    o(r.createElement 'div', obj, str, 42)
      .deepEquals(vnode 'div', obj, [str, 42])		"renders tag vnodes with props and children"
    o(r.createElement 'div', str, 42)
      .deepEquals(vnode 'div', {}, [str, 42])		"renders tag vnodes with children"
    o(r.createElement 'div', clsStr, str, 42)
      .deepEquals(vnode 'div', clsStr, [str, 42])	"accepts CSS class as a string"
    o(r.createElement 'div', clsList, str, 42)
      .deepEquals(vnode 'div', clsStr, [str, 42])	"accepts CSS class as a list"
    o(r.createElement 'div', clsDict, str, 42)
      .deepEquals(vnode 'div', clsStr, [str, 42])	"accepts CSS class as a dict"
    o(r.createElement mcomp).deepEquals(vnode mcomp)	"renders mcomponent vnodes"
    o(r.createElement mcomp, obj)
      .deepEquals(vnode mcomp, obj)			"renders mcomponent vnodes with props"
    o(r.createElement mcomp, obj, str, 42)
      .deepEquals(vnode mcomp, obj, [str, 42])		"renders mcomponent vnodes with props and children"
    o(r.createElement mcomp, str, 42)
      .deepEquals(vnode mcomp, {}, [str, 42])		"renders mcomponent vnodes with children"

  o "adaptComponent()", ->
    mcomp = view: -> "Hello, World!"
    rcomp = r.adaptComponent mcomp
    o(type rcomp).equals(Function)			"produces a Reagent (function) component"
    o(rcomp 'foo', 'bar', 'baz')
      .deepEquals(['>', mcomp, 'foo', 'bar', 'baz'])	"produced component generates :> forms"

  o "with()", ->
    form = [-> "Hello, World"]
    meta = key: 42
    form2 = r.with meta, form
    o(form2).notEquals(form)				"returns new form"
    o(form._meta).equals(undefined)			"original form isn't modified"
    o(form2._meta).equals(meta)				"binds metadata to ._meta"

  o "asElement()", ->
    str = "Hello, World!"
    obj = foo: 1
    fn = -> 42
    o(r.asElement str).equals(str)			"returns strings as-is"
    o(r.asElement fn).equals(fn)			"returns functions as-is"
    o(r.asElement obj).equals(obj)			"returns non-array objects as-is"
    o(r.asElement ['div', str, 42])
      .deepEquals(vnode 'div', {}, [str, 42])		"renders HTML vnodes"
    o(r.asElement ['div', obj, str, 42])
      .deepEquals(vnode 'div', obj, [str, 42])		"renders HTML vnodes with props"
    rcomp = mcomp = view: fn
    o(r.asElement ['>', mcomp, str, 42])
      .deepEquals(vnode mcomp, {}, [str, 42])		"renders :> vnodes"
    o(r.asElement ['>', mcomp, obj, str, 42])
      .deepEquals(vnode mcomp, obj, [str, 42])		"renders :> vnodes with props"
    children = [(vnode 'div'), (vnode 'span', obj, [42])]
    o(r.asElement ['<>', ['div'], ['span', obj, 42]])
      .deepEquals(m.fragment {}, children)		"renders :<> vnodes"
    meta = key: 42
    o(r.asElement (r.with meta, ['<>', ['div'], ['span', obj, 42]]))
      .deepEquals(m.fragment meta, children)		"renders :<> vnodes with meta"
    form = [rcomp, obj, str, 42]
    o(r.asElement form)
      .deepEquals(vnode rcomp, argv: form)		"renders class rcomponent vnodes"
    form = r.with meta, [rcomp, obj, str, 42]
    props = merge meta, argv: form
    o(r.asElement form)
      .deepEquals(vnode rcomp, props)			"renders class rcomponent vnodes with meta"
    fcomp = (foo, bar) -> ['div', {}, foo, bar]
    frcomp = (r.asElement [fcomp]).tag
    state = {}
    o(type frcomp).equals(Object)			"renders function rcomponent vnodes with an object tag"
    o(keys frcomp).deepEquals(['oninit', 'view'])	"frcomponent is a Mithril component"
    o(frcomp.oninit {state}).equals(undefined)		"frcomponent .oninit returns undefined"
    o(keys state).deepEquals(['_comp', '_atom'])	"frcomponent .oninit sets ._comp and ._atom on state"
    o(state._comp).equals(frcomp)			"frcomponent state._comp is the function component"
    o(type state._atom).equals(type r.atom())		"frcomponent state._atom is a RAtom"
    o(deref state._atom).equals(undefined)		"frcomponent state._atom is initially set to undefined"
    o(frcomp.view {state, attrs: {argv: [fcomp, obj, str, 42]}})
      .deepEquals(vnode 'div', {}, [obj, str])		"frcomponent .view renders its Hiccup forms"
    o(keys state).deepEquals(['_comp', '_atom'])	"frcomponent .view doesn't make hidden state updates"
    form = [fcomp, obj, str, 42]
    o(r.asElement form)
      .deepEquals(vnode frcomp, argv: form)		"repeated render of function rcomponent reuses cached value"
    form = r.with meta, [fcomp, obj, str, 42]
    props = merge meta, argv: form
    o(r.asElement form)
      .deepEquals(vnode frcomp, props)			"meta can be supplied to frcomponent via r.with"
    compInit = o.spy()
    fcomp2 = (...args) -> compInit ...args;  fcomp
    frcomp2 = (r.asElement [fcomp2]).tag
    state = {}
    o(keys frcomp2).deepEquals(['oninit', 'view'])	"inited frcomponent is a Mithril component"
    o(frcomp2.oninit {state}).equals(undefined)		"inited frcomponent .oninit returns undefined"
    o(keys state).deepEquals(['_comp', '_atom'])	"inited frcomponent .oninit sets ._comp and ._atom on state"
    o(state._comp).equals(frcomp2)			"inited frcomponent state._comp is the function component"
    o(type state._atom).equals(type r.atom())		"inited frcomponent state._atom is a RAtom"
    o(deref state._atom).equals(undefined)		"inited frcomponent state._atom is initially set to undefined"
    o(compInit.callCount).equals(0)			"inited frcomponent .oninit doesn't trigger initial code"
    vn = {state, attrs: {argv: [fcomp2, obj, str, 42]}}
    o(frcomp2.view vn)
      .deepEquals(vnode 'div', {}, [obj, str])		"inited frcomponent .view renders its Hiccup forms on 1st run"
    o(compInit.callCount).equals(1)			"inited frcomponent .view triggers initial code on 1st run"
    o(compInit.args).deepEquals([obj, str, 42])		"inited frcomponent passes correct arguments to its initial code"
    o(state._view).equals(fcomp)			"inited frcomponent .view sets state._view on 1st run"
    o(frcomp2.view vn)
      .deepEquals(vnode 'div', {}, [obj, str])		"inited frcomponent .view renders its Hiccup forms on 2nd run"
    o(compInit.callCount).equals(1)			"inited frcomponent .view doesn't trigger initial code on 2nd run"
    form = [fcomp2, obj, str, 42]
    o(r.asElement form)
      .deepEquals(vnode frcomp2, argv: form)		"repeated render of inited function rcomponent reuses cached value"

  o "resetCache()", ->
    fcomp = -> 42
    frcomp = (r.asElement [fcomp]).tag
    o(r.asElement [fcomp])
      .deepEquals(vnode frcomp, argv: [fcomp])		"cached frcomp is reused"
    o( r.resetCache() ).equals(undefined)		"_resetCache returns undefined"
    frcomp2 = (r.asElement [fcomp]).tag
    o(frcomp2).notEquals(frcomp)			"new component instance is rendered after cache reset"
    o(r.asElement [fcomp])
      .deepEquals(vnode frcomp2, argv: [fcomp])		"new cached frcomp is reused"

  o "createClass()", ->
    obj = answer: 42
    order = []
    push = (name, value) ->-> order.push name;  value
    rendered = vnode 'span', obj, ["Yay"]
    rcompDef =
      getInitialState:         o.spy push 'getInitialState', obj
      constructor:             o.spy push 'constructor'
      componentDidMount:       o.spy push 'componentDidMount'
      componentDidUpdate:      o.spy push 'componentDidUpdate'
      componentWillUnmount:    o.spy push 'componentWillUnmount'
      shouldComponentUpdate:   o.spy push 'shouldComponentUpdate', yes
      beforeComponentUnmounts: o.spy push 'beforeComponentUnmounts', no
      render:                  o.spy push 'render', rendered
      reagentRender:           o.spy push 'reagentRender', ['span', "Hello World"]
    rcomp = r.createClass rcompDef
    rcompDef2 = reagentRender: o.spy push 'reagentRender2', ['span', "Hello World"]
    rcomp2 = r.createClass rcompDef2
    mcompMethods = ['oninit', 'oncreate', 'onupdate', 'onremove', 'onbeforeupdate', 'onbeforeremove', 'view']
    state = {}
    self = {state, attrs: {argv: [rcomp, 'foo', obj]}}
    o(keys rcomp).deepEquals(mcompMethods)		"produces a Mithril component"
    o(rcomp.oninit self).equals(undefined)		"method .oninit works"
    o(order)
      .deepEquals(['getInitialState', 'constructor'])	"method .oninit invokes getInitialState and constructor"
    o(keys state).deepEquals(['_comp', '_atom'])	"method .oninit sets _comp and _atom in state"
    o(state._comp).equals(rcomp)			"method .oninit sets _comp to current component"
    o(deref state._atom).equals(obj)			"method .oninit sets _atom to state from getInitialState"
    for [fn, k, res] in [['oncreate', 'componentDidMount'], ['onbeforeupdate', 'shouldComponentUpdate', yes], ['onupdate', 'componentDidUpdate'],
                         ['view', 'render', rendered], ['onremove', 'componentWillUnmount'], ['onbeforeremove', 'beforeComponentUnmounts', no]]
      do (fn, k, res) ->
        order = []
        o(rcomp[fn] self).equals(res)			"method .#{fn} works"
        o(order).deepEquals([k])			"method .#{fn} invokes #{k}"
        o(rcompDef[k].args.length).equals(1)		"#{k} is passed 1 argument"
        o(rcompDef[k].args[0]).equals(self)		"#{k} is passed vnode as an argument"
    rcomp2.oninit self
    order = []
    o(rcomp2.view self)
      .deepEquals(vnode 'span', {}, ["Hello World"])	"method .view falls back to reagentRender"
    o(order).deepEquals(['reagentRender2'])		"method .view invokes reagentRender"
    o(rcompDef2.reagentRender.args)
      .deepEquals( (r.argv self)[1..] )			"reagentRender is passed vnode argv starting from 2nd as arguments"

  o "render()", ->
    mount = o.spy()
    r._init {mount}
    fcomp = (a, b) -> ['span', a+b]
    frcomp = (r.asElement [fcomp]).tag
    container = {}
    form = [fcomp, 30, 12]
    o(r.render form, container).equals(undefined)	"returns undefined"
    o(mount.callCount).equals(1)			"calls m.mount()"
    o(mount.args.length).equals(2)			"with 2 args"
    o(mount.args[0]).equals(container)			"first argument is a container"
    mcomp = mount.args[1]
    o(keys mcomp).deepEquals(['view'])			"second argument is a Mithril component"
    o(type mcomp.view).equals(Function)
    o(mcomp.view {})
      .deepEquals(vnode frcomp, argv: form)		"its .view renders the form"

  o "currentComponent()", ->
    log = o.spy()
    fcomp = -> log r.currentComponent();  42
    frcomp = (r.asElement [fcomp]).tag
    state = {}
    self = {state, attrs: {argv: [fcomp]}}
    o(frcomp.view self).equals(42)
    o(log.callCount).equals(1)
    o(log.args[0]).equals(self)				"provides access to vnode in function rcomponents"
    rcomp = r.createClass reagentRender: fcomp
    self = {state, attrs: {argv: [rcomp]}}
    o(rcomp.view self).equals(42)
    o(log.callCount).equals(2)
    o(log.args[0]).equals(self)				"provides access to vnode in class rcomponents"

  o "children()", ->
    children = []
    o(r.children {children}).equals(children)		"returns vnode children"

  o "props()", ->
    attrs = {}
    o(r.props {attrs}).equals(attrs)			"returns vnode attrs"
    str = "Hello, World!"
    obj = foo: 1
    fcomp = (foo, bar) -> ['div', r.props( r.currentComponent() ), foo, bar]
    frcomp = (r.asElement [fcomp]).tag
    attrs = answer: 42, argv: [fcomp, obj, str, 42]
    state = {}
    frcomp.oninit {state}
    o(frcomp.view {state, attrs})
      .deepEquals(vnode 'div', attrs, [obj, str])	"props are supplied to function rcomponent"
    rcomp = r.createClass reagentRender: fcomp
    state = {}
    rcomp.oninit {state}
    o(rcomp.view {state, attrs})
      .deepEquals(vnode 'div', attrs, [obj, str])	"props are supplied to class rcomponent"

  o "argv()", ->
    rcomp = {}
    attrs = {argv: [rcomp, 'foo', 'bar']}
    o(r.argv {attrs}).equals(attrs.argv)		"returns .argv of vnode attrs"

  o "stateAtom()", ->
    atom = r.atom()
    o(r.stateAtom state: _atom: atom).equals(atom)	"returns state atom (taken from state)"

  o "state()", ->
    obj = answer: 42
    o(r.state state: _atom: r.atom obj).equals(obj)	"returns value of state atom"

  o "replaceState()", ->
    obj = answer: 42
    atom = r.atom()
    o(r.replaceState {state: _atom: atom}, obj)
      .equals(obj)					"returns new value of state atom"
    o(deref atom).equals(obj)				"updates state atom"

  o "setState()", ->
    obj = answer: 42
    atom = r.atom(foo: 'bar', answer: 'baz')
    o(r.setState {state: _atom: atom}, obj)
      .deepEquals(foo: 'bar', answer: 42)		"returns new value of state atom"
    o(deref atom).deepEquals(foo: 'bar', answer: 42)	"updates state atom"
