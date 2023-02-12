require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"

var Vnode = require("../render/vnode")

module.exports = function(render, schedule, console) {
	var subscriptions = []
	var pending = false
	var offset = -1

	function sync() {
		for (offset = 0; offset < subscriptions.length; offset += 2) {
			try { render(subscriptions[offset], Vnode(subscriptions[offset + 1]), redraw) }
			catch (e) { console.error(e) }
		}
		offset = -1
	}

	function redraw() {
		if (!pending) {
			pending = true
			schedule(function() {
				pending = false
				sync()
			})
		}
	}

	redraw.sync = sync

	function mount(root, component) {
		if (component != null && component.view == null && typeof component !== "function") {
			throw new TypeError("m.mount expects a component, not a vnode.")
		}

		var index = subscriptions.indexOf(root)
		if (index >= 0) {
			subscriptions.splice(index, 2)
			if (index <= offset) offset -= 2
			render(root, [])
		}

		if (component != null) {
			subscriptions.push(root, component)
			render(root, Vnode(component), redraw)
		}
	}

	return {mount: mount, redraw: redraw}
}

},{"../render/vnode":8}],2:[function(require,module,exports){
"use strict"

var render = require("./render")

module.exports = require("./api/mount-redraw")(render, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null)

},{"./api/mount-redraw":1,"./render":"mithril/render"}],3:[function(require,module,exports){
"use strict"

var Vnode = require("../render/vnode")
var hyperscriptVnode = require("./hyperscriptVnode")

module.exports = function() {
	var vnode = hyperscriptVnode.apply(0, arguments)

	vnode.tag = "["
	vnode.children = Vnode.normalizeChildren(vnode.children)
	return vnode
}

},{"../render/vnode":8,"./hyperscriptVnode":5}],4:[function(require,module,exports){
"use strict"

var Vnode = require("../render/vnode")
var hyperscriptVnode = require("./hyperscriptVnode")
var hasOwn = require("../util/hasOwn")

var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}

function isEmpty(object) {
	for (var key in object) if (hasOwn.call(object, key)) return false
	return true
}

function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}

function execSelector(state, vnode) {
	var attrs = vnode.attrs
	var hasClass = hasOwn.call(attrs, "class")
	var className = hasClass ? attrs.class : attrs.className

	vnode.tag = state.tag
	vnode.attrs = {}

	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}

		for (var key in attrs) {
			if (hasOwn.call(attrs, key)) newAttrs[key] = attrs[key]
		}

		attrs = newAttrs
	}

	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)){
			attrs[key] = state.attrs[key]
		}
	}
	if (className != null || state.attrs.className != null) attrs.className =
		className != null
			? state.attrs.className != null
				? String(state.attrs.className) + " " + String(className)
				: className
			: state.attrs.className != null
				? state.attrs.className
				: null

	if (hasClass) attrs.class = null

	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			vnode.attrs = attrs
			break
		}
	}

	return vnode
}

function hyperscript(selector) {
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}

	var vnode = hyperscriptVnode.apply(1, arguments)

	if (typeof selector === "string") {
		vnode.children = Vnode.normalizeChildren(vnode.children)
		if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode)
	}

	vnode.tag = selector
	return vnode
}

