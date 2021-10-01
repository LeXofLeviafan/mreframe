{eq, type, isArray, isDict, isFn, keys, getIn, merge, assoc, assocIn, identity} = require './util'
{atom, deref, reset, swap} = require './atom'
_mount_ = _redraw_ = _mithril_ = identity
_fragment_ = second = (a, b) => b
_eq_ = eq

exports._init = (opts) =>
  _mithril_ = opts?.hyperscript || _mithril_
  _fragment_ = _mithril_.fragment || second
  _redraw_ = opts?.redraw || _redraw_
  _mount_ = opts?.mount || _mount_
  _eq_ = opts?.eq || _eq_
  undefined

_vnode = atom() # contains vnode of most recent component
_renderCache = new Map
### Reset function components cache. ###
exports.resetCache = => _renderCache.clear()

_fnElement = (fcomponent) =>
  unless _renderCache.has fcomponent
    component =
      oninit: (vnode) =>
        vnode.state._comp = component
        vnode.state._atom = ratom()
        undefined
      view: (vnode) =>
        reset _vnode, vnode
        args = (argv vnode)[1..]
        x = (vnode.state._view or fcomponent) ...args
        asElement unless isFn x then x else vnode.state._view = x;  x ...args
    _renderCache.set fcomponent, component
  _renderCache.get fcomponent

_meta = (meta, args) => if isDict args[0] then [merge(args[0], meta), ...args[1..]] else [meta, ...args]
### Converts Hiccup forms into Mithril vnodes ###
exports.asElement = asElement = (form) => unless isArray form then form else
  [head, ...tail] = form
  meta = form._meta or {}
  if head is '>'               then createElement tail[0], ...(_meta meta, tail[1..]).map asElement
  else if head is '<>'         then _fragment_ meta, tail.map asElement
  else if type(head) is String then createElement head, ...(_meta meta, tail).map asElement
  else if isFn head            then createElement (_fnElement head), (merge meta, argv: form)
  else createElement head, (merge meta, argv: form)

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
###
exports.createClass = (spec) =>
  call = (k, vnode, args) => if spec[k]
    reset _vnode, vnode
    spec[k].apply vnode, args or [vnode]
  component =
    oninit:         (vnode) =>
      vnode.state._comp = component
      vnode.state._atom = ratom call 'getInitialState', vnode
      call 'constructor', vnode, [vnode, props vnode]
    oncreate:       (vnode) => call 'componentDidMount', vnode
    onupdate:       (vnode) => call 'componentDidUpdate', vnode
    onremove:       (vnode) => call 'componentWillUnmount', vnode
    onbeforeupdate: (vnode) => call 'shouldComponentUpdate', vnode
    onbeforeremove: (vnode) => call 'beforeComponentUnmounts', vnode
    view:           (vnode) => if spec.render then call 'render', vnode else
      asElement call('reagentRender', vnode, (argv vnode)[1..])

RAtom = (@x) ->
deref.when RAtom, (self) => self.x
reset.when RAtom, (self, value) => if _eq_ value, self.x then self.x else
  self.x = value
  _redraw_()
  value

### Produces an atom which causes redraws on update ###
exports.atom = ratom = (x) => new RAtom x

None = {}
_cursor = (ratom) => (path, value=None) =>
  if value is None then getIn (deref ratom), path else swap ratom, assocIn, path, value

RCursor = (@src, @path) ->
deref.when RCursor, (self) => self.src self.path
reset.when RCursor, (self, value) => if _eq_ value, (x = deref self) then x else
  self.src self.path, value
  _redraw_()
  value

### Produces a cursor (sub-state atom) from a path and either an atom or a getter/setter function ###
exports.cursor = (src, path) => new RCursor (if isFn src then src else _cursor src), path

### Converts a Mithril component into a Reagent component ###
exports.adaptComponent = (c) => (...args) => ['>', c, ...args]

### Merges provided class definitions into a string (definitions can be strings, lists or dicts) ###
exports.classNames = classNames = (...classes) =>
  cls = classes.reduce ((o, x) =>
    x = "#{x}".split ' ' unless isArray(x) or isDict(x)
    merge o, (if isDict x then x else merge ...x.map (k) => k and [k]: k)
  ), {}
  (keys cls).map((k) => cls[k] and k).filter(identity).join ' '

calcCssClass = (props) =>
  ['class', 'className', 'classList'].reduce ((o, k) => assoc o, k, o[k] and classNames o[k]), props

### Invokes Mithril directly to produce a vnode (props are optional) ###
exports.createElement = createElement = (type, ...children) =>
  [props, ...children] = if isDict children[0] then children else [{}, ...children]
  _mithril_ type, (calcCssClass props), ...children

### Produces the vnode of current (most recent?) component ###
exports.currentComponent = => deref _vnode

### Returns children of the Mithril vnode ###
exports.children = children = (vnode) => vnode.children

### Returns props of the Mithril vnode ###
exports.props = props = (vnode) => vnode.attrs

### Produces the Hiccup form of the Reagent component from vnode ###
exports.argv = argv = (vnode) => (props vnode).argv

### Returns RAtom containing state of a Reagent component (from vnode) ###
exports.stateAtom = stateAtom = (vnode) => vnode.state._atom

### Returns state of a Reagent component (from vnode) ###
exports.state = (vnode) => deref stateAtom vnode

### Replaces state of a Reagent component (from vnode) ###
exports.replaceState = (vnode, newState) => reset (stateAtom vnode), newState

### Partially updates state of a Reagent component (from vnode) ###
exports.setState = (vnode, newState) => swap (stateAtom vnode), merge, newState
