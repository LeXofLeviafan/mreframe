{identical, eqShallow, isArray, keys, getIn, merge, assocIn, identity} = require './util'
{atom, deref, reset, swap} = require './atom'
_mount_ = _redraw_ = _mithril_ = identity
_fragment_ = second = (a, b) => b

exports._init = (opts) =>
  _mithril_ = opts?.hyperscript || _mithril_
  _fragment_ = _mithril_.fragment || second
  _redraw_ = opts?.redraw || _redraw_
  _mount_ = opts?.mount || _mount_
  undefined

_vnode = null # contains vnode of most recent component
_renderCache = new Map
### Reset function components cache. ###
exports.resetCache = => _renderCache.clear()

_propagate = (vnode, ratom, value) =>
  while vnode
    vnode.state._subs.set ratom, value
    vnode = vnode._parent
  value

_eqArgs = (xs, ys) => (not xs and not ys) or (xs?.length is ys?.length and xs.every (x, i) => eqShallow x, ys[i])

_detectChanges = (vnode) -> not _eqArgs(vnode.attrs.argv, @_argv) or                   # arguments changed?
  ((subs = Array.from(@_subs)).some ([ratom, value]) => ratom._deref() isnt value) or  # ratoms changed?
  (subs.forEach(([ratom, value]) => _propagate vnode._parent, ratom, value);  no)      # no changes, propagating ratoms

_rendering = (binding) => (vnode) ->
  _vnode = vnode
  try
    @_subs.clear()
    @_argv = vnode.attrs.argv  # last render args
    binding.call @, vnode
  finally
    _vnode = null

_fnElement = (fcomponent) =>
  unless _renderCache.has fcomponent
    component =
      oninit: (vnode) ->
        @_comp = component  # self
        @_subs = new Map    # input ratoms (resets before render)
        @_atom = ratom()    # state ratom;  ._subs should work for it as well
        @_view = fcomponent
        undefined
      onbeforeupdate: _detectChanges
      view: _rendering (vnode) ->
        x = @_view.apply vnode, (args = vnode.attrs.argv[1..])
        asElement if typeof x isnt 'function' then x else (@_view = x).apply vnode, args
    _renderCache.set fcomponent, component
  _renderCache.get fcomponent

_meta = (meta, o) => if typeof o is 'object' and not isArray o then [merge o, meta] else [meta, asElement o]
_moveParent = (vnode) =>
  if vnode.attrs
    vnode._parent = vnode.attrs._parent or null  # might be undefined if not called directly from a component
    delete vnode.attrs._parent
  vnode
### Converts Hiccup forms into Mithril vnodes ###
exports.asElement = asElement = (form) =>
  if isArray form
    head = form[0]
    meta = {...(form._meta or {}), _parent: _vnode}
    if head is '>'                    then _createElement form[1], (_meta meta, form[2]), form[3..].map asElement
    else if head is '<>'              then _moveParent _fragment_ meta, form[1..].map asElement
    else if typeof head is 'string'   then _createElement head, (_meta meta, form[1]), form[2..].map asElement
    else if typeof head is 'function' then _createElement (_fnElement head), [{...meta, argv: form}]
    else _createElement head, [{...meta, argv: form}]
  else form

### Mounts a Hiccup form to a DOM element ###
exports.render = (comp, container) => _mount_ container, view: => asElement comp

### Adds metadata to the Hiccup form of a Reagent component or a fragment ###
exports.with = (meta, form) => form = form[..];  form._meta = meta;  form