module.exports = hyperscript

},{"../render/vnode":8,"../util/hasOwn":9,"./hyperscriptVnode":5}],5:[function(require,module,exports){
"use strict"

var Vnode = require("../render/vnode")

// Call via `hyperscriptVnode.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript` and `fragment` factories and define this as
// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril.js requires thanks to IE support) doesn't give me that luxury,
// and engines aren't nearly intelligent enough to do either of these:
//
// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to
//    another function only to be indexed.
// 2. Elide an `arguments` allocation when it's passed to any function other
//    than `Function.prototype.apply` or `Reflect.apply`.
//
// In ES6, it'd probably look closer to this (I'd need to profile it, though):
// module.exports = function(attrs, ...children) {
//     if (attrs == null || typeof attrs === "object" && attrs.tag == null && !Array.isArray(attrs)) {
//         if (children.length === 1 && Array.isArray(children[0])) children = children[0]
//     } else {
//         children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children]
//         attrs = undefined
//     }
//
//     if (attrs == null) attrs = {}
//     return Vnode("", attrs.key, attrs, children)
// }
module.exports = function() {
	var attrs = arguments[this], start = this + 1, children

	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = this
	}

	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}

	return Vnode("", attrs.key, attrs, children)
}

},{"../render/vnode":8}],6:[function(require,module,exports){
"use strict"

var Vnode = require("../render/vnode")

module.exports = function($window) {
	var $doc = $window && $window.document
	var currentRedraw

	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}

	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}

	//sanity check to discourage people from doing `vnode.state = ...`
	function checkState(vnode, original) {
		if (vnode.state !== original) throw new Error("'vnode.state' must not be modified.")
	}

	//Note: the hook is passed as the `this` argument to allow proxying the
	//arguments without requiring a full array allocation to do so. It also
	//takes advantage of the fact the current `vnode` is the first argument in
	//all lifecycle methods.
	function callHook(vnode) {
		var original = vnode.state
		try {
			return this.apply(original, arguments)
		} finally {
			checkState(vnode, original)
		}
	}

	// IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
	// inside an iframe. Catch and swallow this error, and heavy-handidly return null.
	function activeElement() {
		try {
			return $doc.activeElement
		} catch (e) {
			return null
		}
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": createText(parent, vnode, nextSibling); break
				case "<": createHTML(parent, vnode, ns, nextSibling); break
				case "[": createFragment(parent, vnode, hooks, ns, nextSibling); break
				default: createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
	}
	var possibleParents = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}
	function createHTML(parent, vnode, ns, nextSibling) {
		var match = vnode.children.match(/^\s*?<(\w+)/im) || []
		// not using the proper parent makes the child element(s) vanish.
		//     var div = document.createElement("div")
		//     div.innerHTML = "<td>i</td><td>j</td>"
		//     console.log(div.innerHTML)
		// --> "ij", no <td> in sight.
		var temp = $doc.createElement(possibleParents[match[1]] || "div")
		if (ns === "http://www.w3.org/2000/svg") {
			temp.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">" + vnode.children + "</svg>"
			temp = temp.firstChild
		} else {
			temp.innerHTML = vnode.children
		}
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		// Capture nodes to remove, so we don't confuse them.
		vnode.instance = []
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			vnode.instance.push(child)
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs = vnode.attrs
		var is = attrs && attrs.is

		ns = getNameSpace(vnode) || ns

		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element

		if (attrs != null) {
			setAttrs(vnode, attrs, ns)
		}

		insertNode(parent, element, nextSibling)

		if (!maybeSetContentEditable(vnode)) {
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs)
			}
		}
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		initLifecycle(vnode.state, vnode, hooks)
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
		}
		else {
			vnode.domSize = 0
		}
	}

	//update
	/**
	 * @param {Element|Fragment} parent - the parent element
	 * @param {Vnode[] | null} old - the list of vnodes of the last `render()` call for
	 *                               this part of the tree
	 * @param {Vnode[] | null} vnodes - as above, but for the current `render()` call.
	 * @param {Function[]} hooks - an accumulator of post-render hooks (oncreate/onupdate)
	 * @param {Element | null} nextSibling - the next DOM node if we're dealing with a
	 *                                       fragment that is not the last item in its
	 *                                       parent
	 * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any
	 * @returns void
	 */
	// This function diffs and patches lists of vnodes, both keyed and unkeyed.
	//
	// We will:
	//
	// 1. describe its general structure
	// 2. focus on the diff algorithm optimizations
	// 3. discuss DOM node operations.

	// ## Overview:
	//
	// The updateNodes() function:
	// - deals with trivial cases
	// - determines whether the lists are keyed or unkeyed based on the first non-null node
	//   of each list.
	// - diffs them and patches the DOM if needed (that's the brunt of the code)
	// - manages the leftovers: after diffing, are there:
	//   - old nodes left to remove?
	// 	 - new nodes to insert?
	// 	 deal with them!
	//
	// The lists are only iterated over once, with an exception for the nodes in `old` that
	// are visited in the fourth part of the diff and in the `removeNodes` loop.

	// ## Diffing
	//
	// Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837
	// may be good for context on longest increasing subsequence-based logic for moving nodes.
	//
	// In order to diff keyed lists, one has to
	//
	// 1) match nodes in both lists, per key, and update them accordingly
	// 2) create the nodes present in the new list, but absent in the old one
	// 3) remove the nodes present in the old list, but absent in the new one
	// 4) figure out what nodes in 1) to move in order to minimize the DOM operations.
	//
	// To achieve 1) one can create a dictionary of keys => index (for the old list), then iterate
	// over the new list and for each new vnode, find the corresponding vnode in the old list using
	// the map.
	// 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new
	// and must be created.
	// For the removals, we actually remove the nodes that have been updated from the old list.
	// The nodes that remain in that list after 1) and 2) have been performed can be safely removed.
	// The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)
	// algorithm.
	//
	// the longest increasing subsequence is the list of nodes that can remain in place. Imagine going
	// from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices
	// corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would
	//  match the above lists, for example).
	//
	// In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We
	// can update those nodes without moving them, and only call `insertNode` on `4` and `5`.
	//
	// @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually
	// the longest increasing subsequence *of old nodes still present in the new list*).
	//
	// It is a general algorithm that is fireproof in all circumstances, but it requires the allocation
	// and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,
	// the `LIS` and a temporary one to create the LIS).
	//
	// So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of
	// the LIS and can be updated without moving them.
	//
	// If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with
	// the exception of the last node if the list is fully reversed).
	//
	// ## Finding the next sibling.
	//
	// `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.
	// When the list is being traversed top-down, at any index, the DOM nodes up to the previous
	// vnode reflect the content of the new list, whereas the rest of the DOM nodes reflect the old
	// list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.
	//
	// In the other scenarios (swaps, upwards traversal, map-based diff),
	// the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the
	// bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node
	// as the next sibling (cached in the `nextSibling` variable).


	// ## DOM node moves
	//
	// In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,
	// this is not the case if the node moved (second and fourth part of the diff algo). We move
	// the old DOM nodes before updateNode runs because it enables us to use the cached `nextSibling`
	// variable rather than fetching it using `getNextSibling()`.
	//
	// The fourth part of the diff currently inserts nodes unconditionally, leading to issues
	// like #1791 and #1999. We need to be smarter about those situations where adjascent old
	// nodes remain together in the new list in a way that isn't covered by parts one and
	// three of the diff algo.

	function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length)
		else {
			var isOldKeyed = old[0] != null && old[0].key != null
			var isKeyed = vnodes[0] != null && vnodes[0].key != null
			var start = 0, oldStart = 0
			if (!isOldKeyed) while (oldStart < old.length && old[oldStart] == null) oldStart++
			if (!isKeyed) while (start < vnodes.length && vnodes[start] == null) start++
			if (isOldKeyed !== isKeyed) {
				removeNodes(parent, old, oldStart, old.length)
				createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)
			} else if (!isKeyed) {
				// Don't index past the end of either list (causes deopts).
				var commonLength = old.length < vnodes.length ? old.length : vnodes.length
				// Rewind if necessary to the first non-null index on either side.
				// We could alternatively either explicitly create or remove nodes when `start !== oldStart`
				// but that would be optimizing for sparse lists which are more rare than dense ones.
				start = start < oldStart ? start : oldStart
				for (; start < commonLength; start++) {
					o = old[start]
					v = vnodes[start]
					if (o === v || o == null && v == null) continue
					else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling))
					else if (v == null) removeNode(parent, o)
					else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns)
				}
				if (old.length > commonLength) removeNodes(parent, old, start, old.length)
				if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)
			} else {
				// keyed diff
				var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling

				// bottom-up
				while (oldEnd >= oldStart && end >= start) {
					oe = old[oldEnd]
					ve = vnodes[end]
					if (oe.key !== ve.key) break
					if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldEnd--, end--
				}
				// top-down
				while (oldEnd >= oldStart && end >= start) {
					o = old[oldStart]
					v = vnodes[start]
					if (o.key !== v.key) break
					oldStart++, start++
					if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns)
				}
				// swaps and list reversals
				while (oldEnd >= oldStart && end >= start) {
					if (start === end) break
					if (o.key !== ve.key || oe.key !== v.key) break
					topSibling = getNextSibling(old, oldStart, nextSibling)
					moveNodes(parent, oe, topSibling)
					if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns)
					if (++start <= --end) moveNodes(parent, o, nextSibling)
					if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldStart++; oldEnd--
					oe = old[oldEnd]
					ve = vnodes[end]
					o = old[oldStart]
					v = vnodes[start]
				}
				// bottom up once again
				while (oldEnd >= oldStart && end >= start) {
					if (oe.key !== ve.key) break
					if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldEnd--, end--
					oe = old[oldEnd]
					ve = vnodes[end]
				}
				if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1)
				else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
				else {
					// inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
					var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li=0, i=0, pos = 2147483647, matched = 0, map, lisIndices
					for (i = 0; i < vnodesLength; i++) oldIndices[i] = -1
					for (i = end; i >= start; i--) {
						if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1)
						ve = vnodes[i]
						var oldIndex = map[ve.key]
						if (oldIndex != null) {
							pos = (oldIndex < pos) ? oldIndex : -1 // becomes -1 if nodes were re-ordered
							oldIndices[i-start] = oldIndex
							oe = old[oldIndex]
							old[oldIndex] = null
							if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
							if (ve.dom != null) nextSibling = ve.dom
							matched++
						}
					}
					nextSibling = originalNextSibling
					if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1)
					if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
					else {
						if (pos === -1) {
							// the indices of the indices of the items that are part of the
							// longest increasing subsequence in the oldIndices list
							lisIndices = makeLisIndices(oldIndices)
							li = lisIndices.length - 1
							for (i = end; i >= start; i--) {
								v = vnodes[i]
								if (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)
								else {
									if (lisIndices[li] === i - start) li--
									else moveNodes(parent, v, nextSibling)
								}
								if (v.dom != null) nextSibling = vnodes[i].dom
							}
						} else {
							for (i = end; i >= start; i--) {
								v = vnodes[i]
								if (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)
								if (v.dom != null) nextSibling = vnodes[i].dom
							}
						}
					}
				}
			}
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode.events = old.events
			if (shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, ns, nextSibling); break
					case "[": updateFragment(parent, old, vnode, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, ns)
		}
		else {
			removeNode(parent, old)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, ns, nextSibling) {
		if (old.children !== vnode.children) {
			removeHTML(parent, old)
			createHTML(parent, vnode, ns, nextSibling)
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
		}
	}
	function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns

		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (!maybeSetContentEditable(vnode)) {
			updateNodes(element, old.children, vnode.children, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
		vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		updateLifecycle(vnode.state, vnode, hooks)
		if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(parent, old.instance)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function getKeyMap(vnodes, start, end) {
		var map = Object.create(null)
		for (; start < end; start++) {
			var vnode = vnodes[start]
			if (vnode != null) {
				var key = vnode.key
				if (key != null) map[key] = start
			}
		}
		return map
	}
	// Lifted from ivi https://github.com/ivijs/ivi/
	// takes a list of unique numbers (-1 is special and can
	// occur multiple times) and returns an array with the indices
	// of the items that are part of the longest increasing
	// subsequence
	var lisTemp = []
	function makeLisIndices(a) {
		var result = [0]
		var u = 0, v = 0, i = 0
		var il = lisTemp.length = a.length
		for (var i = 0; i < il; i++) lisTemp[i] = a[i]
		for (var i = 0; i < il; ++i) {
			if (a[i] === -1) continue
			var j = result[result.length - 1]
			if (a[j] < a[i]) {
				lisTemp[i] = j
				result.push(i)
				continue
			}
			u = 0
			v = result.length - 1
			while (u < v) {
				// Fast integer average without overflow.
				// eslint-disable-next-line no-bitwise
				var c = (u >>> 1) + (v >>> 1) + (u & v & 1)
				if (a[result[c]] < a[i]) {
					u = c + 1
				}
				else {
					v = c
				}
			}
			if (a[i] < a[result[u]]) {
				if (u > 0) lisTemp[i] = result[u - 1]
				result[u] = i
			}
		}
		u = result.length
		v = result[u - 1]
		while (u-- > 0) {
			result[u] = v
			v = lisTemp[v]
		}
		lisTemp.length = 0
		return result
	}

	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}

	// This covers a really specific edge case:
	// - Parent node is keyed and contains child
	// - Child is removed, returns unresolved promise in `onbeforeremove`
	// - Parent node is moved in keyed diff
	// - Remaining children still need moved appropriately
	//
	// Ideally, I'd track removed nodes as well, but that introduces a lot more
	// complexity and I'm not exactly interested in doing that.
	function moveNodes(parent, vnode, nextSibling) {
		var frag = $doc.createDocumentFragment()
		moveChildToFrag(parent, frag, vnode)
		insertNode(parent, frag, nextSibling)
	}
	function moveChildToFrag(parent, frag, vnode) {
		// Dodge the recursion overhead in a few of the most common cases.
		while (vnode.dom != null && vnode.dom.parentNode === parent) {
			if (typeof vnode.tag !== "string") {
				vnode = vnode.instance
				if (vnode != null) continue
			} else if (vnode.tag === "<") {
				for (var i = 0; i < vnode.instance.length; i++) {
					frag.appendChild(vnode.instance[i])
				}
			} else if (vnode.tag !== "[") {
				// Don't recurse for text nodes *or* elements, just fragments
				frag.appendChild(vnode.dom)
			} else if (vnode.children.length === 1) {
				vnode = vnode.children[0]
				if (vnode != null) continue
			} else {
				for (var i = 0; i < vnode.children.length; i++) {
					var child = vnode.children[i]
					if (child != null) moveChildToFrag(parent, frag, child)
				}
			}
			break
		}
	}

	function insertNode(parent, dom, nextSibling) {
		if (nextSibling != null) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}

	function maybeSetContentEditable(vnode) {
		if (vnode.attrs == null || (
			vnode.attrs.contenteditable == null && // attribute
			vnode.attrs.contentEditable == null // property
		)) return false
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted.")
		return true
	}

	//remove
	function removeNodes(parent, vnodes, start, end) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) removeNode(parent, vnode)
		}
	}
	function removeNode(parent, vnode) {
		var mask = 0
		var original = vnode.state
		var stateResult, attrsResult
		if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
			var result = callHook.call(vnode.state.onbeforeremove, vnode)
			if (result != null && typeof result.then === "function") {
				mask = 1
				stateResult = result
			}
		}
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = callHook.call(vnode.attrs.onbeforeremove, vnode)
			if (result != null && typeof result.then === "function") {
				// eslint-disable-next-line no-bitwise
				mask |= 2
				attrsResult = result
			}
		}
		checkState(vnode, original)

		// If we can, try to fast-path it and avoid all the overhead of awaiting
		if (!mask) {
			onremove(vnode)
			removeChild(parent, vnode)
		} else {
			if (stateResult != null) {
				var next = function () {
					// eslint-disable-next-line no-bitwise
					if (mask & 1) { mask &= 2; if (!mask) reallyRemove() }
				}
				stateResult.then(next, next)
			}
			if (attrsResult != null) {
				var next = function () {
					// eslint-disable-next-line no-bitwise
					if (mask & 2) { mask &= 1; if (!mask) reallyRemove() }
				}
				attrsResult.then(next, next)
			}
		}

		function reallyRemove() {
			checkState(vnode, original)
			onremove(vnode)
			removeChild(parent, vnode)
		}
	}
	function removeHTML(parent, vnode) {
		for (var i = 0; i < vnode.instance.length; i++) {
			parent.removeChild(vnode.instance[i])
		}
	}
	function removeChild(parent, vnode) {
		// Dodge the recursion overhead in a few of the most common cases.
		while (vnode.dom != null && vnode.dom.parentNode === parent) {
			if (typeof vnode.tag !== "string") {
				vnode = vnode.instance
				if (vnode != null) continue
			} else if (vnode.tag === "<") {
				removeHTML(parent, vnode)
			} else {
				if (vnode.tag !== "[") {
					parent.removeChild(vnode.dom)
					if (!Array.isArray(vnode.children)) break
				}
				if (vnode.children.length === 1) {
					vnode = vnode.children[0]
					if (vnode != null) continue
				} else {
					for (var i = 0; i < vnode.children.length; i++) {
						var child = vnode.children[i]
						if (child != null) removeChild(parent, child)
					}
				}
			}
			break
		}
	}
	function onremove(vnode) {
		if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode)
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode)
		if (typeof vnode.tag !== "string") {
			if (vnode.instance != null) onremove(vnode.instance)
		} else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}

	//attrs
	function setAttrs(vnode, attrs, ns) {
		// If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
		//
		// Also, the DOM does things to inputs based on the value, so it needs set first.
		// See: https://github.com/MithrilJS/mithril.js/issues/2622
		if (vnode.tag === "input" && attrs.type != null) vnode.dom.setAttribute("type", attrs.type)
		var isFileInput = attrs != null && vnode.tag === "input" && attrs.type === "file"
		for (var key in attrs) {
			setAttr(vnode, key, null, attrs[key], ns, isFileInput)
		}
	}
	function setAttr(vnode, key, old, value, ns, isFileInput) {
		if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || (old === value && !isFormAttribute(vnode, key)) && typeof value !== "object" || key === "type" && vnode.tag === "input") return
		if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value)
		if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value)
		else if (key === "style") updateStyle(vnode.dom, old, value)
		else if (hasPropertyKey(vnode, key, ns)) {
			if (key === "value") {
				// Only do the coercion if we're actually going to check the value.
				/* eslint-disable no-implicit-coercion */
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				//setting input[type=file][value] to same value causes an error to be generated if it's non-empty
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && (isFileInput || vnode.dom === activeElement())) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return
				//setting input[type=file][value] to different value is an error if it's non-empty
				// Not ideal, but it at least works around the most common source of uncaught exceptions for now.
				if (isFileInput && "" + value !== "") { console.error("`value` is read-only on file inputs!"); return }
				/* eslint-enable no-implicit-coercion */
			}
			vnode.dom[key] = value
		} else {
			if (typeof value === "boolean") {
				if (value) vnode.dom.setAttribute(key, "")
				else vnode.dom.removeAttribute(key)
			}
			else vnode.dom.setAttribute(key === "className" ? "class" : key, value)
		}
	}
	function removeAttr(vnode, key, old, ns) {
		if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) return
		if (key[0] === "o" && key[1] === "n") updateEvent(vnode, key, undefined)
		else if (key === "style") updateStyle(vnode.dom, old, null)
		else if (
			hasPropertyKey(vnode, key, ns)
			&& key !== "className"
			&& key !== "title" // creates "null" as title
			&& !(key === "value" && (
				vnode.tag === "option"
				|| vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement()
			))
			&& !(vnode.tag === "input" && key === "type")
		) {
			vnode.dom[key] = null
		} else {
			var nsLastIndex = key.indexOf(":")
			if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1)
			if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key)
		}
	}
	function setLateSelectAttrs(vnode, attrs) {
		if ("value" in attrs) {
			if(attrs.value === null) {
				if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null
			} else {
				var normalized = "" + attrs.value // eslint-disable-line no-implicit-coercion
				if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {
					vnode.dom.value = normalized
				}
			}
		}
		if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined)
	}
	function updateAttrs(vnode, old, attrs, ns) {
		if (old && old === attrs) {
			console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major")
		}
		if (attrs != null) {
			// If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
			//
			// Also, the DOM does things to inputs based on the value, so it needs set first.
			// See: https://github.com/MithrilJS/mithril.js/issues/2622
			if (vnode.tag === "input" && attrs.type != null) vnode.dom.setAttribute("type", attrs.type)
			var isFileInput = vnode.tag === "input" && attrs.type === "file"
			for (var key in attrs) {
				setAttr(vnode, key, old && old[key], attrs[key], ns, isFileInput)
			}
		}
		var val
		if (old != null) {
			for (var key in old) {
				if (((val = old[key]) != null) && (attrs == null || attrs[key] == null)) {
					removeAttr(vnode, key, val, ns)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function hasPropertyKey(vnode, key, ns) {
		// Filter out namespaced keys
		return ns === undefined && (
			// If it's a custom element, just keep it.
			vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is ||
			// If it's a normal element, let's try to avoid a few browser bugs.
			key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height"// && key !== "type"
			// Defer the property check until *after* we check everything.
		) && key in vnode.dom
	}

	//style
	var uppercaseRegex = /[A-Z]/g
	function toLowerCase(capital) { return "-" + capital.toLowerCase() }
	function normalizeKey(key) {
		return key[0] === "-" && key[1] === "-" ? key :
			key === "cssFloat" ? "float" :
				key.replace(uppercaseRegex, toLowerCase)
	}
	function updateStyle(element, old, style) {
		if (old === style) {
			// Styles are equivalent, do nothing.
		} else if (style == null) {
			// New style is missing, just clear it.
			element.style.cssText = ""
		} else if (typeof style !== "object") {
			// New style is a string, let engine deal with patching.
			element.style.cssText = style
		} else if (old == null || typeof old !== "object") {
			// `old` is missing or a string, `style` is an object.
			element.style.cssText = ""
			// Add new style properties
			for (var key in style) {
				var value = style[key]
				if (value != null) element.style.setProperty(normalizeKey(key), String(value))
			}
		} else {
			// Both old & new are (different) objects.
			// Update style properties that have changed
			for (var key in style) {
				var value = style[key]
				if (value != null && (value = String(value)) !== String(old[key])) {
					element.style.setProperty(normalizeKey(key), value)
				}
			}
			// Remove style properties that no longer exist
			for (var key in old) {
				if (old[key] != null && style[key] == null) {
					element.style.removeProperty(normalizeKey(key))
				}
			}
		}
	}

	// Here's an explanation of how this works:
	// 1. The event names are always (by design) prefixed by `on`.
	// 2. The EventListener interface accepts either a function or an object
	//    with a `handleEvent` method.
	// 3. The object does not inherit from `Object.prototype`, to avoid
	//    any potential interference with that (e.g. setters).
	// 4. The event name is remapped to the handler before calling it.
	// 5. In function-based event handlers, `ev.target === this`. We replicate
	//    that below.
	// 6. In function-based event handlers, `return false` prevents the default
	//    action and stops event propagation. We replicate that below.
	function EventDict() {
		// Save this, so the current redraw is correctly tracked.
		this._ = currentRedraw
	}
	EventDict.prototype = Object.create(null)
	EventDict.prototype.handleEvent = function (ev) {
		var handler = this["on" + ev.type]
		var result
		if (typeof handler === "function") result = handler.call(ev.currentTarget, ev)
		else if (typeof handler.handleEvent === "function") handler.handleEvent(ev)
		if (this._ && ev.redraw !== false) (0, this._)()
		if (result === false) {
			ev.preventDefault()
			ev.stopPropagation()
		}
	}

	//event
	function updateEvent(vnode, key, value) {
		if (vnode.events != null) {
			vnode.events._ = currentRedraw
			if (vnode.events[key] === value) return
			if (value != null && (typeof value === "function" || typeof value === "object")) {
				if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false)
				vnode.events[key] = value
			} else {
				if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false)
				vnode.events[key] = undefined
			}
		} else if (value != null && (typeof value === "function" || typeof value === "object")) {
			vnode.events = new EventDict()
			vnode.dom.addEventListener(key.slice(2), vnode.events, false)
			vnode.events[key] = value
		}
	}

	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") callHook.call(source.oninit, vnode)
		if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		do {
			if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
				var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old)
				if (force !== undefined && !force) break
			}
			if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
				var force = callHook.call(vnode.state.onbeforeupdate, vnode, old)
				if (force !== undefined && !force) break
			}
			return false
		} while (false); // eslint-disable-line no-constant-condition
		vnode.dom = old.dom
		vnode.domSize = old.domSize
		vnode.instance = old.instance
		// One would think having the actual latest attributes would be ideal,
		// but it doesn't let us properly diff based on our current internal
		// representation. We have to save not only the old DOM info, but also
		// the attributes used to create it, as we diff *that*, not against the
		// DOM directly (with a few exceptions in `setAttr`). And, of course, we
		// need to save the children and text as they are conceptually not
		// unlike special "attributes" internally.
		vnode.attrs = old.attrs
		vnode.children = old.children
		vnode.text = old.text
		return true
	}

	var currentDOM

	return function(dom, vnodes, redraw) {
		if (!dom) throw new TypeError("DOM element being rendered to does not exist.")
		if (currentDOM != null && dom.contains(currentDOM)) {
			throw new TypeError("Node is currently being rendered to and thus is locked.")
		}
		var prevRedraw = currentRedraw
		var prevDOM = currentDOM
		var hooks = []
		var active = activeElement()
		var namespace = dom.namespaceURI

		currentDOM = dom
		currentRedraw = typeof redraw === "function" ? redraw : undefined
		try {
			// First time rendering into a node clears it out
			if (dom.vnodes == null) dom.textContent = ""
			vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes])
			updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
			dom.vnodes = vnodes
			// `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement
			if (active != null && activeElement() !== active && typeof active.focus === "function") active.focus()
			for (var i = 0; i < hooks.length; i++) hooks[i]()
		} finally {
			currentRedraw = prevRedraw
			currentDOM = prevDOM
		}
	}
}

},{"../render/vnode":8}],7:[function(require,module,exports){
"use strict"

var Vnode = require("../render/vnode")

module.exports = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}

},{"../render/vnode":8}],8:[function(require,module,exports){
"use strict"

function Vnode(tag, key, attrs, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, domSize: undefined, state: undefined, events: undefined, instance: undefined}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node == null || typeof node === "boolean") return null
	if (typeof node === "object") return node
	return Vnode("#", undefined, undefined, String(node), undefined, undefined)
}
Vnode.normalizeChildren = function(input) {
	var children = []
	if (input.length) {
		var isKeyed = input[0] != null && input[0].key != null
		// Note: this is a *very* perf-sensitive check.
		// Fun fact: merging the loop like this is somehow faster than splitting
		// it, noticeably so.
		for (var i = 1; i < input.length; i++) {
			if ((input[i] != null && input[i].key != null) !== isKeyed) {
				throw new TypeError(
					isKeyed && (input[i] != null || typeof input[i] === "boolean")
						? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole."
						: "In fragments, vnodes must either all have keys or none have keys."
				)
			}
		}
		for (var i = 0; i < input.length; i++) {
			children[i] = Vnode.normalize(input[i])
		}
	}
	return children
}

module.exports = Vnode

},{}],9:[function(require,module,exports){
// This exists so I'm only saving it once.
"use strict"

module.exports = {}.hasOwnProperty

},{}],10:[function(require,module,exports){
(function() {
  var Atom, compareAndSet, deref, multi, reset, resetVals, swap, swapVals, type;

  ({multi, type} = require('./util'));

  exports.deref = deref = multi(type);

  // these default definitions are clearly non-atomic but JS is single-threaded anyway
  exports.resetVals = resetVals = (multi(type)).default((self, value) => {
    return [deref(self), reset(self, value)];
  });

  exports.reset = reset = (multi(type)).default((self, value) => {
    return swap(self, () => {
      return value;
    });
  });

  exports.swapVals = swapVals = (multi(type)).default((self, f, ...args) => {
    return resetVals(self, f(deref(self), ...args));
  });

  exports.swap = swap = (multi(type)).default((...args) => {
    return (swapVals(...args))[1];
  });

  exports.compareAndSet = compareAndSet = multi(type).default((self, oldval, newval) => {
    return (oldval === deref(self)) && (reset(self, newval), true);
  });

  Atom = function(x1) {
    this.x = x1;
  };

  deref.when(Atom, (self) => {
    return self.x;
  });

  reset.when(Atom, (self, value) => {
    return self.x = value;
  });

  exports.atom = (x) => {
    return new Atom(x);
  };

}).call(this);

},{"./util":13}],11:[function(require,module,exports){
(function() {

  /*
    Context structure:
    {:coeffects {:event [:some-id :some-param]
                 :db    "original contents of app-db"}
     :effects   {:db    "new value for app-db>"
                 :dispatch  [:an-event-id :param1]}
     :queue     "a collection of further interceptors"
     :stack     "a collection of interceptors already walked"}
  */
  var _calcSignals, _calcSub, _clear, _ctxEvt, _cursors, _deref, _dispatch, _duplicate, _effects, _eq_, _eventQueue, _fx, _getDb, _getX, _initReagent, _intercept, _invalidSignals, _noHandler, _pathKey, _replaceEvent, _restoreEvent, _signals, _subscriptionCache, appDb, assoc, assocCoeffect, assocEffect, assocIn, atom, chain, chunks, clearEvent, coeffects, cursor, deref, dict, dispatch, dispatchSync, dissoc, effects, entries, eq, eqShallow, events, flatten, getCoeffect, getEffect, getIn, identical, identity, isArray, isDict, isFn, keys, merge, ratom, regEventCtx, regEventFx, repr, reset, subscribe, subscriptions, swap, toInterceptor, update,
    splice = [].splice;

  ({identical, eq, eqShallow, keys, dict, entries, isArray, isDict, isFn, getIn, merge, assoc, assocIn, dissoc, update, repr, identity, chunks, flatten, chain} = require('./util'));

  ({atom, deref, reset, swap} = require('./atom'));

  ({
    _init: _initReagent,
    atom: ratom,
    cursor
  } = require('./reagent'));

  _eq_ = eq;

  exports._init = (opts) => {
    _initReagent(opts);
    _eq_ = (opts != null ? opts.eq : void 0) || _eq_;
    return void 0;
  };

  /* Application state atom */
  exports.appDb = appDb = ratom({});

  events = atom({});

  effects = atom({});

  coeffects = atom({});

  subscriptions = atom({});

  _noHandler = (kind, [key]) => {
    return console.error(`re-frame: no ${kind} handler registered for: '${key}'`);
  };

  _duplicate = (kind, key) => {
    return console.warn(`re-frame: overwriting ${kind} handler for: '${key}'`);
  };

  _subscriptionCache = new Map();

  /* Removes cached subscriptions (forcing to recalculate) */
  exports.clearSubscriptionCache = () => {
    return _subscriptionCache.clear();
  };

  _eventQueue = new Set();

  /* Cancels all scheduled events */
  exports.purgeEventQueue = () => {
    _eventQueue.forEach(clearTimeout);
    return _eventQueue.clear();
  };

  _clear = (atom) => {
    return (id) => {
      if (id) {
        swap(atom, dissoc, id);
      } else {
        reset(atom, {});
      }
      return void 0;
    };
  };

  _invalidSignals = () => {
    throw SyntaxError("re-frame: invalid subscription signals");
  };

  _signals = (signals) => {
    var queries;
    if (!signals.every(([k, q]) => {
      return (k === '<-') && isArray(q);
    })) {
      _invalidSignals();
    }
    queries = signals.map((kq) => {
      return kq[1];
    });
    if (queries.length === 1) {
      return () => {
        return subscribe(queries[0]);
      };
    } else {
      return () => {
        return queries.map(subscribe);
      };
    }
  };

  _deref = (ratom) => {
    return ratom._deref(); // parent ratom is not to be propagated
  };

  _calcSignals = (signals) => {
    if (isArray(signals)) {
      return signals.map(_deref);
    } else if (!isDict(signals)) {
      return _deref(signals);
    } else {
      return dict(entries(signals).map(([k, v]) => {
        return [k, _deref(v)];
      }));
    }
  };

  /* Registers a subscription function to compute view data */
  exports.regSub = (id, ...signals) => {
    var computation, ref;
    ref = signals, [...signals] = ref, [computation] = splice.call(signals, -1);
    signals = signals.length === 0 ? () => {
      return appDb;
    } : signals.length !== 1 ? _signals(chunks(signals, 2)) : isFn(signals[0]) ? signals[0] : _invalidSignals();
    if ((deref(subscriptions))[id]) {
      _duplicate("subscription", id);
    }
    swap(subscriptions, assoc, id, [signals, computation]);
    return void 0;
  };

  _calcSub = (signals, computation) => {
    return (query) => {
      var input, input_, key, output, x;
      input = _calcSignals(signals(query));
      if (_subscriptionCache.has(key = repr(query))) {
        [input_, output] = _subscriptionCache.get(key);
        if (eqShallow(input, input_)) {
          return output;
        }
      }
      x = computation(input, query);
      _subscriptionCache.set(key, [input, x]);
      return x;
    };
  };

  _cursors = new Map();

  /* Returns an RCursor that derefs to subscription result (or cached value) */
  exports.subscribe = subscribe = (query) => {
    var it, key;
    if (!(it = (deref(subscriptions))[query[0]])) {
      return _noHandler("subscription", query);
    } else {
      if (!_cursors.has(key = repr(query))) {
        _cursors.set(key, cursor(_calcSub(...it), query));
      }
      return _cursors.get(key);
    }
  };

  /* Unregisters one or all subscription functions */
  exports.clearSub = ((_clearSubs) => {
    return (id) => {
      id || _cursors.clear();
      return _clearSubs(id);
    };
  })(_clear(subscriptions));

  /*
    Produces an interceptor (changed from varargs to options object).

    Interceptor structure:
    {:id      :something             ;; decorative only - can be ignored
     :before  (fn [context] ...)     ;; returns a possibly modified `context`
     :after   (fn [context] ...)}    ;; returns a possibly modified `context`
  */
  exports.toInterceptor = toInterceptor = (args) => {
    return {
      id: args != null ? args.id : void 0,
      before: (args != null ? args.before : void 0) || identity,
      after: (args != null ? args.after : void 0) || identity
    };
  };

  _getX = (x, key, notFound) => {
    if (!key) {
      return x;
    } else if (key in (x || {})) {
      return x[key];
    } else {
      return notFound;
    }
  };

  /* Returns context coeffects or specified coeffect */
  exports.getCoeffect = getCoeffect = (context, key, notFound) => {
    return _getX(context.coeffects, key, notFound);
  };

  /* Returns context effects or specified effect */
  exports.getEffect = getEffect = (context, key, notFound) => {
    return _getX(context.effects, key, notFound);
  };

  /* Produces a copy of the context with added coeffect */
  exports.assocCoeffect = assocCoeffect = (context, key, value) => {
    return assocIn(context, ['coeffects', key], value);
  };

  /* Produces a copy of the context with added effect */
  exports.assocEffect = assocEffect = (context, key, value) => {
    return assocIn(context, ['effects', key], value);
  };

  /* Produces a copy of the context with interceptors added to the queue */
  exports.enqueue = (context, interceptors) => {
    return update(context, 'queue', (xs) => {
      return [...xs, ...interceptors];
    });
  };

  _getDb = (context) => {
    return getEffect(context, 'db', getCoeffect(context, 'db'));
  };

  _pathKey = 're-frame-path/db-store';

  /* Produces an interceptor which switches out db for its subpath */
  exports.path = (...path) => {
    return toInterceptor({
      id: 'path',
      before: (context) => {
        var db, dbs;
        db = getCoeffect(context, 'db');
        dbs = [...(context[_pathKey] || []), db];
        return chain(context, [assoc, _pathKey, dbs], [assocCoeffect, 'db', getIn(db, flatten(path))]);
      },
      after: (context) => {
        var db, dbs, ref;
        ref = context[_pathKey], [...dbs] = ref, [db] = splice.call(dbs, -1);
        return chain(context, [assoc, _pathKey, dbs], [assocEffect, 'db', assocIn(db, flatten(path), _getDb(context))], [assocCoeffect, 'db', db]);
      }
    });
  };

  /* Produces an interceptor which updates db effect after the event handler */
  exports.enrich = (f) => {
    return toInterceptor({
      id: 'enrich',
      after: (context) => {
        return assocEffect(context, 'db', f(_getDb(context), getCoeffect(context, 'event')));
      }
    });
  };

  _replaceEvent = (f) => {
    return (context) => {
      var event;
      event = getCoeffect(context, 'event');
      return chain(context, [assocCoeffect, 'originalEvent', event], [assocCoeffect, 'event', f(event)]);
    };
  };

  _restoreEvent = (context) => {
    return assocCoeffect(context, 'event', getCoeffect(context, 'originalEvent'));
  };

  /* An interceptor switches out event for its 1st parameter */
  exports.unwrap = toInterceptor({
    id: 'unwrap',
    after: _restoreEvent,
    before: _replaceEvent((event) => {
      return event[1];
    })
  });

  /* An interceptor switches out event for its parameters */
  exports.trimV = toInterceptor({
    id: 'trim-v',
    after: _restoreEvent,
    before: _replaceEvent((event) => {
      return event.slice(1);
    })
  });

  /* Produces an interceptor which updates runs an action on db/event after the event handler */
  exports.after = (f) => {
    return toInterceptor({
      id: 'after',
      after: (context) => {
        f(_getDb(context), getCoeffect(context, 'event'));
        return context;
      }
    });
  };

  /* Produces an interceptor which recalculates db subpath if input subpaths changed */
  exports.onChanges = (f, outPath, ...inPaths) => {
    return toInterceptor({
      id: 'on-changes',
      after: (context) => {
        var db0, db1, ins, outs;
        db0 = getCoeffect(context, 'db');
        db1 = _getDb(context);
        [ins, outs] = [db0, db1].map((db) => {
          return inPaths.map((path) => {
            return getIn(db, path);
          });
        });
        if (outs.every((x, i) => {
          return identical(x, ins[i]);
        })) {
          return context;
        } else {
          return assocEffect(context, 'db', assocIn(db1, outPath, f(...outs)));
        }
      }
    });
  };

  /* Registers a coeffect handler (for use as an interceptor) */
  exports.regCofx = (id, handler) => {
    if ((deref(coeffects))[id]) {
      _duplicate("coeffect", id);
    }
    swap(coeffects, assoc, id, handler);
    return void 0;
  };

  /* Produces an interceptor which applies a coeffect handler before the event handler */
  exports.injectCofx = (key, arg) => {
    return toInterceptor({
      id: key,
      before: (context) => {
        var it;
        if ((it = (deref(coeffects))[key])) {
          return update(context, 'coeffects', (deref(coeffects))[key], arg);
        } else {
          _noHandler("coeffect", [key]);
          return context;
        }
      }
    });
  };

  /* Unregisters one or all coeffect handlers */
  exports.clearCofx = _clear(coeffects);

  /* Registers an event handler which calculates new application state from the old one */
  exports.regEventDb = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    return regEventFx(id, interceptors, (cofx, query) => {
      return {
        db: handler(cofx.db, query)
      };
    });
  };

  _ctxEvt = (handler) => {
    return (context) => {
      return merge(context, {
        effects: handler(getCoeffect(context), getCoeffect(context, 'event'))
      });
    };
  };

  /* Registers an event handler which calculates effects from coeffects */
  exports.regEventFx = regEventFx = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    return regEventCtx(id, interceptors, _ctxEvt(handler));
  };

  /* Registers an event handler which arbitrarily updates the context */
  exports.regEventCtx = regEventCtx = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    if ((deref(events))[id]) {
      _duplicate("event", id);
    }
    swap(events, assoc, id, [flatten(interceptors.filter(identity)), handler]);
    return void 0;
  };

  /* Unregisters one or all event handlers */
  exports.clearEvent = clearEvent = _clear(events);

  _intercept = (context, hook) => { // every step is dynamic so no chains, folds or for-loops
    var x, xs;
    context = merge(context, {
      stack: [],
      queue: context.stack
    });
    while (context.queue.length > 0) {
      [x, ...xs] = context.queue;
      context = x[hook](merge(context, {
        queue: xs
      }));
      context = merge(context, {
        stack: [x, ...context.stack]
      });
    }
    return context;
  };

  /* Dispatches an event (running back and forth through interceptor chain & handler then actions effects) */
  exports.dispatchSync = dispatchSync = (event) => {
    var context, handler, it, stack;
    if (!(it = (deref(events))[event[0]])) {
      return _noHandler("event", event);
    } else {
      [stack, handler] = it;
      context = {
        stack,
        coeffects: {
          event,
          db: _deref(appDb)
        }
      };
      return chain(context, [_intercept, 'before'], handler, [_intercept, 'after'], getEffect, entries, _fx);
    }
  };

  _dispatch = ({ms, dispatch}) => {
    var id;
    _eventQueue.add(id = setTimeout((() => {
      _eventQueue.delete(id);
      return dispatchSync(dispatch);
    }), ms));
    return id;
  };

  /* Schedules dispatching of an event */
  exports.dispatch = dispatch = (dispatch) => {
    return _dispatch({dispatch});
  };

  _fx = (fxs, fx = deref(effects)) => {
    return fxs.filter(identity).forEach(([k, v]) => {
      var it;
      if ((it = fx[k] || _effects[k])) {
        return it(v);
      } else {
        return _noHandler("effect", [k]);
      }
    });
  };

  _effects = { // builtin effects
    db: (value) => {
      if (!_eq_(value, _deref(appDb))) {
        return reset(appDb, value);
      }
    },
    fx: _fx,
    dispatchLater: _dispatch,
    dispatch: (dispatch) => {
      return _dispatch({dispatch});
    }
  };

  /* Registers an effect handler (implementation of a side-effect) */
  exports.regFx = (id, handler) => {
    if ((deref(effects))[id]) {
      _duplicate("effect", id);
    }
    swap(effects, assoc, id, handler);
    return void 0;
  };

  /* Unregisters one or all effect handlers (excepting builtin ones) */
  exports.clearFx = _clear(effects);

  /* Convenience function (for JS); returns deref'ed result of a subscription */
  exports.dsub = (query) => {
    return deref(subscribe(query));
  };

  /* Convenience function (for fx); schedules dispatching an event (if present) with additional parameters */
  exports.disp = (evt, ...args) => {
    return evt && dispatch([...evt, ...args]);
  };

}).call(this);

},{"./atom":10,"./reagent":12,"./util":13}],12:[function(require,module,exports){
(function() {
  var RAtom, RCursor, _createElement, _cursor, _detectChanges, _eqArgs, _fnElement, _fragment_, _meta, _mithril_, _mount_, _moveParent, _propagate, _quiet, _quietEvents, _redraw_, _renderCache, _rendering, _vnode, argv, asElement, assocIn, atom, children, classNames, deref, eqShallow, getIn, identical, identity, isArray, keys, merge, prepareAttrs, props, ratom, reset, second, stateAtom, swap;

  ({identical, eqShallow, isArray, keys, getIn, merge, assocIn, identity} = require('./util'));

  ({atom, deref, reset, swap} = require('./atom'));

  _mount_ = _redraw_ = _mithril_ = identity;

  _fragment_ = second = (a, b) => {
    return b;
  };

  exports._init = (opts) => {
    _mithril_ = (opts != null ? opts.hyperscript : void 0) || _mithril_;
    _fragment_ = _mithril_.fragment || second;
    _redraw_ = (opts != null ? opts.redraw : void 0) || _redraw_;
    _mount_ = (opts != null ? opts.mount : void 0) || _mount_;
    return void 0;
  };

  _vnode = null; // contains vnode of most recent component

  _renderCache = new Map();

  /* Reset function components cache. */
  exports.resetCache = () => {
    return _renderCache.clear();
  };

  _propagate = (vnode, ratom, value) => {
    while (vnode) {
      vnode.state._subs.set(ratom, value);
      vnode = vnode._parent;
    }
    return value;
  };

  _eqArgs = (xs, ys) => {
    return (!xs && !ys) || ((xs != null ? xs.length : void 0) === (ys != null ? ys.length : void 0) && xs.every((x, i) => {
      return eqShallow(x, ys[i]);
    }));
  };

  _detectChanges = function(vnode) {
    var subs;
    return !_eqArgs(vnode.attrs.argv, this._argv) || ((subs = Array.from(this._subs)).some(([ratom, value]) => {
      return ratom._deref() !== value;
    })) || (subs.forEach(([ratom, value]) => {
      return _propagate(vnode._parent, ratom, value);
    }), false); // no changes, propagating ratoms
  };

  _rendering = (binding) => {
    return function(vnode) {
      _vnode = vnode;
      try {
        this._subs.clear();
        this._argv = vnode.attrs.argv; // last render args
        return binding.call(this, vnode);
      } finally {
        _vnode = null;
      }
    };
  };

  _fnElement = (fcomponent) => {
    var component;
    if (!_renderCache.has(fcomponent)) {
      component = {
        oninit: function(vnode) {
          this._comp = component; // self
          this._subs = new Map(); // input ratoms (resets before render)
          this._atom = ratom(); // state ratom;  ._subs should work for it as well
          this._view = fcomponent;
          return void 0;
        },
        onbeforeupdate: _detectChanges,
        view: _rendering(function(vnode) {
          var args, x;
          x = this._view.apply(vnode, (args = vnode.attrs.argv.slice(1)));
          return asElement(typeof x !== 'function' ? x : (this._view = x).apply(vnode, args));
        })
      };
      _renderCache.set(fcomponent, component);
    }
    return _renderCache.get(fcomponent);
  };

  _meta = (meta, o) => {
    if (typeof o === 'object' && !isArray(o)) {
      return [merge(o, meta)];
    } else {
      return [meta, asElement(o)];
    }
  };

  _moveParent = (vnode) => {
    if (vnode.attrs) {
      vnode._parent = vnode.attrs._parent || null; // might be undefined if not called directly from a component
      delete vnode.attrs._parent;
    }
    return vnode;
  };

  /* Converts Hiccup forms into Mithril vnodes */
  exports.asElement = asElement = (form) => {
    var head, meta;
    if (isArray(form)) {
      head = form[0];
      meta = {
        ...(form._meta || {}),
        _parent: _vnode
      };
      if (head === '>') {
        return _createElement(form[1], _meta(meta, form[2]), form.slice(3).map(asElement));
      } else if (head === '<>') {
        return _moveParent(_fragment_(meta, form.slice(1).map(asElement)));
      } else if (typeof head === 'string') {
        return _createElement(head, _meta(meta, form[1]), form.slice(2).map(asElement));
      } else if (typeof head === 'function') {
        return _createElement(_fnElement(head), [
          {
            ...meta,
            argv: form
          }
        ]);
      } else {
        return _createElement(head, [
          {
            ...meta,
            argv: form
          }
        ]);
      }
    } else {
      return form;
    }
  };

  /* Mounts a Hiccup form to a DOM element */
  exports.render = (comp, container) => {
    return _mount_(container, {
      view: () => {
        return asElement(comp);
      }
    });
  };

  /* Adds metadata to the Hiccup form of a Reagent component or a fragment */
  exports.with = (meta, form) => {
    form = form.slice(0);
    form._meta = meta;
    return form;
  };

  /*
    Creates a class component based on the spec. (It's a valid Mithril component.)
    Only a subset of the original reagent functons is supported (mostly based on Mithril hooks):
    constructor, getInitialState, componentDidMount, componentDidUpdate,
    componentWillUnmount, shouldComponentUpdate, render, reagentRender (use symbols in Wisp).
    Also, beforeComponentUnmounts was added (see 'onbeforeremove' in Mithril).
    Instead of 'this', vnode is passed in calls.
    NOTE: shouldComponentUpdate overrides Reagent changes detection
  */
  exports.createClass = (spec) => {
    var bind, component;
    bind = (k, method = spec[k]) => {
      return method && ((vnode, args) => {
        _vnode = vnode;
        try {
          return method.apply(vnode, args || [vnode]);
        } finally {
          _vnode = null;
        }
      });
    };
    return component = {
      oninit: function(vnode) {
        var base, base1;
        this._comp = component;
        this._subs = new Map();
        this._atom = ratom(typeof (base = bind('getInitialState')) === "function" ? base(vnode) : void 0);
        if (typeof (base1 = bind('constructor')) === "function") {
          base1(vnode, [vnode, vnode.attrs]);
        }
        return void 0;
      },
      oncreate: bind('componentDidMount'),
      onupdate: bind('componentDidUpdate'),
      onremove: bind('componentWillUnmount'),
      onbeforeupdate: bind('shouldComponentUpdate') || _detectChanges,
      onbeforeremove: bind('beforeComponentUnmounts'),
      view: _rendering(spec.render || ((render) => {
        return function(vnode) {
          return asElement(render.apply(vnode, vnode.attrs.argv.slice(1)));
        };
      })(spec.reagentRender))
    };
  };

  RAtom = function(x1) {
    this.x = x1;
    this._deref = (() => {
      return this.x;
    });
    return void 0; // ._deref doesn't cause propagation
  };

  deref.when(RAtom, (self) => {
    return _propagate(_vnode, self, self._deref());
  });

  reset.when(RAtom, (self, value) => {
    if (identical(value, self.x)) {
      return value;
    } else {
      self.x = value;
      _redraw_();
      return value;
    }
  });

  /* Produces an atom which causes redraws on update */
  exports.atom = ratom = (x) => {
    return new RAtom(x);
  };

  RCursor = function(src1, path1) {
    this.src = src1;
    this.path = path1;
    this._deref = (() => {
      return this.src(this.path);
    });
    return void 0;
  };

  deref.when(RCursor, (self) => {
    return _propagate(_vnode, self, self._deref());
  });

  reset.when(RCursor, (self, value) => {
    if (identical(value, self._deref())) {
      return value;
    } else {
      self.src(self.path, value);
      _redraw_();
      return value;
    }
  });

  _cursor = (ratom) => {
    return (path, value) => { // value is optional but undefined would be replaced with fallback value anyway
      if (value === void 0) {
        return getIn(ratom._deref(), path);
      } else {
        return swap(ratom, assocIn, path, value);
      }
    };
  };

  /* Produces a cursor (sub-state atom) from a path and either a r.atom or a getter/setter function */
  exports.cursor = (src, path) => {
    return new RCursor((typeof src === 'function' ? src : _cursor(src)), path);
  };

  /* Converts a Mithril component into a Reagent component */
  exports.adaptComponent = (c) => {
    return (...args) => {
      return ['>', c, ...args];
    };
  };

  /* Merges provided class definitions into a string (definitions can be strings, lists or dicts) */
  exports.classNames = classNames = (...classes) => {
    var cls;
    cls = classes.reduce(((o, x) => {
      if (typeof x !== 'object') {
        x = `${x}`.split(' ');
      }
      return merge(o, (!isArray(x) ? x : merge(...x.map((k) => {
        return k && {
          [k]: k
        };
      }))));
    }), {});
    return (keys(cls)).filter((k) => {
      return cls[k];
    }).join(' ');
  };

  _quiet = (handler) => {
    if (typeof handler !== 'function') {
      return handler;
    } else {
      return function(event) {
        event.redraw = false;
        return handler.call(this, event);
      };
    }
  };

  _quietEvents = (attrs, o = {}) => {
    var k, v;
    for (k in attrs) {
      v = attrs[k];
      (o[k] = k.slice(0, 2) !== 'on' ? v : _quiet(v));
    }
    return o;
  };

  prepareAttrs = (tag, props) => {
    if (typeof tag !== 'string') {
      return props;
    } else {
      return ['class', 'className', 'classList'].reduce(((o, k) => {
        o[k] && (o[k] = classNames(o[k]));
        return o;
      }), _quietEvents(props));
    }
  };

  _createElement = (type, first, rest) => { // performance optimization
    var _rest, ref, ref1;
    _rest = ((ref = first[1]) != null ? (ref1 = ref.attrs) != null ? ref1.key : void 0 : void 0) != null ? rest : [rest];
    return _moveParent(_mithril_(type, prepareAttrs(type, first[0]), first[1], ..._rest));
  };

  /* Invokes Mithril directly to produce a vnode (props are optional if no children are given) */
  exports.createElement = (type, props, ...children) => {
    return _createElement(type, [props || {}], children);
  };

  /* Produces the vnode of current (most recent?) component */
  exports.currentComponent = () => {
    return _vnode;
  };

  /* Returns children of the Mithril vnode */
  exports.children = children = (vnode) => {
    return vnode.children;
  };

  /* Returns props of the Mithril vnode */
  exports.props = props = (vnode) => {
    return vnode.attrs;
  };

  /* Produces the Hiccup form of the Reagent component from vnode */
  exports.argv = argv = (vnode) => {
    return vnode.attrs.argv;
  };

  /* Returns RAtom containing state of a Reagent component (from vnode) */
  exports.stateAtom = stateAtom = (vnode) => {
    return vnode.state._atom;
  };

  /* Returns state of a Reagent component (from vnode) */
  exports.state = (vnode) => {
    return deref(stateAtom(vnode));
  };

  /* Replaces state of a Reagent component (from vnode) */
  exports.replaceState = (vnode, newState) => {
    return reset(stateAtom(vnode), newState);
  };

  /* Partially updates state of a Reagent component (from vnode) */
  exports.setState = (vnode, newState) => {
    return swap(stateAtom(vnode), merge, newState);
  };

}).call(this);

},{"./atom":10,"./util":13}],13:[function(require,module,exports){
(function() {
  var _dict, _entries, assoc, assocIn, entries, eq, eqArr, eqObj, eqObjShallow, eqShallow, flatten, getIn, identical, identity, isArray, isDict, keys, merge, replacer, sorter, type, update, vals;

  exports.identity = identity = (x) => {
    return x;
  };

  exports.type = type = (x) => {
    if (x == null) {
      return x;
    } else {
      return x.__proto__.constructor;
    }
  };

  exports.keys = keys = (x) => {
    return Object.keys(x || {});
  };

  exports.vals = vals = (x) => {
    return Object.values(x || {});
  };

  _entries = Object.entries || ((o) => {
    return keys(o).map((k) => {
      return [k, o[k]];
    });
  });

  exports.entries = entries = (o) => {
    return _entries(o || {});
  };

  _dict = Object.fromEntries || ((kvs) => {
    return merge(...kvs.map(([k, v]) => {
      return {
        [k]: v
      };
    }));
  });

  exports.dict = (x) => {
    return _dict(x || []);
  };

  exports.isArray = isArray = Array.isArray;

  exports.isDict = isDict = (x) => {
    return (type(x)) === Object;
  };

  exports.isFn = (x) => {
    return (typeof x) === 'function';
  };

  exports.merge = merge = (...os) => {
    return Object.assign({}, ...os);
  };

  exports.assoc = assoc = (o, k, v) => {
    o = isArray(o) && Number.isInteger(k) && k >= 0 ? o.slice(0) : {...o};
    o[k] = v;
    return o;
  };

  exports.dissoc = (o, ...ks) => {
    o = isArray(o) ? o.slice(0) : {...o};
    ks.forEach((k) => {
      return delete o[k];
    });
    return o;
  };

  exports.update = update = (o, k, f, ...args) => {
    return assoc(o, k, f(o != null ? o[k] : void 0, ...args));
  };

  exports.getIn = getIn = (o, path) => {
    return path.reduce(((x, k) => {
      return x != null ? x[k] : void 0;
    }), o);
  };

  exports.assocIn = assocIn = (o, path, v) => {
    if (path.length < 2) {
      return assoc(o, path[0], v);
    } else {
      return update(o, path[0], assocIn, path.slice(1), v);
    }
  };

  exports.updateIn = (o, path, f, ...args) => {
    return assocIn(o, path, f(getIn(o, path), ...args));
  };

  // dissocIn = (o, path, ...ks) => updateIn o, path, dissoc, ...ks
  exports.chunks = (xs, n) => {
    return Array.from({
      length: Math.ceil(xs.length / n)
    }, (_, i) => {
      return xs.slice(n * i, n * (i + 1));
    });
  };

  exports.flatten = flatten = (xs) => {
    if (!isArray(xs)) {
      return xs;
    } else {
      return xs.flatMap(flatten);
    }
  };

  exports.repr = (x) => {
    return JSON.stringify(x, replacer);
  };

  exports.identical = identical = (a, b) => {
    return a === b || (a !== a && b !== b);
  };

  exports.eq = eq = (a, b) => {
    return a === b || (a !== a ? b !== b : isArray(a) ? (isArray(b)) && eqArr(a, b, eq) : (isDict(a)) && (isDict(b)) && eqObj(a, b));
  };

  exports.eqShallow = eqShallow = (a, b) => {
    return a === b || (a !== a ? b !== b : isArray(a) ? (isArray(b)) && eqArr(a, b, identical) : (isDict(a)) && (isDict(b)) && eqObjShallow(a, b));
  };

  sorter = (o) => {
    return _dict((entries(o)).sort());
  };

  replacer = (_, v) => {
    if (type(v) === RegExp) {
      return `${v}`;
    } else if (!isDict(v)) {
      return v;
    } else {
      return sorter(v);
    }
  };

  eqArr = (xs, ys, eq) => {
    return xs.length === ys.length && xs.every((x, i) => {
      return eq(x, ys[i]);
    });
  };

  eqObj = (a, b, aks = keys(a), bks = new Set(keys(b))) => {
    return aks.length === bks.size && aks.every((k) => {
      return bks.has(k);
    }) && aks.every((k) => {
      return eq(a[k], b[k]);
    });
  };

  eqObjShallow = (a, b, aks = keys(a)) => {
    return aks.length === keys(b).length && aks.every((k) => {
      return k in b && identical(a[k], b[k]);
    });
  };

  exports.chain = (x, ...fs) => {
    return fs.map((f) => {
      if (isArray(f)) {
        return f;
      } else {
        return [f];
      }
    }).reduce(((x, f) => {
      return f[0](x, ...f.slice(1));
    }), x);
  };

  exports.multi = (dispatch = identity) => {
    var _default, _methods, self;
    _methods = new Map();
    _default = () => {
      throw TypeError("Invalid arguments");
    };
    return self = Object.assign(((...args) => {
      return ((_methods.get(dispatch(...args))) || _default)(...args);
    }), {
      when: (k, f) => {
        _methods.set(k, f);
        return self;
      },
      default: (f) => {
        _default = f;
        return self;
      }
    });
  };

}).call(this);

},{}],"mithril/hyperscript":[function(require,module,exports){
"use strict"

var hyperscript = require("./render/hyperscript")

hyperscript.trust = require("./render/trust")
hyperscript.fragment = require("./render/fragment")

module.exports = hyperscript

},{"./render/fragment":3,"./render/hyperscript":4,"./render/trust":7}],"mithril/mount":[function(require,module,exports){
"use strict"

module.exports = require("./mount-redraw").mount

},{"./mount-redraw":2}],"mithril/redraw":[function(require,module,exports){
"use strict"

module.exports = require("./mount-redraw").redraw

},{"./mount-redraw":2}],"mithril/render":[function(require,module,exports){
"use strict"

module.exports = require("./render/render")(typeof window !== "undefined" ? window : null)

},{"./render/render":6}],"mreframe/atom":[function(require,module,exports){
(function() {
  module.exports = require('./src/atom');

}).call(this);

},{"./src/atom":10}],"mreframe/re-frame":[function(require,module,exports){
(function() {
  var hyperscript, mount, reFrame, redraw;

  mount = require('mithril/mount');

  redraw = require('mithril/redraw');

  hyperscript = require('mithril/hyperscript');

  module.exports = reFrame = require('./src/re-frame');

  reFrame._init({redraw, hyperscript, mount});

}).call(this);

},{"./src/re-frame":11,"mithril/hyperscript":"mithril/hyperscript","mithril/mount":"mithril/mount","mithril/redraw":"mithril/redraw"}],"mreframe/reagent":[function(require,module,exports){
(function() {
  var hyperscript, mount, reagent, redraw;

  mount = require('mithril/mount');

  redraw = require('mithril/redraw');

  hyperscript = require('mithril/hyperscript');

  module.exports = reagent = require('./src/reagent');

  reagent._init({redraw, hyperscript, mount});

}).call(this);

},{"./src/reagent":12,"mithril/hyperscript":"mithril/hyperscript","mithril/mount":"mithril/mount","mithril/redraw":"mithril/redraw"}],"mreframe/util":[function(require,module,exports){
(function() {
  module.exports = require('./src/util');

}).call(this);

},{"./src/util":13}],"mreframe":[function(require,module,exports){
(function() {
  var _init, atom, exports, hyperscript, mount, reFrame, reagent, redraw, util;

  mount = require('mithril/mount');

  redraw = require('mithril/redraw');

  hyperscript = require('mithril/hyperscript');

  util = require('./util');

  atom = require('./atom');

  reagent = require('./reagent');

  ({_init} = reFrame = require('./re-frame'));

  exports = {util, atom, reagent, reFrame, _init};

  module.exports = exports; // preventing removal by tree-shaking

}).call(this);

},{"./atom":"mreframe/atom","./re-frame":"mreframe/re-frame","./reagent":"mreframe/reagent","./util":"mreframe/util","mithril/hyperscript":"mithril/hyperscript","mithril/mount":"mithril/mount","mithril/redraw":"mithril/redraw"}]},{},[]);