###
  Creates a class component based on the spec. (It's a valid Mithril component.)
  Only a subset of the original reagent functons is supported (mostly based on Mithril hooks):
  constructor, getInitialState, componentDidMount, componentDidUpdate,
  componentWillUnmount, shouldComponentUpdate, render, reagentRender (use symbols in Wisp).
  Also, beforeComponentUnmounts was added (see 'onbeforeremove' in Mithril).
  Instead of 'this', vnode is passed in calls.
  NOTE: shouldComponentUpdate overrides Reagent changes detection
###
exports.createClass = (spec) =>
  bind = (k, method=spec[k]) => method and ((vnode, args) =>
    _vnode = vnode
    try     method.apply vnode, args or [vnode]
    finally _vnode = null)
  component =
    oninit:         (vnode) ->
      @_comp = component
      @_subs = new Map
      @_atom = ratom bind('getInitialState')? vnode
      bind('constructor')? vnode, [vnode, vnode.attrs]
      undefined
    oncreate:       bind 'componentDidMount'
    onupdate:       bind 'componentDidUpdate'
    onremove:       bind 'componentWillUnmount'
    onbeforeupdate: bind('shouldComponentUpdate') or _detectChanges
    onbeforeremove: bind 'beforeComponentUnmounts'
    view:           _rendering(spec.render or do (render = spec.reagentRender) =>
                                (vnode) -> asElement render.apply vnode, vnode.attrs.argv[1..])  # component

RAtom = (@x) -> @_deref = (=> @x);  undefined  # ._deref doesn't cause propagation
deref.when RAtom, (self) => _propagate _vnode, self, self._deref()
reset.when RAtom, (self, value) => if identical value, self.x then value else
  self.x = value
  _redraw_()
  value

### Produces an atom which causes redraws on update ###
exports.atom = ratom = (x) => new RAtom x

RCursor = (@src, @path) -> @_deref = (=> @src @path);  undefined
deref.when RCursor, (self) => _propagate _vnode, self, self._deref()
reset.when RCursor, (self, value) => if identical value, self._deref() then value else
  self.src self.path, value
  _redraw_()
  value

_cursor = (ratom) => (path, value) =>  # value is optional but undefined would be replaced with fallback value anyway
  if value is undefined then getIn ratom._deref(), path else swap ratom, assocIn, path, value

### Produces a cursor (sub-state atom) from a path and either a r.atom or a getter/setter function ###
exports.cursor = (src, path) => new RCursor (if typeof src is 'function' then src else _cursor src), path

### Converts a Mithril component into a Reagent component ###
exports.adaptComponent = (c) => (...args) => ['>', c, ...args]

### Merges provided class definitions into a string (definitions can be strings, lists or dicts) ###
exports.classNames = classNames = (...classes) =>
  cls = classes.reduce ((o, x) =>
    x = "#{x}".split ' ' unless typeof x is 'object'
    merge o, (unless isArray x then x else merge ...x.map (k) => k and [k]: k)
  ), {}
  (keys cls).filter((k) => cls[k]).join ' '

_quiet = (handler) => if typeof handler isnt 'function' then handler else (event) -> event.redraw = no;  handler.call @, event
_quietEvents = (attrs, o = {}) =>
  (o[k] = if k[..1] isnt 'on' then v else _quiet v) for k, v of attrs
  o
prepareAttrs = (tag, props) => if typeof tag isnt 'string' then props else
  ['class', 'className', 'classList'].reduce ((o, k) => o[k] and o[k] = classNames o[k]; o), _quietEvents props

_createElement = (type, first, rest) => # performance optimization
  _rest = if first[1]?.attrs?.key? then rest else [rest]
  _moveParent _mithril_ type, (prepareAttrs type, first[0]), first[1], ..._rest
### Invokes Mithril directly to produce a vnode (props are optional if no children are given) ###
exports.createElement = (type, props, ...children) =>
  _createElement type, [props or {}], children

### Produces the vnode of current (most recent?) component ###
exports.currentComponent = => _vnode

### Returns children of the Mithril vnode ###
exports.children = children = (vnode) => vnode.children

### Returns props of the Mithril vnode ###
exports.props = props = (vnode) => vnode.attrs

### Produces the Hiccup form of the Reagent component from vnode ###
exports.argv = argv = (vnode) => vnode.attrs.argv

### Returns RAtom containing state of a Reagent component (from vnode) ###
exports.stateAtom = stateAtom = (vnode) => vnode.state._atom

### Returns state of a Reagent component (from vnode) ###
exports.state = (vnode) => deref stateAtom vnode

### Replaces state of a Reagent component (from vnode) ###
exports.replaceState = (vnode, newState) => reset (stateAtom vnode), newState

### Partially updates state of a Reagent component (from vnode) ###
exports.setState = (vnode, newState) => swap (stateAtom vnode), merge, newState
