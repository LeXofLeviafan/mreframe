/* THIS IS A GENERATED SCRIPT */
if (typeof window !== 'undefined')
  var exports = window;

{let _nodeEscape = (typeof window !== 'undefined' ? (s => s) : (s => s.replace(/set(Timeout|Interval)/g, s => "//"+s)));
exports.EXAMPLES = {
  simpleComponent: {
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let simpleComponent = () =>
  ['div',
    ['p', "I am a component!"],
    ['p.someclass',
      "I have ", ['strong', "bold"],
      ['span', {style: {color: 'red'}}, " and red "], "text."]];
return simpleComponent;`
    )),
    html: (
`<div>
  <p>I am a component!</p>
  <p class="someclass">
    I have <strong>bold</strong><span style="color:red"> and red </span>text.
  </p>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "p"], ['span.reserved', ">"], "I am a component!", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "p"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"someclass\""], ['span.reserved', ">"], "\n",
        "    I have ", ['span.reserved', "<"], ['span.declaration', "strong"], ['span.reserved', ">"], "bold", ['span.reserved', "</"], ['span.declaration', "strong"], ['span.reserved', ">"], ['span.reserved', "<"], ['span.declaration', "span"], " ", ['span.keyword', "style"], ['span.reserved', "="], ['span.string', "\"color:red\""], ['span.reserved', ">"], " and red ", ['span.reserved', "</"], ['span.declaration', "span"], ['span.reserved', ">"], "text.\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let simpleComponent = () =>
  ['div',
    ['p', "I am a component!"],
    ['p.someclass',
      "I have ", ['strong', "bold"],
      ['span', {style: {color: 'red'}}, " and red "], "text."]];`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.declaration', "simpleComponent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"I am a component!\""], ['span.paren.level2', "]"], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p.someclass'"], ",\n",
        "      ", ['span.string', "\"I have \""], ", ", ['span.paren.level3', "["], ['span.keyword', "'strong'"], ", ", ['span.string', "\"bold\""], ['span.paren.level3', "]"], ",\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'span'"], ", ", ['span.paren.level1', "{"], ['span.keyword', "style"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.keyword', "color"], ['span.reserved', ":"], " ", ['span.keyword', "'red'"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], ", ", ['span.string', "\" and red \""], ['span.paren.level3', "]"], ", ", ['span.string', "\"text.\""], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";"],
    coffee: (
`simpleComponent = ->
  ['div'
    ['p', "I am a component!"]
    ['p.someclass'
      "I have ", ['strong', "bold"]
      ['span', {style: {color: 'red'}}, " and red "], "text."]]`
    ),
    coffee_:
      ['<>',
        ['span.declaration', "simpleComponent"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"I am a component!\""], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p.someclass'"], "\n",
        "      ", ['span.string', "\"I have \""], ", ", ['span.paren.level3', "["], ['span.keyword', "'strong'"], ", ", ['span.string', "\"bold\""], ['span.paren.level3', "]"], "\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'span'"], ", ", ['span.paren.level1', "{"], ['span.keyword', "style"], ": ", ['span.paren.level2', "{"], ['span.keyword', "color"], ": ", ['span.keyword', "'red'"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], ", ", ['span.string', "\" and red \""], ['span.paren.level3', "]"], ", ", ['span.string', "\"text.\""], ['span.paren.level2', "]"], ['span.paren.level1', "]"]],
    wisp: (
`(defn simple-component []
  [:div
    [:p "I am a component!"]
    [:p.someclass
      "I have " [:strong "bold"]
      [:span {:style {:color :red}} " and red "] "text."]])`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "simple-component"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":div"], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":p"], " ", ['span.string', "\"I am a component!\""], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":p.someclass"], "\n",
        "      ", ['span.string', "\"I have \""], " ", ['span.paren.level1', "["], ['span.keyword', ":strong"], " ", ['span.string', "\"bold\""], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":span"], " ", ['span.paren.level2', "{"], ['span.keyword', ":style"], " ", ['span.paren.level3', "{"], ['span.keyword', ":color"], " ", ['span.keyword', ":red"], ['span.paren.level3', "}"], ['span.paren.level2', "}"], " ", ['span.string', "\" and red \""], ['span.paren.level1', "]"], " ", ['span.string', "\"text.\""], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"]],
  },
  simpleParent: {
    deps: ['simpleComponent'],
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let simpleComponent = require('examples/simpleComponent');
let simpleParent = () =>
  ['div',
    ['p', "I include simpleComponent."],
    [simpleComponent]];
return simpleParent;`
    )),
    html: (
`<div>
  <p>I include simpleComponent.</p>
  <div>
    <p>I am a component!</p>
    <p class="someclass">
      I have <strong>bold</strong><span style="color:red"> and red </span>text.
    </p>
  </div>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "p"], ['span.reserved', ">"], "I include simpleComponent.", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "p"], ['span.reserved', ">"], "I am a component!", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "p"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"someclass\""], ['span.reserved', ">"], "\n",
        "      I have ", ['span.reserved', "<"], ['span.declaration', "strong"], ['span.reserved', ">"], "bold", ['span.reserved', "</"], ['span.declaration', "strong"], ['span.reserved', ">"], ['span.reserved', "<"], ['span.declaration', "span"], " ", ['span.keyword', "style"], ['span.reserved', "="], ['span.string', "\"color:red\""], ['span.reserved', ">"], " and red ", ['span.reserved', "</"], ['span.declaration', "span"], ['span.reserved', ">"], "text.\n",
        "    ", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let simpleParent = () =>
  ['div',
    ['p', "I include simpleComponent."],
    [simpleComponent]];`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.declaration', "simpleParent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"I include simpleComponent.\""], ['span.paren.level2', "]"], ",\n",
        "    ", ['span.paren.level2', "["], "simpleComponent", ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";"],
    coffee: (
`simpleParent = ->
  ['div'
    ['p', "I include simpleComponent."]
    [simpleComponent]]`
    ),
    coffee_:
      ['<>',
        ['span.declaration', "simpleParent"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"I include simpleComponent.\""], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], "simpleComponent", ['span.paren.level2', "]"], ['span.paren.level1', "]"]],
    wisp: (
`(defn simple-parent []
  [:div
    [:p "I include simpleComponent."]
    [simple-component]])`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "simple-parent"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":div"], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":p"], " ", ['span.string', "\"I include simpleComponent.\""], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "["], "simple-component", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"]],
  },
  sayHello: {
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let helloComponent = (name) =>
  ['p', "Hello, ", name, "!"];

let sayHello = () =>
  [helloComponent, "world"];
return sayHello;`
    )),
    html: '<p>Hello, world!</p>',
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "p"], ['span.reserved', ">"], "Hello, world!", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"]],
    js: (
`let helloComponent = (name) =>
  ['p', "Hello, ", name, "!"];

let sayHello = () =>
  [helloComponent, "world"];`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.declaration', "helloComponent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "name", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"Hello, \""], ", name, ", ['span.string', "\"!\""], ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "sayHello"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], "helloComponent, ", ['span.string', "\"world\""], ['span.paren.level1', "]"], ";"],
    coffee: (
`helloComponent = (name) ->
  ['p', "Hello, ", name, "!"]

sayHello = ->
  [helloComponent, "world"]`
    ),
    coffee_:
      ['<>',
        ['span.declaration', "helloComponent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "name", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"Hello, \""], ", name, ", ['span.string', "\"!\""], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "sayHello"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], "helloComponent, ", ['span.string', "\"world\""], ['span.paren.level1', "]"]],
    wisp: (
`(defn hello-component [name]
  [:p "Hello, " name "!"])

(defn say-hello []
  [hello-component "world"])`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "hello-component"], " ", ['span.paren.level2', "["], "name", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":p"], " ", ['span.string', "\"Hello, \""], " name ", ['span.string', "\"!\""], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "say-hello"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], "hello-component ", ['span.string', "\"world\""], ['span.paren.level2', "]"], ['span.paren.level1', ")"]],
  },
  listerUser: {
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let r = require('mreframe/reagent');
let {range} = require('lodash');

let lister = (items) =>
  ['ul',
    ...items.map(item =>
      r.with({key: item}, ['li', "Item ", item]))];

let listerUser = () =>
  ['div',
    "Here is a list:",
    [lister, range(3)]];
return listerUser;`
    )),
    html: (
`<div>
  Here is a list:
  <ul>
    <li>Item 0</li>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  Here is a list:\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "ul"], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "li"], ['span.reserved', ">"], "Item 0", ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "li"], ['span.reserved', ">"], "Item 1", ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "li"], ['span.reserved', ">"], "Item 2", ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "ul"], ['span.reserved', ">"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let r = require('mreframe/reagent');
let {range} = require('lodash');

let lister = (items) =>
  ['ul',
    ...items.map(item =>
      r.with({key: item}, ['li', "Item ", item]))];

let listerUser = () =>
  ['div',
    "Here is a list:",
    [lister, range(3)]];`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " r ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe/reagent'"], ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.reserved', "range"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'lodash'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "lister"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "items", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'ul'"], ",\n",
        "    ", ['span.reserved', "..."], "items.map", ['span.paren.level2', "("], "item ", ['span.reserved', "=>"], "\n",
        "      ", ['span.reserved', "r.with"], ['span.paren.level3', "("], ['span.paren.level1', "{"], ['span.keyword', "key"], ['span.reserved', ":"], " item", ['span.paren.level1', "}"], ", ", ['span.paren.level1', "["], ['span.keyword', "'li'"], ", ", ['span.string', "\"Item \""], ", item", ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "listerUser"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], ",\n",
        "    ", ['span.string', "\"Here is a list:\""], ",\n",
        "    ", ['span.paren.level2', "["], "lister, ", ['span.reserved', "range"], ['span.paren.level3', "("], "3", ['span.paren.level3', ")"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";"],
    coffee: (
`r = require 'reagent/mithril'
{range} = require 'lodash'

lister = (items) ->
  ['ul'
    ...items.map (item) ->
      (r.with {key: item}, ['li', "Item ", item])]

listerUser = ->
  ['div'
    "Here is a list:"
    [lister, (range 3)]]`
    ),
    coffee_:
      ['<>',
        "r ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'reagent/mithril'"], "\n",
        ['span.paren.level1', "{"], ['span.reserved', "range"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'lodash'"], "\n",
        "\n",
        ['span.declaration', "lister"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "items", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'ul'"], "\n",
        "    ", ['span.reserved', "..."], "items.map ", ['span.paren.level2', "("], "item", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], "\n",
        "      ", ['span.paren.level2', "("], ['span.reserved', "r.with"], " ", ['span.paren.level3', "{"], ['span.keyword', "key"], ": item", ['span.paren.level3', "}"], ", ", ['span.paren.level3', "["], ['span.keyword', "'li'"], ", ", ['span.string', "\"Item \""], ", item", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "listerUser"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.string', "\"Here is a list:\""], "\n",
        "    ", ['span.paren.level2', "["], "lister, ", ['span.paren.level3', "("], ['span.reserved', "range"], " 3", ['span.paren.level3', ")"], ['span.paren.level2', "]"], ['span.paren.level1', "]"]],
    wisp: (
`(ns example.lister-user
    (:require [wisp.sequence :refer [into range lazy-seq empty? first rest cons]]
                                               ; lazy-sec etc are used by (for)
              [mreframe.reagent :as r]))

(defn lister [items]
  (into [:ul]
    (for [item items]
      (r/with {:key item} [:li "Item " item]))))

(defn lister-user []
  [:div
    "Here is a list:"
    [lister (range 3)]])`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.lister-user"], "\n",
        "    ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "into"], " ", ['span.reserved', "range"], " ", ['span.reserved', "lazy-seq"], " ", ['span.reserved', "empty?"], " ", ['span.reserved', "first"], " ", ['span.reserved', "rest"], " ", ['span.reserved', "cons"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "                                               ", ['span.comment', "; lazy-sec etc are used by (for)"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "lister"], " ", ['span.paren.level2', "["], "items", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "into"], " ", ['span.paren.level3', "["], ['span.keyword', ":ul"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "for"], " ", ['span.paren.level1', "["], "item items", ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "("], ['span.reserved', "r/with"], " ", ['span.paren.level2', "{"], ['span.keyword', ":key"], " item", ['span.paren.level2', "}"], " ", ['span.paren.level2', "["], ['span.keyword', ":li"], " ", ['span.string', "\"Item \""], " item", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "lister-user"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":div"], "\n",
        "    ", ['span.string', "\"Here is a list:\""], "\n",
        "    ", ['span.paren.level3', "["], "lister ", ['span.paren.level1', "("], ['span.reserved', "range"], " 3", ['span.paren.level1', ")"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"]],
  },
  countingComponent: {
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let {reagent: r, atom: {deref, swap}} = require('mreframe');

var clickCount = r.atom(0);

let countingComponent = () =>
  ['div',
    "The atom ", ['code', "clickCount"], " has value: ",
    deref(clickCount), ". ",
    ['input', {type: 'button',  value: "Click me!",
               onclick: () => swap(clickCount, n => n + 1)}]];
return countingComponent;`
    )),
    html: (
`<div>
  The atom <code>clickCount</code> has value: 0. <input type="button" value="Click me!"/>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  The atom ", ['span.reserved', "<"], ['span.declaration', "code"], ['span.reserved', ">"], "clickCount", ['span.reserved', "</"], ['span.declaration', "code"], ['span.reserved', ">"], " has value: 0. ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"button\""], " ", ['span.keyword', "value"], ['span.reserved', "="], ['span.string', "\"Click me!\""], ['span.reserved', "/>"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let {reagent: r, atom: {deref, swap}} = require('mreframe');

var clickCount = r.atom(0);

let countingComponent = () =>
  ['div',
    "The atom ", ['code', "clickCount"], " has value: ",
    deref(clickCount), ". ",
    ['input', {type: 'button',  value: "Click me!",
               onclick: () => swap(clickCount, n => n + 1)}]];`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reagent"], ['span.reserved', ":"], " r, ", ['span.keyword', "atom"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "swap"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "var"], " ", ['span.declaration', "clickCount"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level1', "("], "0", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "countingComponent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], ",\n",
        "    ", ['span.string', "\"The atom \""], ", ", ['span.paren.level2', "["], ['span.keyword', "'code'"], ", ", ['span.string', "\"clickCount\""], ['span.paren.level2', "]"], ", ", ['span.string', "\" has value: \""], ",\n",
        "    ", ['span.reserved', "deref"], ['span.paren.level2', "("], "clickCount", ['span.paren.level2', ")"], ", ", ['span.string', "\". \""], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "type"], ['span.reserved', ":"], " ", ['span.keyword', "'button'"], ",  ", ['span.keyword', "value"], ['span.reserved', ":"], " ", ['span.string', "\"Click me!\""], ",\n",
        "               ", ['span.keyword', "onclick"], ['span.reserved', ":"], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "swap"], ['span.paren.level1', "("], "clickCount, n ", ['span.reserved', "=>"], " n ", ['span.reserved', "+"], " 1", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";"],
    coffee: (
`{reagent: r, atom: {deref, swap}} = require 'mreframe'

clickCount = r.atom 0

countingComponent = ->
  ['div'
    "The atom ", ['code', "clickCount"], " has value: "
    (deref clickCount), ". "
    ['input', {type: 'button',  value: "Click me!",\\
               onclick: -> (swap clickCount, (n) -> n + 1)}]]`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reagent"], ": r, ", ['span.keyword', "atom"], ": ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "swap"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        ['span.declaration', "clickCount"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " 0\n",
        "\n",
        ['span.declaration', "countingComponent"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.string', "\"The atom \""], ", ", ['span.paren.level2', "["], ['span.keyword', "'code'"], ", ", ['span.string', "\"clickCount\""], ['span.paren.level2', "]"], ", ", ['span.string', "\" has value: \""], "\n",
        "    ", ['span.paren.level2', "("], ['span.reserved', "deref"], " clickCount", ['span.paren.level2', ")"], ", ", ['span.string', "\". \""], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "type"], ": ", ['span.keyword', "'button'"], ",  ", ['span.keyword', "value"], ": ", ['span.string', "\"Click me!\""], ",\\\n",
        "               ", ['span.keyword', "onclick"], ": ", ['span.reserved', "->"], " ", ['span.paren.level1', "("], ['span.reserved', "swap"], " clickCount, ", ['span.paren.level2', "("], "n", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " n ", ['span.reserved', "+"], " 1", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"]],
    wisp: (
`(ns example.counting-component
    (:require [wisp.runtime :refer [inc]]
              [mreframe.atom :refer [deref swap!]]
              [mreframe.reagent :as r]))

(def click-count (r/atom 0))

(defn counting-component []
  [:div
    "The atom " [:code "clickCount"] " has value: "
    @click-count ". "
    [:input {:type :button,  :value "Click me!"
             :onclick #(swap! click-count inc)}]])`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.counting-component"], "\n",
        "    ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "inc"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.atom ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "deref"], " ", ['span.reserved', "swap!"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "click-count"], " ", ['span.paren.level2', "("], ['span.reserved', "r/atom"], " 0", ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "counting-component"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":div"], "\n",
        "    ", ['span.string', "\"The atom \""], " ", ['span.paren.level3', "["], ['span.keyword', ":code"], " ", ['span.string', "\"clickCount\""], ['span.paren.level3', "]"], " ", ['span.string', "\" has value: \""], "\n",
        "    ", ['span.reserved', "@"], "click-count ", ['span.string', "\". \""], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":input"], " ", ['span.paren.level1', "{"], ['span.keyword', ":type"], " ", ['span.keyword', ":button,"], "  ", ['span.keyword', ":value"], " ", ['span.string', "\"Click me!\""], "\n",
        "             ", ['span.keyword', ":onclick"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.reserved', "swap!"], " click-count ", ['span.reserved', "inc"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"]],
  },
  timerComponent: {
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let {reagent: r, atom: {deref, swap}} = require('mreframe');

let timerComponent = () => {
  let secondsElapsed = r.atom(0);
  return () => {
    setTimeout(() => swap(secondsElapsed, n => n + 1), 1000);
    return ['div', "Seconds Elapsed: ", deref(secondsElapsed)];
  };
};
return timerComponent;`
    )),
    html: (
`<div>
  Seconds Elapsed: 0
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  Seconds Elapsed: 0\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let {reagent: r, atom: {deref, swap}} = require('mreframe');

let timerComponent = () => {
  let secondsElapsed = r.atom(0);
  return () => {
    setTimeout(() => swap(secondsElapsed, n => n + 1), 1000);
    return ['div', "Seconds Elapsed: ", deref(secondsElapsed)];
  };
};`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reagent"], ['span.reserved', ":"], " r, ", ['span.keyword', "atom"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "swap"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "timerComponent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " secondsElapsed ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level2', "("], "0", ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "return"], " ", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "{"], "\n",
        "    ", ['span.reserved', "setTimeout"], ['span.paren.level3', "("], ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "swap"], ['span.paren.level1', "("], "secondsElapsed, n ", ['span.reserved', "=>"], " n ", ['span.reserved', "+"], " 1", ['span.paren.level1', ")"], ", 1000", ['span.paren.level3', ")"], ";\n",
        "    ", ['span.reserved', "return"], " ", ['span.paren.level3', "["], ['span.keyword', "'div'"], ", ", ['span.string', "\"Seconds Elapsed: \""], ", ", ['span.reserved', "deref"], ['span.paren.level1', "("], "secondsElapsed", ['span.paren.level1', ")"], ['span.paren.level3', "]"], ";\n",
        "  ", ['span.paren.level2', "}"], ";\n",
        ['span.paren.level1', "}"], ";"],
    coffee: (
`{reagent: r, atom: {deref, swap}} = require 'mreframe'

timerComponent = ->
  secondsElapsed = r.atom 0
  ->
    setTimeout (-> (swap secondsElapsed, (n) -> n + 1)), 1000
    ['div', "Seconds Elapsed: ", (deref secondsElapsed)]`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reagent"], ": r, ", ['span.keyword', "atom"], ": ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "swap"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        ['span.declaration', "timerComponent"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  secondsElapsed ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " 0\n",
        "  ", ['span.reserved', "->"], "\n",
        "    ", ['span.reserved', "setTimeout"], " ", ['span.paren.level1', "("], ['span.reserved', "->"], " ", ['span.paren.level2', "("], ['span.reserved', "swap"], " secondsElapsed, ", ['span.paren.level3', "("], "n", ['span.paren.level3', ")"], " ", ['span.reserved', "->"], " n ", ['span.reserved', "+"], " 1", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ", 1000\n",
        "    ", ['span.paren.level1', "["], ['span.keyword', "'div'"], ", ", ['span.string', "\"Seconds Elapsed: \""], ", ", ['span.paren.level2', "("], ['span.reserved', "deref"], " secondsElapsed", ['span.paren.level2', ")"], ['span.paren.level1', "]"]],
    wisp: (
`(ns example.timer-component
    (:require [wisp.runtime :refer [inc]]
              [mreframe.atom :refer [deref swap!]]
              [mreframe.reagent :as r]))

(defn timer-component []
  (let [seconds-elapsed (r/atom 0)]
    (fn []
      (set-timeout! #(swap! seconds-elapsed inc) 1000)
      [:div "Seconds Elapsed: " @seconds-elapsed])))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.timer-component"], "\n",
        "    ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "inc"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.atom ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "deref"], " ", ['span.reserved', "swap!"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "timer-component"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "seconds-elapsed ", ['span.paren.level1', "("], ['span.reserved', "r/atom"], " 0", ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "fn"], " ", ['span.paren.level1', "["], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "("], ['span.reserved', "set-timeout!"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.reserved', "swap!"], " seconds-elapsed ", ['span.reserved', "inc"], ['span.paren.level2', ")"], " 1000", ['span.paren.level1', ")"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":div"], " ", ['span.string', "\"Seconds Elapsed: \""], " ", ['span.reserved', "@"], "seconds-elapsed", ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"]],
  },
  sharedState: {
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let {reagent: r, atom: {deref, reset}} = require('mreframe');

let atomInput = (value) =>
  ['input', {type: 'text',  value: deref(value),
             oninput: evt => reset(value, evt.target.value)}];

let sharedState = () => {
  let val = r.atom("foo");
  return () =>
    ['div',
      ['p', "The value is now: ", deref(val)],
      ['p', "Change it here: ", [atomInput, val]]];
};
return sharedState;`
    )),
    html: (
`<div>
  <p>The value is now: foo</p>
  <p>Change it here: <input type="text" value="foo"/></p>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "p"], ['span.reserved', ">"], "The value is now: foo", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "p"], ['span.reserved', ">"], "Change it here: ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"text\""], " ", ['span.keyword', "value"], ['span.reserved', "="], ['span.string', "\"foo\""], ['span.reserved', "/>"], ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let {reagent: r, atom: {deref, reset}} = require('mreframe');

let atomInput = (value) =>
  ['input', {type: 'text',  value: deref(value),
             oninput: evt => reset(value, evt.target.value)}];

let sharedState = () => {
  let val = r.atom("foo");
  return () =>
    ['div',
      ['p', "The value is now: ", deref(val)],
      ['p', "Change it here: ", [atomInput, val]]];
};`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reagent"], ['span.reserved', ":"], " r, ", ['span.keyword', "atom"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "reset"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "atomInput"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "value", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "type"], ['span.reserved', ":"], " ", ['span.keyword', "'text'"], ",  ", ['span.keyword', "value"], ['span.reserved', ":"], " ", ['span.reserved', "deref"], ['span.paren.level3', "("], "value", ['span.paren.level3', ")"], ",\n",
        "             ", ['span.keyword', "oninput"], ['span.reserved', ":"], " evt ", ['span.reserved', "=>"], " ", ['span.reserved', "reset"], ['span.paren.level3', "("], "value, evt.target.value", ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "sharedState"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " val ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level2', "("], ['span.string', "\"foo\""], ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "return"], " ", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'div'"], ",\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"The value is now: \""], ", ", ['span.reserved', "deref"], ['span.paren.level1', "("], "val", ['span.paren.level1', ")"], ['span.paren.level3', "]"], ",\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"Change it here: \""], ", ", ['span.paren.level1', "["], "atomInput, val", ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ";\n",
        ['span.paren.level1', "}"], ";"],
    coffee: (
`{reagent: r, atom: {deref, reset}} = require 'mreframe'

atomInput = (value) ->
  ['input', {type: 'text',  value: (deref value),\\
             oninput: (evt) -> (reset value, evt.target.value)}]

sharedState = ->
  val = r.atom "foo"
  ->
    ['div'
      ['p', "The value is now: ", (deref val)]
      ['p', "Change it here: ", [atomInput, val]]]`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reagent"], ": r, ", ['span.keyword', "atom"], ": ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "reset"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        ['span.declaration', "atomInput"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "value", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "type"], ": ", ['span.keyword', "'text'"], ",  ", ['span.keyword', "value"], ": ", ['span.paren.level3', "("], ['span.reserved', "deref"], " value", ['span.paren.level3', ")"], ",\\\n",
        "             ", ['span.keyword', "oninput"], ": ", ['span.paren.level3', "("], "evt", ['span.paren.level3', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level3', "("], ['span.reserved', "reset"], " value, evt.target.value", ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "sharedState"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  val ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " ", ['span.string', "\"foo\""], "\n",
        "  ", ['span.reserved', "->"], "\n",
        "    ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "      ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"The value is now: \""], ", ", ['span.paren.level3', "("], ['span.reserved', "deref"], " val", ['span.paren.level3', ")"], ['span.paren.level2', "]"], "\n",
        "      ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"Change it here: \""], ", ", ['span.paren.level3', "["], "atomInput, val", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', "]"]],
    wisp: (
`(ns example.shared-state
    (:require [mreframe.atom :refer [deref reset!]]
              [mreframe.reagent :as r]))

(defn atom-input [value]
  [:input {:type :text,  :value @value,
           :oninput #(reset! value (-> % :target :value))}])

(defn shared-state []
  (let [val (r/atom "foo")]
    (fn []
      [:div
        [:p "The value is now: " @val]
        [:p "Change it here: " [atom-input val]]])))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.shared-state"], "\n",
        "    ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "mreframe.atom ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "deref"], " ", ['span.reserved', "reset!"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "atom-input"], " ", ['span.paren.level2', "["], "value", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":input"], " ", ['span.paren.level3', "{"], ['span.keyword', ":type"], " ", ['span.keyword', ":text,"], "  ", ['span.keyword', ":value"], " ", ['span.reserved', "@"], "value,\n",
        "           ", ['span.keyword', ":oninput"], " ", ['span.reserved', "#"], ['span.paren.level1', "("], ['span.reserved', "reset!"], " value ", ['span.paren.level2', "("], ['span.reserved', "->"], " ", ['span.reserved', "%"], " ", ['span.keyword', ":target"], " ", ['span.keyword', ":value"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "shared-state"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "val ", ['span.paren.level1', "("], ['span.reserved', "r/atom"], " ", ['span.string', "\"foo\""], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "fn"], " ", ['span.paren.level1', "["], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":div"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":p"], " ", ['span.string', "\"The value is now: \""], " ", ['span.reserved', "@"], "val", ['span.paren.level2', "]"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":p"], " ", ['span.string', "\"Change it here: \""], " ", ['span.paren.level3', "["], "atom-input val", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"]],
  },
  _render: {
    className: 'simple',
    html: (
`<div>
  <p>I am a component!</p>
  <p class="someclass">
    I have <strong>bold</strong><span style="color:red"> and red </span>text.
  </p>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "p"], ['span.reserved', ">"], "I am a component!", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "p"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"someclass\""], ['span.reserved', ">"], "\n",
        "    I have ", ['span.reserved', "<"], ['span.declaration', "strong"], ['span.reserved', ">"], "bold", ['span.reserved', "</"], ['span.declaration', "strong"], ['span.reserved', ">"], ['span.reserved', "<"], ['span.declaration', "span"], " ", ['span.keyword', "style"], ['span.reserved', "="], ['span.string', "\"color:red\""], ['span.reserved', ">"], " and red ", ['span.reserved', "</"], ['span.declaration', "span"], ['span.reserved', ">"], "text.\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let r = require('mreframe/reagent');

let simpleComponent = () =>
  ['div',
    ['p', "I am a component!"],
    ['p.someclass',
      "I have ", ['strong', "bold"],
      ['span', {style: {color: 'red'}}, " and red "], "text."]];

r.render([simpleComponent], document.body);`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " r ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe/reagent'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "simpleComponent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"I am a component!\""], ['span.paren.level2', "]"], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p.someclass'"], ",\n",
        "      ", ['span.string', "\"I have \""], ", ", ['span.paren.level3', "["], ['span.keyword', "'strong'"], ", ", ['span.string', "\"bold\""], ['span.paren.level3', "]"], ",\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'span'"], ", ", ['span.paren.level1', "{"], ['span.keyword', "style"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.keyword', "color"], ['span.reserved', ":"], " ", ['span.keyword', "'red'"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], ", ", ['span.string', "\" and red \""], ['span.paren.level3', "]"], ", ", ['span.string', "\"text.\""], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.reserved', "r.render"], ['span.paren.level1', "("], ['span.paren.level2', "["], "simpleComponent", ['span.paren.level2', "]"], ", ", ['span.reserved', "document.body"], ['span.paren.level1', ")"], ";"],
    coffee: (
`r = require 'mreframe/reagent'

simpleComponent = ->
  ['div'
    ['p', "I am a component!"]
    ['p.someclass'
      "I have ", ['strong', "bold"]
      ['span', {style: {color: 'red'}}, " and red "], "text."]]

r.render [simpleComponent], document.body`
    ),
    coffee_:
      ['<>',
        "r ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe/reagent'"], "\n",
        "\n",
        ['span.declaration', "simpleComponent"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"I am a component!\""], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'p.someclass'"], "\n",
        "      ", ['span.string', "\"I have \""], ", ", ['span.paren.level3', "["], ['span.keyword', "'strong'"], ", ", ['span.string', "\"bold\""], ['span.paren.level3', "]"], "\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'span'"], ", ", ['span.paren.level1', "{"], ['span.keyword', "style"], ": ", ['span.paren.level2', "{"], ['span.keyword', "color"], ": ", ['span.keyword', "'red'"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], ", ", ['span.string', "\" and red \""], ['span.paren.level3', "]"], ", ", ['span.string', "\"text.\""], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.reserved', "r.render"], " ", ['span.paren.level1', "["], "simpleComponent", ['span.paren.level1', "]"], ", ", ['span.reserved', "document.body"]],
    wisp: (
`(ns example.simple-component
  (:require [mreframe.reagent :as r]))

(defn simple-component []
  [:div
    [:p "I am a component!"]
    [:p.someclass
      "I have " [:strong "bold"]
      [:span {:style {:color :red}} " and red "] "text."]])

(r/render [simple-component] document.body)`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.simple-component"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "simple-component"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":div"], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":p"], " ", ['span.string', "\"I am a component!\""], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":p.someclass"], "\n",
        "      ", ['span.string', "\"I have \""], " ", ['span.paren.level1', "["], ['span.keyword', ":strong"], " ", ['span.string', "\"bold\""], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":span"], " ", ['span.paren.level2', "{"], ['span.keyword', ":style"], " ", ['span.paren.level3', "{"], ['span.keyword', ":color"], " ", ['span.keyword', ":red"], ['span.paren.level3', "}"], ['span.paren.level2', "}"], " ", ['span.string', "\" and red \""], ['span.paren.level1', "]"], " ", ['span.string', "\"text.\""], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "r/render"], " ", ['span.paren.level2', "["], "simple-component", ['span.paren.level2', "]"], " ", ['span.reserved', "document.body"], ['span.paren.level1', ")"]],
  },
  bmiComponent: {
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let r = require('mreframe/reagent');
let {deref, swap} = require('mreframe/atom');
let {merge, assoc, dissoc, chain} = require('mreframe/util');

let calcBmi = data => {
  let {height, weight, bmi} = data;
  let h = height / 100;
  return merge(data, (bmi ? {weight: bmi * h * h} : {bmi: weight / (h * h)}));
};

var bmiData = r.atom( calcBmi({height: 180, weight: 80}) );

let slider = (param, value, min, max, invalidates) =>
  ['input', {type: 'range', min, max, value,  // order matters :-(
             style: {width: "100%"},
             oninput: e => {
               let newValue = parseInt(e.target.value);
               swap(bmiData, data => chain(data,
                                           [assoc, param, newValue],
                                           [dissoc, invalidates],
                                           calcBmi));
             }}];

let bmiComponent = () => {
  let {weight, height, bmi} = deref(bmiData);
  let [color, diagnose] = (bmi < 18.5 ? ['orange', "underweight"] :
                           bmi < 25   ? ['inherit', "normal"]     :
                           bmi < 30   ? ['orange', "overweight"]  :
                           ['red', "obese"]);
  return ['div',
           ['h3', "BMI calculator"],
           ['div',
             "Height: ", Math.floor(height), "cm",
             [slider, 'height', height, 100, 220, 'bmi']],
           ['div',
             "Weight: ", Math.floor(weight), "kg",
             [slider, 'weight', weight, 30, 150, 'bmi']],
           ['div',
             "BMI: ", Math.floor(bmi), " ",
             ['span', {style: {color}}, diagnose],
             [slider, 'bmi', bmi, 10, 50, 'weight']]];
};
return bmiComponent;`
    )),
    html: (
`<div>
  <h3>BMI calculator</h3>
  <div>
    Height: 180cm
    <input type="range" min="100" max="220" value="180" style="width:100%"/>
  </div>
  <div>
    Weight: 80kg
    <input type="range" min="30" max="150" value="80" style="width:100%"/>
  </div>
  <div>
    BMI: 24 <span style="color:inherit">normal</span>
    <input type="range" min="10" max="50" value="24.691358024691358" style="width:100%"/>
  </div>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "h3"], ['span.reserved', ">"], "BMI calculator", ['span.reserved', "</"], ['span.declaration', "h3"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "    Height: 180cm\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"range\""], " ", ['span.keyword', "min"], ['span.reserved', "="], ['span.string', "\"100\""], " ", ['span.keyword', "max"], ['span.reserved', "="], ['span.string', "\"220\""], " ", ['span.keyword', "value"], ['span.reserved', "="], ['span.string', "\"180\""], " ", ['span.keyword', "style"], ['span.reserved', "="], ['span.string', "\"width:100%\""], ['span.reserved', "/>"], "\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "    Weight: 80kg\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"range\""], " ", ['span.keyword', "min"], ['span.reserved', "="], ['span.string', "\"30\""], " ", ['span.keyword', "max"], ['span.reserved', "="], ['span.string', "\"150\""], " ", ['span.keyword', "value"], ['span.reserved', "="], ['span.string', "\"80\""], " ", ['span.keyword', "style"], ['span.reserved', "="], ['span.string', "\"width:100%\""], ['span.reserved', "/>"], "\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "    BMI: 24 ", ['span.reserved', "<"], ['span.declaration', "span"], " ", ['span.keyword', "style"], ['span.reserved', "="], ['span.string', "\"color:inherit\""], ['span.reserved', ">"], "normal", ['span.reserved', "</"], ['span.declaration', "span"], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"range\""], " ", ['span.keyword', "min"], ['span.reserved', "="], ['span.string', "\"10\""], " ", ['span.keyword', "max"], ['span.reserved', "="], ['span.string', "\"50\""], " ", ['span.keyword', "value"], ['span.reserved', "="], ['span.string', "\"24.691358024691358\""], " ", ['span.keyword', "style"], ['span.reserved', "="], ['span.string', "\"width:100%\""], ['span.reserved', "/>"], "\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let r = require('mreframe/reagent');
let {deref, swap} = require('mreframe/atom');
let {merge, assoc, dissoc, chain} = require('mreframe/util');

let calcBmi = data => {
  let {height, weight, bmi} = data;
  let h = height / 100;
  return merge(data, (bmi ? {weight: bmi * h * h} : {bmi: weight / (h * h)}));
};

var bmiData = r.atom( calcBmi({height: 180, weight: 80}) );

let slider = (param, value, min, max, invalidates) =>
  ['input', {type: 'range', min, max, value,  // order matters :-(
             style: {width: "100%"},
             oninput: e => {
               let newValue = parseInt(e.target.value);
               swap(bmiData, data => chain(data,
                                           [assoc, param, newValue],
                                           [dissoc, invalidates],
                                           calcBmi));
             }}];

let bmiComponent = () => {
  let {weight, height, bmi} = deref(bmiData);
  let [color, diagnose] = (bmi < 18.5 ? ['orange', "underweight"] :
                           bmi < 25   ? ['inherit', "normal"]     :
                           bmi < 30   ? ['orange', "overweight"]  :
                           ['red', "obese"]);
  return ['div',
           ['h3', "BMI calculator"],
           ['div',
             "Height: ", Math.floor(height), "cm",
             [slider, 'height', height, 100, 220, 'bmi']],
           ['div',
             "Weight: ", Math.floor(weight), "kg",
             [slider, 'weight', weight, 30, 150, 'bmi']],
           ['div',
             "BMI: ", Math.floor(bmi), " ",
             ['span', {style: {color}}, diagnose],
             [slider, 'bmi', bmi, 10, 50, 'weight']]];
};`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " r ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe/reagent'"], ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "swap"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe/atom'"], ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.reserved', "merge"], ", ", ['span.reserved', "assoc"], ", ", ['span.reserved', "dissoc"], ", ", ['span.reserved', "chain"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe/util'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "calcBmi"], " ", ['span.reserved', "="], " data ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " ", ['span.paren.level2', "{"], "height, weight, bmi", ['span.paren.level2', "}"], " ", ['span.reserved', "="], " data;\n",
        "  ", ['span.reserved', "let"], " h ", ['span.reserved', "="], " height ", ['span.reserved', "/"], " 100;\n",
        "  ", ['span.reserved', "return"], " ", ['span.reserved', "merge"], ['span.paren.level2', "("], "data, ", ['span.paren.level3', "("], "bmi ", ['span.reserved', "?"], " ", ['span.paren.level1', "{"], ['span.keyword', "weight"], ['span.reserved', ":"], " bmi ", ['span.reserved', "*"], " h ", ['span.reserved', "*"], " h", ['span.paren.level1', "}"], " ", ['span.reserved', ":"], " ", ['span.paren.level1', "{"], ['span.keyword', "bmi"], ['span.reserved', ":"], " weight ", ['span.reserved', "/"], " ", ['span.paren.level2', "("], "h ", ['span.reserved', "*"], " h", ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ";\n",
        ['span.paren.level1', "}"], ";\n",
        "\n",
        ['span.reserved', "var"], " ", ['span.declaration', "bmiData"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level1', "("], " calcBmi", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "height"], ['span.reserved', ":"], " 180, ", ['span.keyword', "weight"], ['span.reserved', ":"], " 80", ['span.paren.level3', "}"], ['span.paren.level2', ")"], " ", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "slider"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "param, value, min, max, invalidates", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "type"], ['span.reserved', ":"], " ", ['span.keyword', "'range'"], ", min, max, value,  ", ['span.comment', "// order matters :-("], "\n",
        "             ", ['span.keyword', "style"], ['span.reserved', ":"], " ", ['span.paren.level3', "{"], ['span.keyword', "width"], ['span.reserved', ":"], " ", ['span.string', "\"100%\""], ['span.paren.level3', "}"], ",\n",
        "             ", ['span.keyword', "oninput"], ['span.reserved', ":"], " e ", ['span.reserved', "=>"], " ", ['span.paren.level3', "{"], "\n",
        "               ", ['span.reserved', "let"], " newValue ", ['span.reserved', "="], " ", ['span.reserved', "parseInt"], ['span.paren.level1', "("], "e.target.value", ['span.paren.level1', ")"], ";\n",
        "               ", ['span.reserved', "swap"], ['span.paren.level1', "("], "bmiData, data ", ['span.reserved', "=>"], " ", ['span.reserved', "chain"], ['span.paren.level2', "("], "data,\n",
        "                                           ", ['span.paren.level3', "["], ['span.reserved', "assoc"], ", param, newValue", ['span.paren.level3', "]"], ",\n",
        "                                           ", ['span.paren.level3', "["], ['span.reserved', "dissoc"], ", invalidates", ['span.paren.level3', "]"], ",\n",
        "                                           calcBmi", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "             ", ['span.paren.level3', "}"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "bmiComponent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " ", ['span.paren.level2', "{"], "weight, height, bmi", ['span.paren.level2', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "deref"], ['span.paren.level2', "("], "bmiData", ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "let"], " ", ['span.paren.level2', "["], "color, diagnose", ['span.paren.level2', "]"], " ", ['span.reserved', "="], " ", ['span.paren.level2', "("], "bmi ", ['span.reserved', "<"], " 18.5 ", ['span.reserved', "?"], " ", ['span.paren.level3', "["], ['span.keyword', "'orange'"], ", ", ['span.string', "\"underweight\""], ['span.paren.level3', "]"], " ", ['span.reserved', ":"], "\n",
        "                           bmi ", ['span.reserved', "<"], " 25   ", ['span.reserved', "?"], " ", ['span.paren.level3', "["], ['span.keyword', "'inherit'"], ", ", ['span.string', "\"normal\""], ['span.paren.level3', "]"], "     ", ['span.reserved', ":"], "\n",
        "                           bmi ", ['span.reserved', "<"], " 30   ", ['span.reserved', "?"], " ", ['span.paren.level3', "["], ['span.keyword', "'orange'"], ", ", ['span.string', "\"overweight\""], ['span.paren.level3', "]"], "  ", ['span.reserved', ":"], "\n",
        "                           ", ['span.paren.level3', "["], ['span.keyword', "'red'"], ", ", ['span.string', "\"obese\""], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "return"], " ", ['span.paren.level2', "["], ['span.keyword', "'div'"], ",\n",
        "           ", ['span.paren.level3', "["], ['span.keyword', "'h3'"], ", ", ['span.string', "\"BMI calculator\""], ['span.paren.level3', "]"], ",\n",
        "           ", ['span.paren.level3', "["], ['span.keyword', "'div'"], ",\n",
        "             ", ['span.string', "\"Height: \""], ", ", ['span.reserved', "Math.floor"], ['span.paren.level1', "("], "height", ['span.paren.level1', ")"], ", ", ['span.string', "\"cm\""], ",\n",
        "             ", ['span.paren.level1', "["], "slider, ", ['span.keyword', "'height'"], ", height, 100, 220, ", ['span.keyword', "'bmi'"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ",\n",
        "           ", ['span.paren.level3', "["], ['span.keyword', "'div'"], ",\n",
        "             ", ['span.string', "\"Weight: \""], ", ", ['span.reserved', "Math.floor"], ['span.paren.level1', "("], "weight", ['span.paren.level1', ")"], ", ", ['span.string', "\"kg\""], ",\n",
        "             ", ['span.paren.level1', "["], "slider, ", ['span.keyword', "'weight'"], ", weight, 30, 150, ", ['span.keyword', "'bmi'"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ",\n",
        "           ", ['span.paren.level3', "["], ['span.keyword', "'div'"], ",\n",
        "             ", ['span.string', "\"BMI: \""], ", ", ['span.reserved', "Math.floor"], ['span.paren.level1', "("], "bmi", ['span.paren.level1', ")"], ", ", ['span.string', "\" \""], ",\n",
        "             ", ['span.paren.level1', "["], ['span.keyword', "'span'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "style"], ['span.reserved', ":"], " ", ['span.paren.level3', "{"], "color", ['span.paren.level3', "}"], ['span.paren.level2', "}"], ", diagnose", ['span.paren.level1', "]"], ",\n",
        "             ", ['span.paren.level1', "["], "slider, ", ['span.keyword', "'bmi'"], ", bmi, 10, 50, ", ['span.keyword', "'weight'"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ";\n",
        ['span.paren.level1', "}"], ";"],
    coffee: (
`r = require 'mreframe/reagent'
{deref, swap} = require 'mreframe/atom'
{merge, assoc, dissoc, chain} = require 'mreframe/util'

calcBmi = (data) ->
  {height, weight, bmi} = data
  h = height / 100
  merge data, (if bmi  then weight: bmi * h * h  else bmi: weight / (h * h))

bmiData = r.atom (calcBmi height: 180, weight: 80)

slider = (param, value, min, max, invalidates) ->
  ['input', {type: 'range', min, max, value,\\  # order matters :-(
             style: {width: "100%"},\\
             oninput: (e) ->
               newValue = parseInt e.target.value
               swap bmiData, (data) -> (chain data,
                                              [assoc, param, newValue]
                                              [dissoc, invalidates]
                                              calcBmi)}]

bmiComponent = ->
  {weight, height, bmi} = deref bmiData
  [color, diagnose] = switch
    when bmi < 18.5  then ['orange', "underweight"]
    when bmi < 25    then ['inherit', "normal"]
    when bmi < 30    then ['orange', "overweight"]
    else ['red', "obese"]
  ['div'
    ['h3', "BMI calculator"]
    ['div'
      "Height: ", (Math.floor height), "cm"
      [slider, 'height', height, 100, 220, 'bmi']]
    ['div'
      "Weight: ", (Math.floor weight), "kg"
      [slider, 'weight', weight, 30, 150, 'bmi']]
    ['div'
      "BMI: ", (Math.floor bmi), " "
      ['span', {style: {color}}, diagnose]
      [slider, 'bmi', bmi, 10, 50, 'weight']]]`
    ),
    coffee_:
      ['<>',
        "r ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe/reagent'"], "\n",
        ['span.paren.level1', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "swap"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe/atom'"], "\n",
        ['span.paren.level1', "{"], ['span.reserved', "merge"], ", ", ['span.reserved', "assoc"], ", ", ['span.reserved', "dissoc"], ", ", ['span.reserved', "chain"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe/util'"], "\n",
        "\n",
        ['span.declaration', "calcBmi"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "data", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "{"], "height, weight, bmi", ['span.paren.level1', "}"], " ", ['span.reserved', "="], " data\n",
        "  h ", ['span.reserved', "="], " height ", ['span.reserved', "/"], " 100\n",
        "  ", ['span.reserved', "merge"], " data, ", ['span.paren.level1', "("], ['span.reserved', "if"], " bmi  ", ['span.reserved', "then"], " ", ['span.keyword', "weight"], ": bmi ", ['span.reserved', "*"], " h ", ['span.reserved', "*"], " h  ", ['span.reserved', "else"], " ", ['span.keyword', "bmi"], ": weight ", ['span.reserved', "/"], " ", ['span.paren.level2', "("], "h ", ['span.reserved', "*"], " h", ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.declaration', "bmiData"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " ", ['span.paren.level1', "("], "calcBmi ", ['span.keyword', "height"], ": 180, ", ['span.keyword', "weight"], ": 80", ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.declaration', "slider"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "param, value, min, max, invalidates", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "type"], ": ", ['span.keyword', "'range'"], ", min, max, value,\\  ", ['span.comment', "# order matters :-("], "\n",
        "             ", ['span.keyword', "style"], ": ", ['span.paren.level3', "{"], ['span.keyword', "width"], ": ", ['span.string', "\"100%\""], ['span.paren.level3', "}"], ",\\\n",
        "             ", ['span.keyword', "oninput"], ": ", ['span.paren.level3', "("], "e", ['span.paren.level3', ")"], " ", ['span.reserved', "->"], "\n",
        "               newValue ", ['span.reserved', "="], " ", ['span.reserved', "parseInt"], " e.target.value\n",
        "               ", ['span.reserved', "swap"], " bmiData, ", ['span.paren.level3', "("], "data", ['span.paren.level3', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level3', "("], ['span.reserved', "chain"], " data,\n",
        "                                              ", ['span.paren.level1', "["], ['span.reserved', "assoc"], ", param, newValue", ['span.paren.level1', "]"], "\n",
        "                                              ", ['span.paren.level1', "["], ['span.reserved', "dissoc"], ", invalidates", ['span.paren.level1', "]"], "\n",
        "                                              calcBmi", ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "bmiComponent"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "{"], "weight, height, bmi", ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "deref"], " bmiData\n",
        "  ", ['span.paren.level1', "["], "color, diagnose", ['span.paren.level1', "]"], " ", ['span.reserved', "="], " ", ['span.reserved', "switch"], "\n",
        "    ", ['span.reserved', "when"], " bmi ", ['span.reserved', "<"], " 18.5  ", ['span.reserved', "then"], " ", ['span.paren.level1', "["], ['span.keyword', "'orange'"], ", ", ['span.string', "\"underweight\""], ['span.paren.level1', "]"], "\n",
        "    ", ['span.reserved', "when"], " bmi ", ['span.reserved', "<"], " 25    ", ['span.reserved', "then"], " ", ['span.paren.level1', "["], ['span.keyword', "'inherit'"], ", ", ['span.string', "\"normal\""], ['span.paren.level1', "]"], "\n",
        "    ", ['span.reserved', "when"], " bmi ", ['span.reserved', "<"], " 30    ", ['span.reserved', "then"], " ", ['span.paren.level1', "["], ['span.keyword', "'orange'"], ", ", ['span.string', "\"overweight\""], ['span.paren.level1', "]"], "\n",
        "    ", ['span.reserved', "else"], " ", ['span.paren.level1', "["], ['span.keyword', "'red'"], ", ", ['span.string', "\"obese\""], ['span.paren.level1', "]"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'h3'"], ", ", ['span.string', "\"BMI calculator\""], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'div'"], "\n",
        "      ", ['span.string', "\"Height: \""], ", ", ['span.paren.level3', "("], ['span.reserved', "Math.floor"], " height", ['span.paren.level3', ")"], ", ", ['span.string', "\"cm\""], "\n",
        "      ", ['span.paren.level3', "["], "slider, ", ['span.keyword', "'height'"], ", height, 100, 220, ", ['span.keyword', "'bmi'"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'div'"], "\n",
        "      ", ['span.string', "\"Weight: \""], ", ", ['span.paren.level3', "("], ['span.reserved', "Math.floor"], " weight", ['span.paren.level3', ")"], ", ", ['span.string', "\"kg\""], "\n",
        "      ", ['span.paren.level3', "["], "slider, ", ['span.keyword', "'weight'"], ", weight, 30, 150, ", ['span.keyword', "'bmi'"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'div'"], "\n",
        "      ", ['span.string', "\"BMI: \""], ", ", ['span.paren.level3', "("], ['span.reserved', "Math.floor"], " bmi", ['span.paren.level3', ")"], ", ", ['span.string', "\" \""], "\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'span'"], ", ", ['span.paren.level1', "{"], ['span.keyword', "style"], ": ", ['span.paren.level2', "{"], "color", ['span.paren.level2', "}"], ['span.paren.level1', "}"], ", diagnose", ['span.paren.level3', "]"], "\n",
        "      ", ['span.paren.level3', "["], "slider, ", ['span.keyword', "'bmi'"], ", bmi, 10, 50, ", ['span.keyword', "'weight'"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', "]"]],
    wisp: (
`(ns example.bmi-component
    (:require [wisp.runtime :refer [int merge dictionary? dictionary]]
              [wisp.sequence :refer [assoc dissoc nth]]
              [mreframe.atom :refer [deref swap!]]
              [mreframe.reagent :as r]))

(defn calc-bmi [{:keys [height weight bmi], :as data}]
  (let [h (/ height 100)]
    (merge data (if bmi {:weight (* bmi h h)} {:bmi (/ weight (* h h))}))))

(def bmi-data (r/atom (calc-bmi {:height 180, :weight 80})))

(defn slider [param value min max invalidates]
  [:input {:type :range, :min min, :max max, :value value  ; order matters :-(
           :style {:width "100%"}
           :oninput (fn [e]
                      (let [new-value (parse-int e.target.value)]
                        (swap! bmi-data #(-> %
                                             (assoc param new-value)
                                             (dissoc invalidates)
                                             calc-bmi))))}])

(defn bmi-component []
  (let [{:keys [weight, height, bmi]} @bmi-data
        [color diagnose] (cond (< bmi 18.5) [:orange  "underweight"]
                               (< bmi 25)   [:inherit "normal"]
                               (< bmi 30)   [:orange  "overweight"]
                               :else        [:red     "obese"])]
    [:div
      [:h3 "BMI calculator"]
      [:div
        "Height: " (int height) "cm"
        [slider :height height 100 220 :bmi]]
      [:div
        "Weight: " (int weight) "kg"
        [slider :weight weight 30 150 :bmi]]
      [:div
        "BMI: " (int bmi) " "
        [:span {:style {:color color}} diagnose]
        [slider :bmi bmi 10 50 :weight]]]))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.bmi-component"], "\n",
        "    ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "int"], " ", ['span.reserved', "merge"], " ", ['span.reserved', "dictionary?"], " ", ['span.reserved', "dictionary"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "assoc"], " ", ['span.reserved', "dissoc"], " ", ['span.reserved', "nth"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.atom ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "deref"], " ", ['span.reserved', "swap!"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "calc-bmi"], " ", ['span.paren.level2', "["], ['span.paren.level3', "{"], ['span.keyword', ":keys"], " ", ['span.paren.level1', "["], "height weight bmi", ['span.paren.level1', "]"], ", ", ['span.keyword', ":as"], " data", ['span.paren.level3', "}"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "h ", ['span.paren.level1', "("], ['span.reserved', "/"], " height 100", ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "merge"], " data ", ['span.paren.level1', "("], ['span.reserved', "if"], " bmi ", ['span.paren.level2', "{"], ['span.keyword', ":weight"], " ", ['span.paren.level3', "("], ['span.reserved', "*"], " bmi h h", ['span.paren.level3', ")"], ['span.paren.level2', "}"], " ", ['span.paren.level2', "{"], ['span.keyword', ":bmi"], " ", ['span.paren.level3', "("], ['span.reserved', "/"], " weight ", ['span.paren.level1', "("], ['span.reserved', "*"], " h h", ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "bmi-data"], " ", ['span.paren.level2', "("], ['span.reserved', "r/atom"], " ", ['span.paren.level3', "("], "calc-bmi ", ['span.paren.level1', "{"], ['span.keyword', ":height"], " 180, ", ['span.keyword', ":weight"], " 80", ['span.paren.level1', "}"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "slider"], " ", ['span.paren.level2', "["], "param value min max invalidates", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":input"], " ", ['span.paren.level3', "{"], ['span.keyword', ":type"], " ", ['span.keyword', ":range,"], " ", ['span.keyword', ":min"], " min, ", ['span.keyword', ":max"], " max, ", ['span.keyword', ":value"], " value  ", ['span.comment', "; order matters :-("], "\n",
        "           ", ['span.keyword', ":style"], " ", ['span.paren.level1', "{"], ['span.keyword', ":width"], " ", ['span.string', "\"100%\""], ['span.paren.level1', "}"], "\n",
        "           ", ['span.keyword', ":oninput"], " ", ['span.paren.level1', "("], ['span.reserved', "fn"], " ", ['span.paren.level2', "["], "e", ['span.paren.level2', "]"], "\n",
        "                      ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "new-value ", ['span.paren.level1', "("], ['span.reserved', "parse-int"], " e.target.value", ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "                        ", ['span.paren.level3', "("], ['span.reserved', "swap!"], " bmi-data ", ['span.reserved', "#"], ['span.paren.level1', "("], ['span.reserved', "->"], " ", ['span.reserved', "%"], "\n",
        "                                             ", ['span.paren.level2', "("], ['span.reserved', "assoc"], " param new-value", ['span.paren.level2', ")"], "\n",
        "                                             ", ['span.paren.level2', "("], ['span.reserved', "dissoc"], " invalidates", ['span.paren.level2', ")"], "\n",
        "                                             calc-bmi", ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "bmi-component"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], ['span.paren.level1', "{"], ['span.keyword', ":keys"], " ", ['span.paren.level2', "["], "weight, height, bmi", ['span.paren.level2', "]"], ['span.paren.level1', "}"], " ", ['span.reserved', "@"], "bmi-data\n",
        "        ", ['span.paren.level1', "["], "color diagnose", ['span.paren.level1', "]"], " ", ['span.paren.level1', "("], ['span.reserved', "cond"], " ", ['span.paren.level2', "("], ['span.reserved', "<"], " bmi 18.5", ['span.paren.level2', ")"], " ", ['span.paren.level2', "["], ['span.keyword', ":orange"], "  ", ['span.string', "\"underweight\""], ['span.paren.level2', "]"], "\n",
        "                               ", ['span.paren.level2', "("], ['span.reserved', "<"], " bmi 25", ['span.paren.level2', ")"], "   ", ['span.paren.level2', "["], ['span.keyword', ":inherit"], " ", ['span.string', "\"normal\""], ['span.paren.level2', "]"], "\n",
        "                               ", ['span.paren.level2', "("], ['span.reserved', "<"], " bmi 30", ['span.paren.level2', ")"], "   ", ['span.paren.level2', "["], ['span.keyword', ":orange"], "  ", ['span.string', "\"overweight\""], ['span.paren.level2', "]"], "\n",
        "                               ", ['span.keyword', ":else"], "        ", ['span.paren.level2', "["], ['span.keyword', ":red"], "     ", ['span.string', "\"obese\""], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":div"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":h3"], " ", ['span.string', "\"BMI calculator\""], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":div"], "\n",
        "        ", ['span.string', "\"Height: \""], " ", ['span.paren.level2', "("], ['span.reserved', "int"], " height", ['span.paren.level2', ")"], " ", ['span.string', "\"cm\""], "\n",
        "        ", ['span.paren.level2', "["], "slider ", ['span.keyword', ":height"], " height 100 220 ", ['span.keyword', ":bmi"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":div"], "\n",
        "        ", ['span.string', "\"Weight: \""], " ", ['span.paren.level2', "("], ['span.reserved', "int"], " weight", ['span.paren.level2', ")"], " ", ['span.string', "\"kg\""], "\n",
        "        ", ['span.paren.level2', "["], "slider ", ['span.keyword', ":weight"], " weight 30 150 ", ['span.keyword', ":bmi"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":div"], "\n",
        "        ", ['span.string', "\"BMI: \""], " ", ['span.paren.level2', "("], ['span.reserved', "int"], " bmi", ['span.paren.level2', ")"], " ", ['span.string', "\" \""], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":span"], " ", ['span.paren.level3', "{"], ['span.keyword', ":style"], " ", ['span.paren.level1', "{"], ['span.keyword', ":color"], " color", ['span.paren.level1', "}"], ['span.paren.level3', "}"], " diagnose", ['span.paren.level2', "]"], "\n",
        "        ", ['span.paren.level2', "["], "slider ", ['span.keyword', ":bmi"], " bmi 10 50 ", ['span.keyword', ":weight"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"]],
  },
  simpleExample: {
    className: 'simple',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let {reagent: r, atom: {deref, reset}} = require('mreframe');

var timer = r.atom(new Date);
var timeColor = r.atom("#f34");


let greeting = (message) =>
  ['h1', message];

let clock = () => {
  let [timeStr] = deref(timer).toTimeString().split(" ");
  return ['div.example-clock', {style: {color: deref(timeColor)}},
           timeStr];
};

let colorInput = () =>
  ['div.color-input',
    "Time color: ",
    ['input', {type: 'text',  value: deref(timeColor),
               oninput: e => reset(timeColor, e.target.value)}]];

let simpleExample = () =>
  ['div',
    [greeting, "Hello world, it is now"],
    [clock],
    [colorInput]];


setInterval(() => reset(timer, new Date), 1000);  // timeUpdater

return simpleExample;`
    )),
    html: (
`<div>
  <h1>Hello world, it is now</h1>
  <div style="color:#f34" class="example-clock">
    02:25:00
  </div>
  <div class="color-input">
    Time color: <input type="text" value="#f34"/>
  </div>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "h1"], ['span.reserved', ">"], "Hello world, it is now", ['span.reserved', "</"], ['span.declaration', "h1"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "div"], " ", ['span.keyword', "style"], ['span.reserved', "="], ['span.string', "\"color:#f34\""], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"example-clock\""], ['span.reserved', ">"], "\n",
        "    02:25:00\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "div"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"color-input\""], ['span.reserved', ">"], "\n",
        "    Time color: ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"text\""], " ", ['span.keyword', "value"], ['span.reserved', "="], ['span.string', "\"#f34\""], ['span.reserved', "/>"], "\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let {reagent: r, atom: {deref, reset}} = require('mreframe');

var timer = r.atom(new Date);
var timeColor = r.atom("#f34");


let greeting = (message) =>
  ['h1', message];

let clock = () => {
  let [timeStr] = deref(timer).toTimeString().split(" ");
  return ['div.example-clock', {style: {color: deref(timeColor)}},
           timeStr];
};

let colorInput = () =>
  ['div.color-input',
    "Time color: ",
    ['input', {type: 'text',  value: deref(timeColor),
               oninput: e => reset(timeColor, e.target.value)}]];

let simpleExample = () =>
  ['div',
    [greeting, "Hello world, it is now"],
    [clock],
    [colorInput]];


setInterval(() => reset(timer, new Date), 1000);  // timeUpdater

r.render([simpleExample], document.getElementById('app'));`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reagent"], ['span.reserved', ":"], " r, ", ['span.keyword', "atom"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "reset"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "var"], " ", ['span.declaration', "timer"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level1', "("], ['span.reserved', "new"], " ", ['span.reserved', "Date"], ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "var"], " ", ['span.declaration', "timeColor"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level1', "("], ['span.string', "\"#f34\""], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "greeting"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "message", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'h1'"], ", message", ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "clock"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " ", ['span.paren.level2', "["], "timeStr", ['span.paren.level2', "]"], " ", ['span.reserved', "="], " ", ['span.reserved', "deref"], ['span.paren.level2', "("], "timer", ['span.paren.level2', ")"], ".toTimeString", ['span.paren.level2', "("], ['span.paren.level2', ")"], ".split", ['span.paren.level2', "("], ['span.string', "\" \""], ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "return"], " ", ['span.paren.level2', "["], ['span.keyword', "'div.example-clock'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "style"], ['span.reserved', ":"], " ", ['span.paren.level1', "{"], ['span.keyword', "color"], ['span.reserved', ":"], " ", ['span.reserved', "deref"], ['span.paren.level2', "("], "timeColor", ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "}"], ",\n",
        "           timeStr", ['span.paren.level2', "]"], ";\n",
        ['span.paren.level1', "}"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "colorInput"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div.color-input'"], ",\n",
        "    ", ['span.string', "\"Time color: \""], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "type"], ['span.reserved', ":"], " ", ['span.keyword', "'text'"], ",  ", ['span.keyword', "value"], ['span.reserved', ":"], " ", ['span.reserved', "deref"], ['span.paren.level1', "("], "timeColor", ['span.paren.level1', ")"], ",\n",
        "               ", ['span.keyword', "oninput"], ['span.reserved', ":"], " e ", ['span.reserved', "=>"], " ", ['span.reserved', "reset"], ['span.paren.level1', "("], "timeColor, e.target.value", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "simpleExample"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], ",\n",
        "    ", ['span.paren.level2', "["], "greeting, ", ['span.string', "\"Hello world, it is now\""], ['span.paren.level2', "]"], ",\n",
        "    ", ['span.paren.level2', "["], "clock", ['span.paren.level2', "]"], ",\n",
        "    ", ['span.paren.level2', "["], "colorInput", ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";\n",
        "\n",
        "\n",
        ['span.reserved', "setInterval"], ['span.paren.level1', "("], ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "reset"], ['span.paren.level2', "("], "timer, ", ['span.reserved', "new"], " ", ['span.reserved', "Date"], ['span.paren.level2', ")"], ", 1000", ['span.paren.level1', ")"], ";  ", ['span.comment', "// timeUpdater"], "\n",
        "\n",
        ['span.reserved', "r.render"], ['span.paren.level1', "("], ['span.paren.level2', "["], "simpleExample", ['span.paren.level2', "]"], ", ", ['span.reserved', "document.getElementById"], ['span.paren.level2', "("], ['span.keyword', "'app'"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";"],
    coffee: (
`{reagent: r, atom: {deref, reset}} = require 'mreframe'

timer = r.atom (new Date)
timeColor = r.atom "#f34"


greeting = (message) ->
  ['h1', message]

clock = ->
  [timeStr] = (deref timer).toTimeString().split " "
  ['div.example-clock', style: {color: (deref timeColor)}
     timeStr]

colorInput = ->
  ['div.color-input'
    "Time color: "
    ['input', {type: 'text',  value: (deref timeColor)
               oninput: (e) -> (reset timeColor, e.target.value)}]]

simpleExample = ->
  ['div'
    [greeting, "Hello world, it is now"]
    [clock]
    [colorInput]]


setInterval (-> reset timer, new Date), 1000  # timeUpdater

r.render [simpleExample], (document.getElementById 'app')`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reagent"], ": r, ", ['span.keyword', "atom"], ": ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "reset"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        ['span.declaration', "timer"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " ", ['span.paren.level1', "("], ['span.reserved', "new"], " ", ['span.reserved', "Date"], ['span.paren.level1', ")"], "\n",
        ['span.declaration', "timeColor"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " ", ['span.string', "\"#f34\""], "\n",
        "\n",
        "\n",
        ['span.declaration', "greeting"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "message", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'h1'"], ", message", ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "clock"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], "timeStr", ['span.paren.level1', "]"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.reserved', "deref"], " timer", ['span.paren.level1', ")"], ".toTimeString", ['span.paren.level1', "("], ['span.paren.level1', ")"], ".split ", ['span.string', "\" \""], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div.example-clock'"], ", ", ['span.keyword', "style"], ": ", ['span.paren.level2', "{"], ['span.keyword', "color"], ": ", ['span.paren.level3', "("], ['span.reserved', "deref"], " timeColor", ['span.paren.level3', ")"], ['span.paren.level2', "}"], "\n",
        "     timeStr", ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "colorInput"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div.color-input'"], "\n",
        "    ", ['span.string', "\"Time color: \""], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "type"], ": ", ['span.keyword', "'text'"], ",  ", ['span.keyword', "value"], ": ", ['span.paren.level1', "("], ['span.reserved', "deref"], " timeColor", ['span.paren.level1', ")"], "\n",
        "               ", ['span.keyword', "oninput"], ": ", ['span.paren.level1', "("], "e", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level1', "("], ['span.reserved', "reset"], " timeColor, e.target.value", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "simpleExample"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.paren.level2', "["], "greeting, ", ['span.string', "\"Hello world, it is now\""], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], "clock", ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], "colorInput", ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "\n",
        "\n",
        ['span.reserved', "setInterval"], " ", ['span.paren.level1', "("], ['span.reserved', "->"], " ", ['span.reserved', "reset"], " timer, ", ['span.reserved', "new"], " ", ['span.reserved', "Date"], ['span.paren.level1', ")"], ", 1000  ", ['span.comment', "# timeUpdater"], "\n",
        "\n",
        ['span.reserved', "r.render"], " ", ['span.paren.level1', "["], "simpleExample", ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], ['span.reserved', "document.getElementById"], " ", ['span.keyword', "'app'"], ['span.paren.level1', ")"]],
    wisp: (
`(ns example.simple-example
    (:require [mreframe.atom :refer [deref reset!]]
              [mreframe.reagent :as r]))

(def timer (r/atom (Date.)))
(def time-color (r/atom "#f34"))


(defn greeting [message]
  [:h1 message])

(defn clock []
  (let [[time-str] (.. @timer to-time-string (split " "))
    [:div.example-clock {:style {:color @time-color}}
      time-str]))

(defn color-input []
  [:div.color-input
    "Time color: "
    [:input {:type :text,  :value @time-color,
             :oninput #(reset! time-color (-> % :target :value))}]])

(defn simple-example []
  [:div
    [greeting "Hello world, it is now"]
    [clock]
    [color-input]])


(set-interval! #(reset! timer (Date.)) 1000)  ; time-updater

(r/render [simple-example] (document/get-element-by-id :app))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.simple-example"], "\n",
        "    ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "mreframe.atom ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "deref"], " ", ['span.reserved', "reset!"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "timer"], " ", ['span.paren.level2', "("], ['span.reserved', "r/atom"], " ", ['span.paren.level3', "("], ['span.reserved', "Date."], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "time-color"], " ", ['span.paren.level2', "("], ['span.reserved', "r/atom"], " ", ['span.string', "\"#f34\""], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "greeting"], " ", ['span.paren.level2', "["], "message", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":h1"], " message", ['span.paren.level2', "]"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "clock"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], ['span.paren.level1', "["], "time-str", ['span.paren.level1', "]"], " ", ['span.paren.level1', "("], ['span.reserved', ".."], " ", ['span.reserved', "@"], "timer to-time-string ", ['span.paren.level2', "("], "split ", ['span.string', "\" \""], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "    ", ['span.paren.level1', "["], ['span.keyword', ":div.example-clock"], " ", ['span.paren.level2', "{"], ['span.keyword', ":style"], " ", ['span.paren.level3', "{"], ['span.keyword', ":color"], " ", ['span.reserved', "@"], "time-color", ['span.paren.level3', "}"], ['span.paren.level2', "}"], "\n",
        "      time-str", ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], "\n",
        "\n",
        ['span.paren.level2', "("], ['span.reserved', "defn"], " ", ['span.declaration', "color-input"], " ", ['span.paren.level3', "["], ['span.paren.level3', "]"], "\n",
        "  ", ['span.paren.level3', "["], ['span.keyword', ":div.color-input"], "\n",
        "    ", ['span.string', "\"Time color: \""], "\n",
        "    ", ['span.paren.level1', "["], ['span.keyword', ":input"], " ", ['span.paren.level2', "{"], ['span.keyword', ":type"], " ", ['span.keyword', ":text,"], "  ", ['span.keyword', ":value"], " ", ['span.reserved', "@"], "time-color,\n",
        "             ", ['span.keyword', ":oninput"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "reset!"], " time-color ", ['span.paren.level1', "("], ['span.reserved', "->"], " ", ['span.reserved', "%"], " ", ['span.keyword', ":target"], " ", ['span.keyword', ":value"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], "\n",
        "\n",
        ['span.paren.level2', "("], ['span.reserved', "defn"], " ", ['span.declaration', "simple-example"], " ", ['span.paren.level3', "["], ['span.paren.level3', "]"], "\n",
        "  ", ['span.paren.level3', "["], ['span.keyword', ":div"], "\n",
        "    ", ['span.paren.level1', "["], "greeting ", ['span.string', "\"Hello world, it is now\""], ['span.paren.level1', "]"], "\n",
        "    ", ['span.paren.level1', "["], "clock", ['span.paren.level1', "]"], "\n",
        "    ", ['span.paren.level1', "["], "color-input", ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], "\n",
        "\n",
        "\n",
        ['span.paren.level2', "("], ['span.reserved', "set-interval!"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "reset!"], " timer ", ['span.paren.level1', "("], ['span.reserved', "Date."], ['span.paren.level1', ")"], ['span.paren.level3', ")"], " 1000", ['span.paren.level2', ")"], "  ", ['span.comment', "; time-updater"], "\n",
        "\n",
        ['span.paren.level2', "("], ['span.reserved', "r/render"], " ", ['span.paren.level3', "["], "simple-example", ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "document/get-element-by-id"], " ", ['span.keyword', ":app"], ['span.paren.level3', ")"], ['span.paren.level2', ")"]],
  },
  todoApp: {
    className: 'todo-app',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let {reagent: r, atom: {deref, reset, swap},
     util: {identity, dict, entries, vals, getIn,
            assoc, assocIn, dissoc, updateIn}} = require('mreframe');
let {map, filter} = require('lodash');

var todos   = r.atom({});
var counter = r.atom(0);

let addTodo = (text) => {
  let id = swap(counter, n => n + 1);
  swap(todos, assoc, id, {id,  title: text,  done: false});
};

let toggle = (id) => swap(todos, updateIn, [id, 'done'], it => !it);
let save   = (id, title) => swap(todos, assocIn, [id, 'title'], title);
let remove = (id) => swap(todos, dissoc, id);

let mmap        = (o, f, arg) => dict( f(entries(o), arg) );
let completeAll = v  => swap(todos, mmap, map,    it => assocIn(it, [1, 'done'], v));
let clearDone   = () => swap(todos, mmap, filter, it => !getIn(it, [1, 'done']));


let todoInput = ({title, onsave, onstop}) => {
  let val = r.atom(title || "");
  let stop = () => {reset(val, "");   onstop && onstop()};
  let save = () => {let v = deref(val).trim();
                    v && onsave(v);
                    stop()};
  return ({id, className, placeholder}) =>
    ['input', {type: 'text',  value: deref(val),
               id,  className,  placeholder,
               onblur: save,
               oninput:   e => reset(val, e.target.value),
               onkeydown: e => (e.which === 13 ? save() :
                                e.which === 26 ? stop() :
                                null)}];
};

let todoEdit = r.createClass({  // not quite equivalent to the original code
  componentDidMount: ({dom}) => dom.focus(),
  reagentRender:     params => [todoInput, params],
});

let todoStats = ({filt, active, done}) => {
  let attrsFor = name => ({class: [(name == deref(filt)) && 'selected'],
                           onclick: () => reset(filt, name)});
  return ['div',
           ['span#todo-count',
             ['strong', active], " ", (active == 1 ? "item" : "items"), " left"],
           ['ul#filters',
             ['li', ['a', attrsFor('all'),    "All"]],
             ['li', ['a', attrsFor('active'), "Active"]],
             ['li', ['a', attrsFor('done'),   "Completed"]]],
           (done > 0) &&
             ['button#clear-completed', {onclick: clearDone},
                "Clear completed ", done]];
};

let todoItem = () => {
  let editing = r.atom(false);
  return ({id, done, title}) =>
    ['li', {class: {completed: done,  editing: deref(editing)}},
      ['div.view',
        ['input.toggle', {type: 'checkbox',  checked: done,
                          onchange: () => toggle(id)}],
        ['label', {ondblclick: () => reset(editing, true)}, title],
        ['button.destroy', {onclick: () => remove(id)}]],
      deref(editing) &&
        [todoEdit, {className: 'edit',  title,
                    onsave: it => save(id, it),
                    onstop: () => reset(editing, false)}]];
};

let todoApp = () => {
  let filt = r.atom('all');
  return () => {
    let items = vals( deref(todos) );
    let done = items.filter(it => it.done).length;
    let active = items.length - done;
    return ['div',
             ['section#todoapp',
               ['header#header',
                 ['h1', "todos"],
                 [todoInput, {id:          'new-todo',
                              placeholder: "What needs to be done?",
                              onsave:      addTodo}]],
               (items.length > 0) &&
                 ['div',
                   ['section#main',
                     ['input#toggle-all', {type: 'checkbox', checked: (active === 0),
                                           onchange: () => completeAll(active > 0)}],
                     ['label', {for: 'toggle-all'}, "Mark all as complete"],
                     ['ul#todo-list',
                       ...items.filter(deref(filt) === 'active' ? (it => !it.done) :
                                       deref(filt) === 'done'   ? (it => it.done)  :
                                       identity).map(todo =>
                         r.with({key: todo.id}, [todoItem, todo]))]],
                   ['footer#footer',
                     [todoStats, {active, done, filt}]]]],
             ['footer#info',
               ['p', "Double-click to edit a todo"]]];
  };
};


// init
addTodo("Rename Cloact to Reagent");
addTodo("Add undo demo");
addTodo("Make all rendering async");
addTodo("Allow any arguments to component functions");
completeAll(true);

return todoApp;`
    )),
    html: (
`<div>
  <section id="todoapp">
    <header id="header">
      <h1>todos</h1>
      <input type="text" value="" id="new-todo" placeholder="What needs to be done?"/>
    </header>
    <div>
      <section id="main">
        <input type="checkbox" checked="" id="toggle-all"/>
        <label for="toggle-all">Mark all as complete</label>
        <ul id="todo-list">
          <li class="completed">
            <div class="view">
              <input type="checkbox" checked="" class="toggle"/>
              <label>Rename Cloact to Reagent</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li class="completed">
            <div class="view">
              <input type="checkbox" checked="" class="toggle"/>
              <label>Add undo demo</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li class="completed">
            <div class="view">
              <input type="checkbox" checked="" class="toggle"/>
              <label>Make all rendering async</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li class="completed">
            <div class="view">
              <input type="checkbox" checked="" class="toggle"/>
              <label>Allow any arguments to component functions</label>
              <button class="destroy"></button>
            </div>
          </li>
        </ul>
      </section>
      <footer id="footer">
        <div>
          <span id="todo-count"><strong>0</strong> items left</span>
          <ul id="filters">
            <li><a class="selected">All</a></li>
            <li><a class="">Active</a></li>
            <li><a class="">Completed</a></li>
          </ul>
          <button id="clear-completed">Clear completed 4</button>
        </div>
      </footer>
    </div>
  </section>
  <footer id="info">
    <p>Double-click to edit a todo</p>
  </footer>
</div>`
    ),
    html_:
      ['<>',
        ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "section"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"todoapp\""], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "header"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"header\""], ['span.reserved', ">"], "\n",
        "      ", ['span.reserved', "<"], ['span.declaration', "h1"], ['span.reserved', ">"], "todos", ['span.reserved', "</"], ['span.declaration', "h1"], ['span.reserved', ">"], "\n",
        "      ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"text\""], " ", ['span.keyword', "value"], ['span.reserved', "="], ['span.string', "\"\""], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"new-todo\""], " ", ['span.keyword', "placeholder"], ['span.reserved', "="], ['span.string', "\"What needs to be done?\""], ['span.reserved', "/>"], "\n",
        "    ", ['span.reserved', "</"], ['span.declaration', "header"], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "      ", ['span.reserved', "<"], ['span.declaration', "section"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"main\""], ['span.reserved', ">"], "\n",
        "        ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"checkbox\""], " ", ['span.keyword', "checked"], ['span.reserved', "="], ['span.string', "\"\""], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"toggle-all\""], ['span.reserved', "/>"], "\n",
        "        ", ['span.reserved', "<"], ['span.declaration', "label"], " ", ['span.keyword', "for"], ['span.reserved', "="], ['span.string', "\"toggle-all\""], ['span.reserved', ">"], "Mark all as complete", ['span.reserved', "</"], ['span.declaration', "label"], ['span.reserved', ">"], "\n",
        "        ", ['span.reserved', "<"], ['span.declaration', "ul"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"todo-list\""], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "<"], ['span.declaration', "li"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"completed\""], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "<"], ['span.declaration', "div"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"view\""], ['span.reserved', ">"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"checkbox\""], " ", ['span.keyword', "checked"], ['span.reserved', "="], ['span.string', "\"\""], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"toggle\""], ['span.reserved', "/>"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "label"], ['span.reserved', ">"], "Rename Cloact to Reagent", ['span.reserved', "</"], ['span.declaration', "label"], ['span.reserved', ">"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "button"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"destroy\""], ['span.reserved', ">"], ['span.reserved', "</"], ['span.declaration', "button"], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "<"], ['span.declaration', "li"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"completed\""], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "<"], ['span.declaration', "div"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"view\""], ['span.reserved', ">"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"checkbox\""], " ", ['span.keyword', "checked"], ['span.reserved', "="], ['span.string', "\"\""], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"toggle\""], ['span.reserved', "/>"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "label"], ['span.reserved', ">"], "Add undo demo", ['span.reserved', "</"], ['span.declaration', "label"], ['span.reserved', ">"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "button"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"destroy\""], ['span.reserved', ">"], ['span.reserved', "</"], ['span.declaration', "button"], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "<"], ['span.declaration', "li"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"completed\""], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "<"], ['span.declaration', "div"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"view\""], ['span.reserved', ">"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"checkbox\""], " ", ['span.keyword', "checked"], ['span.reserved', "="], ['span.string', "\"\""], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"toggle\""], ['span.reserved', "/>"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "label"], ['span.reserved', ">"], "Make all rendering async", ['span.reserved', "</"], ['span.declaration', "label"], ['span.reserved', ">"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "button"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"destroy\""], ['span.reserved', ">"], ['span.reserved', "</"], ['span.declaration', "button"], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "<"], ['span.declaration', "li"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"completed\""], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "<"], ['span.declaration', "div"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"view\""], ['span.reserved', ">"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "input"], " ", ['span.keyword', "type"], ['span.reserved', "="], ['span.string', "\"checkbox\""], " ", ['span.keyword', "checked"], ['span.reserved', "="], ['span.string', "\"\""], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"toggle\""], ['span.reserved', "/>"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "label"], ['span.reserved', ">"], "Allow any arguments to component functions", ['span.reserved', "</"], ['span.declaration', "label"], ['span.reserved', ">"], "\n",
        "              ", ['span.reserved', "<"], ['span.declaration', "button"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"destroy\""], ['span.reserved', ">"], ['span.reserved', "</"], ['span.declaration', "button"], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "        ", ['span.reserved', "</"], ['span.declaration', "ul"], ['span.reserved', ">"], "\n",
        "      ", ['span.reserved', "</"], ['span.declaration', "section"], ['span.reserved', ">"], "\n",
        "      ", ['span.reserved', "<"], ['span.declaration', "footer"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"footer\""], ['span.reserved', ">"], "\n",
        "        ", ['span.reserved', "<"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "<"], ['span.declaration', "span"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"todo-count\""], ['span.reserved', ">"], ['span.reserved', "<"], ['span.declaration', "strong"], ['span.reserved', ">"], "0", ['span.reserved', "</"], ['span.declaration', "strong"], ['span.reserved', ">"], " items left", ['span.reserved', "</"], ['span.declaration', "span"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "<"], ['span.declaration', "ul"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"filters\""], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "<"], ['span.declaration', "li"], ['span.reserved', ">"], ['span.reserved', "<"], ['span.declaration', "a"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"selected\""], ['span.reserved', ">"], "All", ['span.reserved', "</"], ['span.declaration', "a"], ['span.reserved', ">"], ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "<"], ['span.declaration', "li"], ['span.reserved', ">"], ['span.reserved', "<"], ['span.declaration', "a"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"\""], ['span.reserved', ">"], "Active", ['span.reserved', "</"], ['span.declaration', "a"], ['span.reserved', ">"], ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "            ", ['span.reserved', "<"], ['span.declaration', "li"], ['span.reserved', ">"], ['span.reserved', "<"], ['span.declaration', "a"], " ", ['span.keyword', "class"], ['span.reserved', "="], ['span.string', "\"\""], ['span.reserved', ">"], "Completed", ['span.reserved', "</"], ['span.declaration', "a"], ['span.reserved', ">"], ['span.reserved', "</"], ['span.declaration', "li"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "</"], ['span.declaration', "ul"], ['span.reserved', ">"], "\n",
        "          ", ['span.reserved', "<"], ['span.declaration', "button"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"clear-completed\""], ['span.reserved', ">"], "Clear completed 4", ['span.reserved', "</"], ['span.declaration', "button"], ['span.reserved', ">"], "\n",
        "        ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "      ", ['span.reserved', "</"], ['span.declaration', "footer"], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "section"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "<"], ['span.declaration', "footer"], " ", ['span.keyword', "id"], ['span.reserved', "="], ['span.string', "\"info\""], ['span.reserved', ">"], "\n",
        "    ", ['span.reserved', "<"], ['span.declaration', "p"], ['span.reserved', ">"], "Double-click to edit a todo", ['span.reserved', "</"], ['span.declaration', "p"], ['span.reserved', ">"], "\n",
        "  ", ['span.reserved', "</"], ['span.declaration', "footer"], ['span.reserved', ">"], "\n",
        ['span.reserved', "</"], ['span.declaration', "div"], ['span.reserved', ">"]],
    js: (
`let {reagent: r, atom: {deref, reset, swap},
     util: {identity, dict, entries, vals, getIn,
            assoc, assocIn, dissoc, updateIn}} = require('mreframe');
let {map, filter} = require('lodash');

var todos   = r.atom({});
var counter = r.atom(0);

let addTodo = (text) => {
  let id = swap(counter, n => n + 1);
  swap(todos, assoc, id, {id,  title: text,  done: false});
};

let toggle = (id) => swap(todos, updateIn, [id, 'done'], it => !it);
let save   = (id, title) => swap(todos, assocIn, [id, 'title'], title);
let remove = (id) => swap(todos, dissoc, id);

let mmap        = (o, f, arg) => dict( f(entries(o), arg) );
let completeAll = v  => swap(todos, mmap, map,    it => assocIn(it, [1, 'done'], v));
let clearDone   = () => swap(todos, mmap, filter, it => !getIn(it, [1, 'done']));


let todoInput = ({title, onsave, onstop}) => {
  let val = r.atom(title || "");
  let stop = () => {reset(val, "");   onstop && onstop()};
  let save = () => {let v = deref(val).trim();
                    v && onsave(v);
                    stop()};
  return ({id, className, placeholder}) =>
    ['input', {type: 'text',  value: deref(val),
               id,  className,  placeholder,
               onblur: save,
               oninput:   e => reset(val, e.target.value),
               onkeydown: e => (e.which === 13 ? save() :
                                e.which === 26 ? stop() :
                                null)}];
};

let todoEdit = r.createClass({  // not quite equivalent to the original code
  componentDidMount: ({dom}) => dom.focus(),
  reagentRender:     params => [todoInput, params],
});

let todoStats = ({filt, active, done}) => {
  let attrsFor = name => ({class: [(name == deref(filt)) && 'selected'],
                           onclick: () => reset(filt, name)});
  return ['div',
           ['span#todo-count',
             ['strong', active], " ", (active == 1 ? "item" : "items"), " left"],
           ['ul#filters',
             ['li', ['a', attrsFor('all'),    "All"]],
             ['li', ['a', attrsFor('active'), "Active"]],
             ['li', ['a', attrsFor('done'),   "Completed"]]],
           (done > 0) &&
             ['button#clear-completed', {onclick: clearDone},
                "Clear completed ", done]];
};

let todoItem = () => {
  let editing = r.atom(false);
  return ({id, done, title}) =>
    ['li', {class: {completed: done,  editing: deref(editing)}},
      ['div.view',
        ['input.toggle', {type: 'checkbox',  checked: done,
                          onchange: () => toggle(id)}],
        ['label', {ondblclick: () => reset(editing, true)}, title],
        ['button.destroy', {onclick: () => remove(id)}]],
      deref(editing) &&
        [todoEdit, {className: 'edit',  title,
                    onsave: it => save(id, it),
                    onstop: () => reset(editing, false)}]];
};

let todoApp = () => {
  let filt = r.atom('all');
  return () => {
    let items = vals( deref(todos) );
    let done = items.filter(it => it.done).length;
    let active = items.length - done;
    return ['div',
             ['section#todoapp',
               ['header#header',
                 ['h1', "todos"],
                 [todoInput, {id:          'new-todo',
                              placeholder: "What needs to be done?",
                              onsave:      addTodo}]],
               (items.length > 0) &&
                 ['div',
                   ['section#main',
                     ['input#toggle-all', {type: 'checkbox', checked: (active === 0),
                                           onchange: () => completeAll(active > 0)}],
                     ['label', {for: 'toggle-all'}, "Mark all as complete"],
                     ['ul#todo-list',
                       ...items.filter(deref(filt) === 'active' ? (it => !it.done) :
                                       deref(filt) === 'done'   ? (it => it.done)  :
                                       identity).map(todo =>
                         r.with({key: todo.id}, [todoItem, todo]))]],
                   ['footer#footer',
                     [todoStats, {active, done, filt}]]]],
             ['footer#info',
               ['p', "Double-click to edit a todo"]]];
  };
};


// init
addTodo("Rename Cloact to Reagent");
addTodo("Add undo demo");
addTodo("Make all rendering async");
addTodo("Allow any arguments to component functions");
completeAll(true);

r.render([todoApp], document.getElementById('app'));`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reagent"], ['span.reserved', ":"], " r, ", ['span.keyword', "atom"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "reset"], ", ", ['span.reserved', "swap"], ['span.paren.level2', "}"], ",\n",
        "     ", ['span.keyword', "util"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "identity"], ", ", ['span.reserved', "dict"], ", ", ['span.reserved', "entries"], ", ", ['span.reserved', "vals"], ", ", ['span.reserved', "getIn"], ",\n",
        "            ", ['span.reserved', "assoc"], ", ", ['span.reserved', "assocIn"], ", ", ['span.reserved', "dissoc"], ", ", ['span.reserved', "updateIn"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.reserved', "map"], ", ", ['span.reserved', "filter"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'lodash'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "var"], " ", ['span.declaration', "todos"], "   ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level1', "("], ['span.paren.level2', "{"], ['span.paren.level2', "}"], ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "var"], " ", ['span.declaration', "counter"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level1', "("], "0", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "addTodo"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "text", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " id ", ['span.reserved', "="], " ", ['span.reserved', "swap"], ['span.paren.level2', "("], "counter, n ", ['span.reserved', "=>"], " n ", ['span.reserved', "+"], " 1", ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "swap"], ['span.paren.level2', "("], "todos, ", ['span.reserved', "assoc"], ", id, ", ['span.paren.level3', "{"], "id,  ", ['span.keyword', "title"], ['span.reserved', ":"], " text,  ", ['span.keyword', "done"], ['span.reserved', ":"], " ", ['span.reserved', "false"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ";\n",
        ['span.paren.level1', "}"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "toggle"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "id", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "swap"], ['span.paren.level1', "("], "todos, ", ['span.reserved', "updateIn"], ", ", ['span.paren.level2', "["], "id, ", ['span.keyword', "'done'"], ['span.paren.level2', "]"], ", it ", ['span.reserved', "=>"], " ", ['span.reserved', "!"], "it", ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "let"], " ", ['span.declaration', "save"], "   ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "id, title", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "swap"], ['span.paren.level1', "("], "todos, ", ['span.reserved', "assocIn"], ", ", ['span.paren.level2', "["], "id, ", ['span.keyword', "'title'"], ['span.paren.level2', "]"], ", title", ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "let"], " ", ['span.declaration', "remove"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "id", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "swap"], ['span.paren.level1', "("], "todos, ", ['span.reserved', "dissoc"], ", id", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "mmap"], "        ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "o, f, arg", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "dict"], ['span.paren.level1', "("], " f", ['span.paren.level2', "("], ['span.reserved', "entries"], ['span.paren.level3', "("], "o", ['span.paren.level3', ")"], ", arg", ['span.paren.level2', ")"], " ", ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "let"], " ", ['span.declaration', "completeAll"], " ", ['span.reserved', "="], " v  ", ['span.reserved', "=>"], " ", ['span.reserved', "swap"], ['span.paren.level1', "("], "todos, mmap, ", ['span.reserved', "map"], ",    it ", ['span.reserved', "=>"], " ", ['span.reserved', "assocIn"], ['span.paren.level2', "("], "it, ", ['span.paren.level3', "["], "1, ", ['span.keyword', "'done'"], ['span.paren.level3', "]"], ", v", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "let"], " ", ['span.declaration', "clearDone"], "   ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "swap"], ['span.paren.level1', "("], "todos, mmap, ", ['span.reserved', "filter"], ", it ", ['span.reserved', "=>"], " ", ['span.reserved', "!"], ['span.reserved', "getIn"], ['span.paren.level2', "("], "it, ", ['span.paren.level3', "["], "1, ", ['span.keyword', "'done'"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "todoInput"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "title, onsave, onstop", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " val ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level2', "("], "title ", ['span.reserved', "||"], " ", ['span.string', "\"\""], ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "let"], " stop ", ['span.reserved', "="], " ", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "{"], ['span.reserved', "reset"], ['span.paren.level3', "("], "val, ", ['span.string', "\"\""], ['span.paren.level3', ")"], ";   onstop ", ['span.reserved', "&&"], " onstop", ['span.paren.level3', "("], ['span.paren.level3', ")"], ['span.paren.level2', "}"], ";\n",
        "  ", ['span.reserved', "let"], " save ", ['span.reserved', "="], " ", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "{"], ['span.reserved', "let"], " v ", ['span.reserved', "="], " ", ['span.reserved', "deref"], ['span.paren.level3', "("], "val", ['span.paren.level3', ")"], ".trim", ['span.paren.level3', "("], ['span.paren.level3', ")"], ";\n",
        "                    v ", ['span.reserved', "&&"], " onsave", ['span.paren.level3', "("], "v", ['span.paren.level3', ")"], ";\n",
        "                    stop", ['span.paren.level3', "("], ['span.paren.level3', ")"], ['span.paren.level2', "}"], ";\n",
        "  ", ['span.reserved', "return"], " ", ['span.paren.level2', "("], ['span.paren.level3', "{"], "id, className, placeholder", ['span.paren.level3', "}"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "type"], ['span.reserved', ":"], " ", ['span.keyword', "'text'"], ",  ", ['span.keyword', "value"], ['span.reserved', ":"], " ", ['span.reserved', "deref"], ['span.paren.level1', "("], "val", ['span.paren.level1', ")"], ",\n",
        "               id,  className,  placeholder,\n",
        "               ", ['span.keyword', "onblur"], ['span.reserved', ":"], " save,\n",
        "               ", ['span.keyword', "oninput"], ['span.reserved', ":"], "   e ", ['span.reserved', "=>"], " ", ['span.reserved', "reset"], ['span.paren.level1', "("], "val, e.target.value", ['span.paren.level1', ")"], ",\n",
        "               ", ['span.keyword', "onkeydown"], ['span.reserved', ":"], " e ", ['span.reserved', "=>"], " ", ['span.paren.level1', "("], "e.which ", ['span.reserved', "==="], " 13 ", ['span.reserved', "?"], " save", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', ":"], "\n",
        "                                e.which ", ['span.reserved', "==="], " 26 ", ['span.reserved', "?"], " stop", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', ":"], "\n",
        "                                null", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ";\n",
        ['span.paren.level1', "}"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "todoEdit"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.createClass"], ['span.paren.level1', "("], ['span.paren.level2', "{"], "  ", ['span.comment', "// not quite equivalent to the original code"], "\n",
        "  ", ['span.keyword', "componentDidMount"], ['span.reserved', ":"], " ", ['span.paren.level3', "("], ['span.paren.level1', "{"], "dom", ['span.paren.level1', "}"], ['span.paren.level3', ")"], " ", ['span.reserved', "=>"], " dom.focus", ['span.paren.level3', "("], ['span.paren.level3', ")"], ",\n",
        "  ", ['span.keyword', "reagentRender"], ['span.reserved', ":"], "     params ", ['span.reserved', "=>"], " ", ['span.paren.level3', "["], "todoInput, params", ['span.paren.level3', "]"], ",\n",
        ['span.paren.level2', "}"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "todoStats"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "filt, active, done", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " attrsFor ", ['span.reserved', "="], " name ", ['span.reserved', "=>"], " ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "class"], ['span.reserved', ":"], " ", ['span.paren.level1', "["], ['span.paren.level2', "("], "name ", ['span.reserved', "=="], " ", ['span.reserved', "deref"], ['span.paren.level3', "("], "filt", ['span.paren.level3', ")"], ['span.paren.level2', ")"], " ", ['span.reserved', "&&"], " ", ['span.keyword', "'selected'"], ['span.paren.level1', "]"], ",\n",
        "                           ", ['span.keyword', "onclick"], ['span.reserved', ":"], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "reset"], ['span.paren.level1', "("], "filt, name", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "return"], " ", ['span.paren.level2', "["], ['span.keyword', "'div'"], ",\n",
        "           ", ['span.paren.level3', "["], ['span.keyword', "'span#todo-count'"], ",\n",
        "             ", ['span.paren.level1', "["], ['span.keyword', "'strong'"], ", active", ['span.paren.level1', "]"], ", ", ['span.string', "\" \""], ", ", ['span.paren.level1', "("], "active ", ['span.reserved', "=="], " 1 ", ['span.reserved', "?"], " ", ['span.string', "\"item\""], " ", ['span.reserved', ":"], " ", ['span.string', "\"items\""], ['span.paren.level1', ")"], ", ", ['span.string', "\" left\""], ['span.paren.level3', "]"], ",\n",
        "           ", ['span.paren.level3', "["], ['span.keyword', "'ul#filters'"], ",\n",
        "             ", ['span.paren.level1', "["], ['span.keyword', "'li'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'a'"], ", attrsFor", ['span.paren.level3', "("], ['span.keyword', "'all'"], ['span.paren.level3', ")"], ",    ", ['span.string', "\"All\""], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ",\n",
        "             ", ['span.paren.level1', "["], ['span.keyword', "'li'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'a'"], ", attrsFor", ['span.paren.level3', "("], ['span.keyword', "'active'"], ['span.paren.level3', ")"], ", ", ['span.string', "\"Active\""], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ",\n",
        "             ", ['span.paren.level1', "["], ['span.keyword', "'li'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'a'"], ", attrsFor", ['span.paren.level3', "("], ['span.keyword', "'done'"], ['span.paren.level3', ")"], ",   ", ['span.string', "\"Completed\""], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ",\n",
        "           ", ['span.paren.level3', "("], "done ", ['span.reserved', ">"], " 0", ['span.paren.level3', ")"], " ", ['span.reserved', "&&"], "\n",
        "             ", ['span.paren.level3', "["], ['span.keyword', "'button#clear-completed'"], ", ", ['span.paren.level1', "{"], ['span.keyword', "onclick"], ['span.reserved', ":"], " clearDone", ['span.paren.level1', "}"], ",\n",
        "                ", ['span.string', "\"Clear completed \""], ", done", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ";\n",
        ['span.paren.level1', "}"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "todoItem"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " editing ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level2', "("], ['span.reserved', "false"], ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "return"], " ", ['span.paren.level2', "("], ['span.paren.level3', "{"], "id, done, title", ['span.paren.level3', "}"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'li'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "class"], ['span.reserved', ":"], " ", ['span.paren.level1', "{"], ['span.keyword', "completed"], ['span.reserved', ":"], " done,  ", ['span.keyword', "editing"], ['span.reserved', ":"], " ", ['span.reserved', "deref"], ['span.paren.level2', "("], "editing", ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "}"], ",\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'div.view'"], ",\n",
        "        ", ['span.paren.level1', "["], ['span.keyword', "'input.toggle'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "type"], ['span.reserved', ":"], " ", ['span.keyword', "'checkbox'"], ",  ", ['span.keyword', "checked"], ['span.reserved', ":"], " done,\n",
        "                          ", ['span.keyword', "onchange"], ['span.reserved', ":"], " ", ['span.paren.level3', "("], ['span.paren.level3', ")"], " ", ['span.reserved', "=>"], " toggle", ['span.paren.level3', "("], "id", ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], ",\n",
        "        ", ['span.paren.level1', "["], ['span.keyword', "'label'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "ondblclick"], ['span.reserved', ":"], " ", ['span.paren.level3', "("], ['span.paren.level3', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "reset"], ['span.paren.level3', "("], "editing, ", ['span.reserved', "true"], ['span.paren.level3', ")"], ['span.paren.level2', "}"], ", title", ['span.paren.level1', "]"], ",\n",
        "        ", ['span.paren.level1', "["], ['span.keyword', "'button.destroy'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "onclick"], ['span.reserved', ":"], " ", ['span.paren.level3', "("], ['span.paren.level3', ")"], " ", ['span.reserved', "=>"], " remove", ['span.paren.level3', "("], "id", ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ",\n",
        "      ", ['span.reserved', "deref"], ['span.paren.level3', "("], "editing", ['span.paren.level3', ")"], " ", ['span.reserved', "&&"], "\n",
        "        ", ['span.paren.level3', "["], "todoEdit, ", ['span.paren.level1', "{"], ['span.keyword', "className"], ['span.reserved', ":"], " ", ['span.keyword', "'edit'"], ",  title,\n",
        "                    ", ['span.keyword', "onsave"], ['span.reserved', ":"], " it ", ['span.reserved', "=>"], " save", ['span.paren.level2', "("], "id, it", ['span.paren.level2', ")"], ",\n",
        "                    ", ['span.keyword', "onstop"], ['span.reserved', ":"], " ", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "reset"], ['span.paren.level2', "("], "editing, ", ['span.reserved', "false"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ";\n",
        ['span.paren.level1', "}"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "todoApp"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level1', "{"], "\n",
        "  ", ['span.reserved', "let"], " filt ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], ['span.paren.level2', "("], ['span.keyword', "'all'"], ['span.paren.level2', ")"], ";\n",
        "  ", ['span.reserved', "return"], " ", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "{"], "\n",
        "    ", ['span.reserved', "let"], " items ", ['span.reserved', "="], " ", ['span.reserved', "vals"], ['span.paren.level3', "("], " ", ['span.reserved', "deref"], ['span.paren.level1', "("], "todos", ['span.paren.level1', ")"], " ", ['span.paren.level3', ")"], ";\n",
        "    ", ['span.reserved', "let"], " done ", ['span.reserved', "="], " items.filter", ['span.paren.level3', "("], "it ", ['span.reserved', "=>"], " it.done", ['span.paren.level3', ")"], ".length;\n",
        "    ", ['span.reserved', "let"], " active ", ['span.reserved', "="], " items.length - done;\n",
        "    ", ['span.reserved', "return"], " ", ['span.paren.level3', "["], ['span.keyword', "'div'"], ",\n",
        "             ", ['span.paren.level1', "["], ['span.keyword', "'section#todoapp'"], ",\n",
        "               ", ['span.paren.level2', "["], ['span.keyword', "'header#header'"], ",\n",
        "                 ", ['span.paren.level3', "["], ['span.keyword', "'h1'"], ", ", ['span.string', "\"todos\""], ['span.paren.level3', "]"], ",\n",
        "                 ", ['span.paren.level3', "["], "todoInput, ", ['span.paren.level1', "{"], ['span.keyword', "id"], ['span.reserved', ":"], "          ", ['span.keyword', "'new-todo'"], ",\n",
        "                              ", ['span.keyword', "placeholder"], ['span.reserved', ":"], " ", ['span.string', "\"What needs to be done?\""], ",\n",
        "                              ", ['span.keyword', "onsave"], ['span.reserved', ":"], "      addTodo", ['span.paren.level1', "}"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ",\n",
        "               ", ['span.paren.level2', "("], "items.length ", ['span.reserved', ">"], " 0", ['span.paren.level2', ")"], " ", ['span.reserved', "&&"], "\n",
        "                 ", ['span.paren.level2', "["], ['span.keyword', "'div'"], ",\n",
        "                   ", ['span.paren.level3', "["], ['span.keyword', "'section#main'"], ",\n",
        "                     ", ['span.paren.level1', "["], ['span.keyword', "'input#toggle-all'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "type"], ['span.reserved', ":"], " ", ['span.keyword', "'checkbox'"], ", ", ['span.keyword', "checked"], ['span.reserved', ":"], " ", ['span.paren.level3', "("], "active ", ['span.reserved', "==="], " 0", ['span.paren.level3', ")"], ",\n",
        "                                           ", ['span.keyword', "onchange"], ['span.reserved', ":"], " ", ['span.paren.level3', "("], ['span.paren.level3', ")"], " ", ['span.reserved', "=>"], " completeAll", ['span.paren.level3', "("], "active ", ['span.reserved', ">"], " 0", ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], ",\n",
        "                     ", ['span.paren.level1', "["], ['span.keyword', "'label'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "for"], ['span.reserved', ":"], " ", ['span.keyword', "'toggle-all'"], ['span.paren.level2', "}"], ", ", ['span.string', "\"Mark all as complete\""], ['span.paren.level1', "]"], ",\n",
        "                     ", ['span.paren.level1', "["], ['span.keyword', "'ul#todo-list'"], ",\n",
        "                       ", ['span.reserved', "..."], "items.filter", ['span.paren.level2', "("], ['span.reserved', "deref"], ['span.paren.level3', "("], "filt", ['span.paren.level3', ")"], " ", ['span.reserved', "==="], " ", ['span.keyword', "'active'"], " ", ['span.reserved', "?"], " ", ['span.paren.level3', "("], "it ", ['span.reserved', "=>"], " ", ['span.reserved', "!"], "it.done", ['span.paren.level3', ")"], " ", ['span.reserved', ":"], "\n",
        "                                       ", ['span.reserved', "deref"], ['span.paren.level3', "("], "filt", ['span.paren.level3', ")"], " ", ['span.reserved', "==="], " ", ['span.keyword', "'done'"], "   ", ['span.reserved', "?"], " ", ['span.paren.level3', "("], "it ", ['span.reserved', "=>"], " it.done", ['span.paren.level3', ")"], "  ", ['span.reserved', ":"], "\n",
        "                                       ", ['span.reserved', "identity"], ['span.paren.level2', ")"], ".map", ['span.paren.level2', "("], "todo ", ['span.reserved', "=>"], "\n",
        "                         ", ['span.reserved', "r.with"], ['span.paren.level3', "("], ['span.paren.level1', "{"], ['span.keyword', "key"], ['span.reserved', ":"], " todo.id", ['span.paren.level1', "}"], ", ", ['span.paren.level1', "["], "todoItem, todo", ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ",\n",
        "                   ", ['span.paren.level3', "["], ['span.keyword', "'footer#footer'"], ",\n",
        "                     ", ['span.paren.level1', "["], "todoStats, ", ['span.paren.level2', "{"], "active, done, filt", ['span.paren.level2', "}"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ",\n",
        "             ", ['span.paren.level1', "["], ['span.keyword', "'footer#info'"], ",\n",
        "               ", ['span.paren.level2', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"Double-click to edit a todo\""], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ";\n",
        "  ", ['span.paren.level2', "}"], ";\n",
        ['span.paren.level1', "}"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// init"], "\n",
        "addTodo", ['span.paren.level1', "("], ['span.string', "\"Rename Cloact to Reagent\""], ['span.paren.level1', ")"], ";\n",
        "addTodo", ['span.paren.level1', "("], ['span.string', "\"Add undo demo\""], ['span.paren.level1', ")"], ";\n",
        "addTodo", ['span.paren.level1', "("], ['span.string', "\"Make all rendering async\""], ['span.paren.level1', ")"], ";\n",
        "addTodo", ['span.paren.level1', "("], ['span.string', "\"Allow any arguments to component functions\""], ['span.paren.level1', ")"], ";\n",
        "completeAll", ['span.paren.level1', "("], ['span.reserved', "true"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "r.render"], ['span.paren.level1', "("], ['span.paren.level2', "["], "todoApp", ['span.paren.level2', "]"], ", ", ['span.reserved', "document.getElementById"], ['span.paren.level2', "("], ['span.keyword', "'app'"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";"],
    coffee: (
`{reagent: r, atom: {deref, reset, swap},
 util: {identity, dict, entries, vals, getIn,
        assoc, assocIn, dissoc, updateIn}} = require 'mreframe'
{map, filter} = require 'lodash'

todos   = r.atom {}
counter = r.atom 0

addTodo = (text) ->
  id = (swap counter, (n) -> n + 1)
  swap todos, assoc, id, {id,  title: text,  done: no}

toggle = (id) -> swap todos, updateIn, [id, 'done'], (it) -> not it
save   = (id, title) -> swap todos, assocIn, [id, 'title'], title
remove = (id) => swap todos, dissoc, id

mmap        = (o, f, arg) -> dict (f (entries o), arg)
completeAll = (v) -> swap todos, mmap, map,    (it) -> assocIn it, [1, 'done'], v
clearDone   =     -> swap todos, mmap, filter, (it) -> not (getIn it, [1, 'done'])


todoInput = ({title, onsave, onstop}) ->
  val = r.atom (title or "")
  stop = -> reset val, "";   onstop?()
  save = ->
    v = (deref val).trim()
    v and (onsave v)
    stop()
  ({id, className, placeholder}) ->
    ['input', {type: 'text',  value: (deref val),\\
               id,  className,  placeholder,\\
               onblur: save,\\
               oninput:   ((e) -> reset val, e.target.value),\\
               onkeydown: ((e) -> switch e.which
                 when 13 then save()
                 when 26 then stop())}];

todoEdit = r.createClass  # not quite equivalent to the original code
  componentDidMount: ({dom}) -> dom.focus()
  reagentRender:     (params) -> [todoInput, params]

todoStats = ({filt, active, done}) ->
  attrsFor = (name) -> {class: [(name is deref filt) and 'selected'],\\
                        onclick: (-> reset filt, name)}
  ['div'
    ['span#todo-count'
      ['strong', active], " ", (if active is 1 then "item" else "items"), " left"]
    ['ul#filters'
      ['li', ['a', (attrsFor 'all'),    "All"]]
      ['li', ['a', (attrsFor 'active'), "Active"]]
      ['li', ['a', (attrsFor 'done'),   "Completed"]]]
    done > 0 and
      ['button#clear-completed', onclick: clearDone
        "Clear completed ", done]]

todoItem = ->
  editing = r.atom off
  ({id, done, title}) ->
    ['li', {class: {completed: done,  editing: (deref editing)}}
      ['div.view'
        ['input.toggle', {type: 'checkbox',  checked: done,\\
                          onchange: (-> toggle id)}]
        ['label', {ondblclick: (-> reset editing, on)}, title]
        ['button.destroy', onclick: (-> remove id)]]
      (deref editing) and
        [todoEdit, {className: 'edit',  title,\\
                    onsave: ((it) -> save id, it),\\
                    onstop: (-> reset editing, off)}]]

todoApp = ->
  filt = r.atom 'all'
  ->
    items = vals (deref todos)
    done = items.filter((it) -> it.done).length
    active = items.length - done
    ['div'
      ['section#todoapp'
        ['header#header'
          ['h1', "todos"]
          [todoInput, {id:          'new-todo',\\
                       placeholder: "What needs to be done?",\\
                       onsave:      addTodo}]]
        items.length > 0 and
          ['div'
            ['section#main'
              ['input#toggle-all', {type: 'checkbox', checked: active is 0,\\
                                    onchange: -> completeAll (active > 0)}]
              ['label', {for: 'toggle-all'}, "Mark all as complete"]
              ['ul#todo-list'
                ...items.filter(
                  if (deref filt) is 'active' then ((it) -> not it.done) else \\
                  if (deref filt) is 'done'   then ((it) -> it.done)     else \\
                  identity
                ).map (todo) ->
                  (r.with {key: todo.id}, [todoItem, todo])]]
            ['footer#footer'
              [todoStats, {active, done, filt}]]]]
      ['footer#info'
        ['p', "Double-click to edit a todo"]]]


# init
addTodo "Rename Cloact to Reagent"
addTodo "Add undo demo"
addTodo "Make all rendering async"
addTodo "Allow any arguments to component functions"
completeAll true

r.render [todoApp], (document.getElementById 'app')`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reagent"], ": r, ", ['span.keyword', "atom"], ": ", ['span.paren.level2', "{"], ['span.reserved', "deref"], ", ", ['span.reserved', "reset"], ", ", ['span.reserved', "swap"], ['span.paren.level2', "}"], ",\n",
        " ", ['span.keyword', "util"], ": ", ['span.paren.level2', "{"], ['span.reserved', "identity"], ", ", ['span.reserved', "dict"], ", ", ['span.reserved', "entries"], ", ", ['span.reserved', "vals"], ", ", ['span.reserved', "getIn"], ",\n",
        "        ", ['span.reserved', "assoc"], ", ", ['span.reserved', "assocIn"], ", ", ['span.reserved', "dissoc"], ", ", ['span.reserved', "updateIn"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        ['span.paren.level1', "{"], ['span.reserved', "map"], ", ", ['span.reserved', "filter"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'lodash'"], "\n",
        "\n",
        ['span.declaration', "todos"], "   ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " ", ['span.paren.level1', "{"], ['span.paren.level1', "}"], "\n",
        ['span.declaration', "counter"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " 0\n",
        "\n",
        ['span.declaration', "addTodo"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "text", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  id ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.reserved', "swap"], " counter, ", ['span.paren.level2', "("], "n", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " n ", ['span.reserved', "+"], " 1", ['span.paren.level1', ")"], "\n",
        "  ", ['span.reserved', "swap"], " todos, ", ['span.reserved', "assoc"], ", id, ", ['span.paren.level1', "{"], "id,  ", ['span.keyword', "title"], ": text,  ", ['span.keyword', "done"], ": ", ['span.reserved', "no"], ['span.paren.level1', "}"], "\n",
        "\n",
        ['span.declaration', "toggle"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "id", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "swap"], " todos, ", ['span.reserved', "updateIn"], ", ", ['span.paren.level1', "["], "id, ", ['span.keyword', "'done'"], ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], "it", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "not"], " it\n",
        ['span.declaration', "save"], "   ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "id, title", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "swap"], " todos, ", ['span.reserved', "assocIn"], ", ", ['span.paren.level1', "["], "id, ", ['span.keyword', "'title'"], ['span.paren.level1', "]"], ", title\n",
        ['span.declaration', "remove"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "id", ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "swap"], " todos, ", ['span.reserved', "dissoc"], ", id\n",
        "\n",
        ['span.declaration', "mmap"], "        ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "o, f, arg", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "dict"], " ", ['span.paren.level1', "("], "f ", ['span.paren.level2', "("], ['span.reserved', "entries"], " o", ['span.paren.level2', ")"], ", arg", ['span.paren.level1', ")"], "\n",
        ['span.declaration', "completeAll"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "v", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "swap"], " todos, mmap, ", ['span.reserved', "map"], ",    ", ['span.paren.level1', "("], "it", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "assocIn"], " it, ", ['span.paren.level1', "["], "1, ", ['span.keyword', "'done'"], ['span.paren.level1', "]"], ", v\n",
        ['span.declaration', "clearDone"], "   ", ['span.reserved', "="], "     ", ['span.reserved', "->"], " ", ['span.reserved', "swap"], " todos, mmap, ", ['span.reserved', "filter"], ", ", ['span.paren.level1', "("], "it", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "not"], " ", ['span.paren.level1', "("], ['span.reserved', "getIn"], " it, ", ['span.paren.level2', "["], "1, ", ['span.keyword', "'done'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.declaration', "todoInput"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "title, onsave, onstop", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  val ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " ", ['span.paren.level1', "("], "title ", ['span.reserved', "or"], " ", ['span.string', "\"\""], ['span.paren.level1', ")"], "\n",
        "  stop ", ['span.reserved', "="], " ", ['span.reserved', "->"], " ", ['span.reserved', "reset"], " val, ", ['span.string', "\"\""], ";   onstop?", ['span.paren.level1', "("], ['span.paren.level1', ")"], "\n",
        "  save ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "    v ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.reserved', "deref"], " val", ['span.paren.level1', ")"], ".trim", ['span.paren.level1', "("], ['span.paren.level1', ")"], "\n",
        "    v ", ['span.reserved', "and"], " ", ['span.paren.level1', "("], "onsave v", ['span.paren.level1', ")"], "\n",
        "    stop", ['span.paren.level1', "("], ['span.paren.level1', ")"], "\n",
        "  ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "id, className, placeholder", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "    ", ['span.paren.level1', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "type"], ": ", ['span.keyword', "'text'"], ",  ", ['span.keyword', "value"], ": ", ['span.paren.level3', "("], ['span.reserved', "deref"], " val", ['span.paren.level3', ")"], ",\\\n",
        "               id,  className,  placeholder,\\\n",
        "               ", ['span.keyword', "onblur"], ": save,\\\n",
        "               ", ['span.keyword', "oninput"], ":   ", ['span.paren.level3', "("], ['span.paren.level1', "("], "e", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "reset"], " val, e.target.value", ['span.paren.level3', ")"], ",\\\n",
        "               ", ['span.keyword', "onkeydown"], ": ", ['span.paren.level3', "("], ['span.paren.level1', "("], "e", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "switch"], " e.which\n",
        "                 ", ['span.reserved', "when"], " 13 ", ['span.reserved', "then"], " save", ['span.paren.level1', "("], ['span.paren.level1', ")"], "\n",
        "                 ", ['span.reserved', "when"], " 26 ", ['span.reserved', "then"], " stop", ['span.paren.level1', "("], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.declaration', "todoEdit"], " ", ['span.reserved', "="], " ", ['span.reserved', "r.createClass"], "  ", ['span.comment', "# not quite equivalent to the original code"], "\n",
        "  ", ['span.keyword', "componentDidMount"], ": ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "dom", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " dom.focus", ['span.paren.level1', "("], ['span.paren.level1', ")"], "\n",
        "  ", ['span.keyword', "reagentRender"], ":     ", ['span.paren.level1', "("], "params", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level1', "["], "todoInput, params", ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "todoStats"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "filt, active, done", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  attrsFor ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "name", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level1', "{"], ['span.keyword', "class"], ": ", ['span.paren.level2', "["], ['span.paren.level3', "("], "name ", ['span.reserved', "is"], " ", ['span.reserved', "deref"], " filt", ['span.paren.level3', ")"], " ", ['span.reserved', "and"], " ", ['span.keyword', "'selected'"], ['span.paren.level2', "]"], ",\\\n",
        "                        ", ['span.keyword', "onclick"], ": ", ['span.paren.level2', "("], ['span.reserved', "->"], " ", ['span.reserved', "reset"], " filt, name", ['span.paren.level2', ")"], ['span.paren.level1', "}"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'span#todo-count'"], "\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'strong'"], ", active", ['span.paren.level3', "]"], ", ", ['span.string', "\" \""], ", ", ['span.paren.level3', "("], ['span.reserved', "if"], " active ", ['span.reserved', "is"], " 1 ", ['span.reserved', "then"], " ", ['span.string', "\"item\""], " ", ['span.reserved', "else"], " ", ['span.string', "\"items\""], ['span.paren.level3', ")"], ", ", ['span.string', "\" left\""], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'ul#filters'"], "\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'li'"], ", ", ['span.paren.level1', "["], ['span.keyword', "'a'"], ", ", ['span.paren.level2', "("], "attrsFor ", ['span.keyword', "'all'"], ['span.paren.level2', ")"], ",    ", ['span.string', "\"All\""], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'li'"], ", ", ['span.paren.level1', "["], ['span.keyword', "'a'"], ", ", ['span.paren.level2', "("], "attrsFor ", ['span.keyword', "'active'"], ['span.paren.level2', ")"], ", ", ['span.string', "\"Active\""], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "      ", ['span.paren.level3', "["], ['span.keyword', "'li'"], ", ", ['span.paren.level1', "["], ['span.keyword', "'a'"], ", ", ['span.paren.level2', "("], "attrsFor ", ['span.keyword', "'done'"], ['span.paren.level2', ")"], ",   ", ['span.string', "\"Completed\""], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "    done ", ['span.reserved', ">"], " 0 ", ['span.reserved', "and"], "\n",
        "      ", ['span.paren.level2', "["], ['span.keyword', "'button#clear-completed'"], ", ", ['span.keyword', "onclick"], ": clearDone\n",
        "        ", ['span.string', "\"Clear completed \""], ", done", ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "todoItem"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  editing ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " ", ['span.reserved', "off"], "\n",
        "  ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "id, done, title", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "    ", ['span.paren.level1', "["], ['span.keyword', "'li'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "class"], ": ", ['span.paren.level3', "{"], ['span.keyword', "completed"], ": done,  ", ['span.keyword', "editing"], ": ", ['span.paren.level1', "("], ['span.reserved', "deref"], " editing", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "}"], "\n",
        "      ", ['span.paren.level2', "["], ['span.keyword', "'div.view'"], "\n",
        "        ", ['span.paren.level3', "["], ['span.keyword', "'input.toggle'"], ", ", ['span.paren.level1', "{"], ['span.keyword', "type"], ": ", ['span.keyword', "'checkbox'"], ",  ", ['span.keyword', "checked"], ": done,\\\n",
        "                          ", ['span.keyword', "onchange"], ": ", ['span.paren.level2', "("], ['span.reserved', "->"], " toggle id", ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], "\n",
        "        ", ['span.paren.level3', "["], ['span.keyword', "'label'"], ", ", ['span.paren.level1', "{"], ['span.keyword', "ondblclick"], ": ", ['span.paren.level2', "("], ['span.reserved', "->"], " ", ['span.reserved', "reset"], " editing, ", ['span.reserved', "on"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], ", title", ['span.paren.level3', "]"], "\n",
        "        ", ['span.paren.level3', "["], ['span.keyword', "'button.destroy'"], ", ", ['span.keyword', "onclick"], ": ", ['span.paren.level1', "("], ['span.reserved', "->"], " remove id", ['span.paren.level1', ")"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "      ", ['span.paren.level2', "("], ['span.reserved', "deref"], " editing", ['span.paren.level2', ")"], " ", ['span.reserved', "and"], "\n",
        "        ", ['span.paren.level2', "["], "todoEdit, ", ['span.paren.level3', "{"], ['span.keyword', "className"], ": ", ['span.keyword', "'edit'"], ",  title,\\\n",
        "                    ", ['span.keyword', "onsave"], ": ", ['span.paren.level1', "("], ['span.paren.level2', "("], "it", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " save id, it", ['span.paren.level1', ")"], ",\\\n",
        "                    ", ['span.keyword', "onstop"], ": ", ['span.paren.level1', "("], ['span.reserved', "->"], " ", ['span.reserved', "reset"], " editing, ", ['span.reserved', "off"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "todoApp"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  filt ", ['span.reserved', "="], " ", ['span.reserved', "r.atom"], " ", ['span.keyword', "'all'"], "\n",
        "  ", ['span.reserved', "->"], "\n",
        "    items ", ['span.reserved', "="], " ", ['span.reserved', "vals"], " ", ['span.paren.level1', "("], ['span.reserved', "deref"], " todos", ['span.paren.level1', ")"], "\n",
        "    done ", ['span.reserved', "="], " items.filter", ['span.paren.level1', "("], ['span.paren.level2', "("], "it", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " it.done", ['span.paren.level1', ")"], ".length\n",
        "    active ", ['span.reserved', "="], " items.length - done\n",
        "    ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "      ", ['span.paren.level2', "["], ['span.keyword', "'section#todoapp'"], "\n",
        "        ", ['span.paren.level3', "["], ['span.keyword', "'header#header'"], "\n",
        "          ", ['span.paren.level1', "["], ['span.keyword', "'h1'"], ", ", ['span.string', "\"todos\""], ['span.paren.level1', "]"], "\n",
        "          ", ['span.paren.level1', "["], "todoInput, ", ['span.paren.level2', "{"], ['span.keyword', "id"], ":          ", ['span.keyword', "'new-todo'"], ",\\\n",
        "                       ", ['span.keyword', "placeholder"], ": ", ['span.string', "\"What needs to be done?\""], ",\\\n",
        "                       ", ['span.keyword', "onsave"], ":      addTodo", ['span.paren.level2', "}"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "        items.length ", ['span.reserved', ">"], " 0 ", ['span.reserved', "and"], "\n",
        "          ", ['span.paren.level3', "["], ['span.keyword', "'div'"], "\n",
        "            ", ['span.paren.level1', "["], ['span.keyword', "'section#main'"], "\n",
        "              ", ['span.paren.level2', "["], ['span.keyword', "'input#toggle-all'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "type"], ": ", ['span.keyword', "'checkbox'"], ", ", ['span.keyword', "checked"], ": active ", ['span.reserved', "is"], " 0,\\\n",
        "                                    ", ['span.keyword', "onchange"], ": ", ['span.reserved', "->"], " completeAll ", ['span.paren.level1', "("], "active ", ['span.reserved', ">"], " 0", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], "\n",
        "              ", ['span.paren.level2', "["], ['span.keyword', "'label'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "for"], ": ", ['span.keyword', "'toggle-all'"], ['span.paren.level3', "}"], ", ", ['span.string', "\"Mark all as complete\""], ['span.paren.level2', "]"], "\n",
        "              ", ['span.paren.level2', "["], ['span.keyword', "'ul#todo-list'"], "\n",
        "                ", ['span.reserved', "..."], "items.filter", ['span.paren.level3', "("], "\n",
        "                  ", ['span.reserved', "if"], " ", ['span.paren.level1', "("], ['span.reserved', "deref"], " filt", ['span.paren.level1', ")"], " ", ['span.reserved', "is"], " ", ['span.keyword', "'active'"], " ", ['span.reserved', "then"], " ", ['span.paren.level1', "("], ['span.paren.level2', "("], "it", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "not"], " it.done", ['span.paren.level1', ")"], " ", ['span.reserved', "else"], " \\\n",
        "                  ", ['span.reserved', "if"], " ", ['span.paren.level1', "("], ['span.reserved', "deref"], " filt", ['span.paren.level1', ")"], " ", ['span.reserved', "is"], " ", ['span.keyword', "'done'"], "   ", ['span.reserved', "then"], " ", ['span.paren.level1', "("], ['span.paren.level2', "("], "it", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " it.done", ['span.paren.level1', ")"], "     ", ['span.reserved', "else"], " \\\n",
        "                  ", ['span.reserved', "identity"], "\n",
        "                ", ['span.paren.level3', ")"], ".map ", ['span.paren.level3', "("], "todo", ['span.paren.level3', ")"], " ", ['span.reserved', "->"], "\n",
        "                  ", ['span.paren.level3', "("], ['span.reserved', "r.with"], " ", ['span.paren.level1', "{"], ['span.keyword', "key"], ": todo.id", ['span.paren.level1', "}"], ", ", ['span.paren.level1', "["], "todoItem, todo", ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "            ", ['span.paren.level1', "["], ['span.keyword', "'footer#footer'"], "\n",
        "              ", ['span.paren.level2', "["], "todoStats, ", ['span.paren.level3', "{"], "active, done, filt", ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "      ", ['span.paren.level2', "["], ['span.keyword', "'footer#info'"], "\n",
        "        ", ['span.paren.level3', "["], ['span.keyword', "'p'"], ", ", ['span.string', "\"Double-click to edit a todo\""], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "\n",
        "\n",
        ['span.comment', "# init"], "\n",
        "addTodo ", ['span.string', "\"Rename Cloact to Reagent\""], "\n",
        "addTodo ", ['span.string', "\"Add undo demo\""], "\n",
        "addTodo ", ['span.string', "\"Make all rendering async\""], "\n",
        "addTodo ", ['span.string', "\"Allow any arguments to component functions\""], "\n",
        "completeAll ", ['span.reserved', "true"], "\n",
        "\n",
        ['span.reserved', "r.render"], " ", ['span.paren.level1', "["], "todoApp", ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], ['span.reserved', "document.getElementById"], " ", ['span.keyword', "'app'"], ['span.paren.level1', ")"]],
    wisp: (
`(ns example.bmi-component
    (:require [wisp.runtime :refer [= identity inc vals]]
              [wisp.sequence :refer [count into empty? assoc dissoc map filter
                                     lazy-seq first rest cons]] ; user by (for)
              [wisp.string :as s]
              [mreframe.util :refer [get-in assoc-in update-in]]
              [mreframe.atom :refer [deref reset! swap!]]
              [mreframe.reagent :as r]))

(def todos   (r/atom {}))
(def counter (r/atom 0))

(defn add-todo! [text]
  (let [id (swap! counter inc)]
    (swap! todos assoc id {:id id,  :title text,  :done false})))

(defn toggle! [id] (swap! todos update-in [id :done] #(not %)))
(defn save!   [id, title] (swap! todos assoc-in [id :title] title))
(defn remove! [id] (swap! todos dissoc id))

(defn mmap          [o f arg] (into {} (f arg o)))
(defn complete-all! [v]  (swap! todos mmap map    #(assoc-in % [1 :done] v)))
(defn clear-done!   []   (swap! todos mmap filter #(not (get-in % [1 :done]))))


(defn todo-input [{:keys [title onsave onstop]}]
  (let [val   (r/atom (or title ""))
        stop! #(do (reset val "")
                   (if onstop (onstop!)))
        save! #(do (let [v (s/trim @val)]
                     (if-not (empty? v) (onsave! v))
                     (stop!)))]
    (fn [{:keys [id class placeholder]}]
      [:input {:type :text,  :value @val
               :id id,  :class class,  :placeholder placeholder
               :onblur save!
               :oninput   #(reset! val (-> % :target :value))
               :onkeydown #(case (:which %)
                             13 (save!)
                             26 (stop!)
                             nil)}])))

(def todo-edit
  (r/create-class  ; not quite equivalent to the original code
    {:component-did-mount #(-> % :dom .focus!)
     :reagent-render      (fn [params] [todo-input params])}))

(defn todo-stats [{:keys [filt active done]}]
  (let [attrs-for (fn [name]
                    {:class   [(if (= name @filt) :selected)]
                     :onclick #(reset! filt name)})]
    [:div
      [:span#todo-count
        [:strong active] " " (if (= active 1) "item" "items") " left"]
      [:ul#filters
        [:li [:a (attrs-for :all)    "All"]]
        [:li [:a (attrs-for :active) "Active"]]
        [:li [:a (attrs-for :done)   "Completed"]]]
      (when (> done 0)
        [:button#clear-completed {:onclick clear-done!}
          "Clear completed " done])]))

(defn todo-item []
  (let [editing (r/atom false)]
    (fn [{:keys [id done title]}]
      [:li {:class {:completed done,  :editing @editing}}
        [:div.view
          [:input.toggle {:type :checkbox,  :checked done
                          :onchange #(toggle! id)}]
          [:label {:ondblclick #(reset! editing true)} title]
          [:button.destroy {:onclick #(remove id)}]]
        (when @editing
          [todo-edit {:class :edit,  :title title
                      :onsave #(save! id %)
                      :onstop #(reset! editing false)}])])))

(defn todo-app []
  (let [filt (r/atom :all)]
    (fn []
      (let [items  (vals @todos)
            done   (->> items (filter #(:done %)) count)
            active (- (count items) done)]
        [:div
          [:section#todoapp
            [:header#header
              [:h1 "todos"]
              [todo-input {:id          :new-todo
                           :placeholder "What needs to be done?"
                           :onsave      add-todo!}]]
            (when (> (count items) 0)
              [:div
                [:section#main
                  [:input#toggle-all {:type :checkbox,  :checked (= active 0)
                                      :onchange #(complete-all! (> active 0))}]
                  [:label {:for :toggle-all} "Mark all as complete"]
                  (into [:ul#todo-list]
                    (for [todo (filter (case @filt
                                         :active #(not (:done %))
                                         :done   #(:done %)
                                         identity)
                                       items)]
                      (r/with {:key todo.id} [todo-item todo])))]
                [:footer#footer
                  [todo-stats {:active active,  :done done,  :filt filt}]]])]
          [:footer#info
            [:p "Double-click to edit a todo"]]]))))


;; init
(add-todo! "Rename Cloact to Reagent")
(add-todo! "Add undo demo")
(add-todo! "Make all rendering async")
(add-todo! "Allow any arguments to component functions")
(complete-all! true)

(r/render [todo-app] (document/get-element-by-id :app))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.bmi-component"], "\n",
        "    ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "="], " ", ['span.reserved', "identity"], " ", ['span.reserved', "inc"], " ", ['span.reserved', "vals"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "count"], " ", ['span.reserved', "into"], " ", ['span.reserved', "empty?"], " ", ['span.reserved', "assoc"], " ", ['span.reserved', "dissoc"], " ", ['span.reserved', "map"], " ", ['span.reserved', "filter"], "\n",
        "                                     ", ['span.reserved', "lazy-seq"], " ", ['span.reserved', "first"], " ", ['span.reserved', "rest"], " ", ['span.reserved', "cons"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.comment', "; user by (for)"], "\n",
        "              ", ['span.paren.level3', "["], "wisp.string ", ['span.keyword', ":as"], " s", ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.util ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "get-in"], " ", ['span.reserved', "assoc-in"], " ", ['span.reserved', "update-in"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.atom ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "deref"], " ", ['span.reserved', "reset!"], " ", ['span.reserved', "swap!"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "              ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "todos"], "   ", ['span.paren.level2', "("], ['span.reserved', "r/atom"], " ", ['span.paren.level3', "{"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "counter"], " ", ['span.paren.level2', "("], ['span.reserved', "r/atom"], " 0", ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "add-todo!"], " ", ['span.paren.level2', "["], "text", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "id ", ['span.paren.level1', "("], ['span.reserved', "swap!"], " counter ", ['span.reserved', "inc"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "swap!"], " todos ", ['span.reserved', "assoc"], " id ", ['span.paren.level1', "{"], ['span.keyword', ":id"], " id,  ", ['span.keyword', ":title"], " text,  ", ['span.keyword', ":done"], " ", ['span.reserved', "false"], ['span.paren.level1', "}"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "toggle!"], " ", ['span.paren.level2', "["], "id", ['span.paren.level2', "]"], " ", ['span.paren.level2', "("], ['span.reserved', "swap!"], " todos ", ['span.reserved', "update-in"], " ", ['span.paren.level3', "["], "id ", ['span.keyword', ":done"], ['span.paren.level3', "]"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "not"], " ", ['span.reserved', "%"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "save!"], "   ", ['span.paren.level2', "["], "id, title", ['span.paren.level2', "]"], " ", ['span.paren.level2', "("], ['span.reserved', "swap!"], " todos ", ['span.reserved', "assoc-in"], " ", ['span.paren.level3', "["], "id ", ['span.keyword', ":title"], ['span.paren.level3', "]"], " title", ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "remove!"], " ", ['span.paren.level2', "["], "id", ['span.paren.level2', "]"], " ", ['span.paren.level2', "("], ['span.reserved', "swap!"], " todos ", ['span.reserved', "dissoc"], " id", ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "mmap"], "          ", ['span.paren.level2', "["], "o f arg", ['span.paren.level2', "]"], " ", ['span.paren.level2', "("], ['span.reserved', "into"], " ", ['span.paren.level3', "{"], ['span.paren.level3', "}"], " ", ['span.paren.level3', "("], "f arg o", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "complete-all!"], " ", ['span.paren.level2', "["], "v", ['span.paren.level2', "]"], "  ", ['span.paren.level2', "("], ['span.reserved', "swap!"], " todos mmap ", ['span.reserved', "map"], "    ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "assoc-in"], " ", ['span.reserved', "%"], " ", ['span.paren.level1', "["], "1 ", ['span.keyword', ":done"], ['span.paren.level1', "]"], " v", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "clear-done!"], "   ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "   ", ['span.paren.level2', "("], ['span.reserved', "swap!"], " todos mmap ", ['span.reserved', "filter"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "not"], " ", ['span.paren.level1', "("], ['span.reserved', "get-in"], " ", ['span.reserved', "%"], " ", ['span.paren.level2', "["], "1 ", ['span.keyword', ":done"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "todo-input"], " ", ['span.paren.level2', "["], ['span.paren.level3', "{"], ['span.keyword', ":keys"], " ", ['span.paren.level1', "["], "title onsave onstop", ['span.paren.level1', "]"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "val   ", ['span.paren.level1', "("], ['span.reserved', "r/atom"], " ", ['span.paren.level2', "("], ['span.reserved', "or"], " title ", ['span.string', "\"\""], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "        stop! ", ['span.reserved', "#"], ['span.paren.level1', "("], ['span.reserved', "do"], " ", ['span.paren.level2', "("], "reset val ", ['span.string', "\"\""], ['span.paren.level2', ")"], "\n",
        "                   ", ['span.paren.level2', "("], ['span.reserved', "if"], " onstop ", ['span.paren.level3', "("], "onstop!", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "        save! ", ['span.reserved', "#"], ['span.paren.level1', "("], ['span.reserved', "do"], " ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "v ", ['span.paren.level1', "("], ['span.reserved', "s/trim"], " ", ['span.reserved', "@"], "val", ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "                     ", ['span.paren.level3', "("], ['span.reserved', "if-not"], " ", ['span.paren.level1', "("], ['span.reserved', "empty?"], " v", ['span.paren.level1', ")"], " ", ['span.paren.level1', "("], "onsave! v", ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        "                     ", ['span.paren.level3', "("], "stop!", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "fn"], " ", ['span.paren.level1', "["], ['span.paren.level2', "{"], ['span.keyword', ":keys"], " ", ['span.paren.level3', "["], "id class placeholder", ['span.paren.level3', "]"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":input"], " ", ['span.paren.level2', "{"], ['span.keyword', ":type"], " ", ['span.keyword', ":text,"], "  ", ['span.keyword', ":value"], " ", ['span.reserved', "@"], "val\n",
        "               ", ['span.keyword', ":id"], " id,  ", ['span.keyword', ":class"], " class,  ", ['span.keyword', ":placeholder"], " placeholder\n",
        "               ", ['span.keyword', ":onblur"], " save!\n",
        "               ", ['span.keyword', ":oninput"], "   ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "reset!"], " val ", ['span.paren.level1', "("], ['span.reserved', "->"], " ", ['span.reserved', "%"], " ", ['span.keyword', ":target"], " ", ['span.keyword', ":value"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        "               ", ['span.keyword', ":onkeydown"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "case"], " ", ['span.paren.level1', "("], ['span.keyword', ":which"], " ", ['span.reserved', "%"], ['span.paren.level1', ")"], "\n",
        "                             13 ", ['span.paren.level1', "("], "save!", ['span.paren.level1', ")"], "\n",
        "                             26 ", ['span.paren.level1', "("], "stop!", ['span.paren.level1', ")"], "\n",
        "                             nil", ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "todo-edit"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "r/create-class"], "  ", ['span.comment', "; not quite equivalent to the original code"], "\n",
        "    ", ['span.paren.level3', "{"], ['span.keyword', ":component-did-mount"], " ", ['span.reserved', "#"], ['span.paren.level1', "("], ['span.reserved', "->"], " ", ['span.reserved', "%"], " ", ['span.keyword', ":dom"], " .focus!", ['span.paren.level1', ")"], "\n",
        "     ", ['span.keyword', ":reagent-render"], "      ", ['span.paren.level1', "("], ['span.reserved', "fn"], " ", ['span.paren.level2', "["], "params", ['span.paren.level2', "]"], " ", ['span.paren.level2', "["], "todo-input params", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "todo-stats"], " ", ['span.paren.level2', "["], ['span.paren.level3', "{"], ['span.keyword', ":keys"], " ", ['span.paren.level1', "["], "filt active done", ['span.paren.level1', "]"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "attrs-for ", ['span.paren.level1', "("], ['span.reserved', "fn"], " ", ['span.paren.level2', "["], "name", ['span.paren.level2', "]"], "\n",
        "                    ", ['span.paren.level2', "{"], ['span.keyword', ":class"], "   ", ['span.paren.level3', "["], ['span.paren.level1', "("], ['span.reserved', "if"], " ", ['span.paren.level2', "("], ['span.reserved', "="], " name ", ['span.reserved', "@"], "filt", ['span.paren.level2', ")"], " ", ['span.keyword', ":selected"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "                     ", ['span.keyword', ":onclick"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "reset!"], " filt name", ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":div"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":span#todo-count"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":strong"], " active", ['span.paren.level2', "]"], " ", ['span.string', "\" \""], " ", ['span.paren.level2', "("], ['span.reserved', "if"], " ", ['span.paren.level3', "("], ['span.reserved', "="], " active 1", ['span.paren.level3', ")"], " ", ['span.string', "\"item\""], " ", ['span.string', "\"items\""], ['span.paren.level2', ")"], " ", ['span.string', "\" left\""], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":ul#filters"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":li"], " ", ['span.paren.level3', "["], ['span.keyword', ":a"], " ", ['span.paren.level1', "("], "attrs-for ", ['span.keyword', ":all"], ['span.paren.level1', ")"], "    ", ['span.string', "\"All\""], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":li"], " ", ['span.paren.level3', "["], ['span.keyword', ":a"], " ", ['span.paren.level1', "("], "attrs-for ", ['span.keyword', ":active"], ['span.paren.level1', ")"], " ", ['span.string', "\"Active\""], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":li"], " ", ['span.paren.level3', "["], ['span.keyword', ":a"], " ", ['span.paren.level1', "("], "attrs-for ", ['span.keyword', ":done"], ['span.paren.level1', ")"], "   ", ['span.string', "\"Completed\""], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "("], ['span.reserved', "when"], " ", ['span.paren.level2', "("], ['span.reserved', ">"], " done 0", ['span.paren.level2', ")"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":button#clear-completed"], " ", ['span.paren.level3', "{"], ['span.keyword', ":onclick"], " clear-done!", ['span.paren.level3', "}"], "\n",
        "          ", ['span.string', "\"Clear completed \""], " done", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "todo-item"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "editing ", ['span.paren.level1', "("], ['span.reserved', "r/atom"], " ", ['span.reserved', "false"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "fn"], " ", ['span.paren.level1', "["], ['span.paren.level2', "{"], ['span.keyword', ":keys"], " ", ['span.paren.level3', "["], "id done title", ['span.paren.level3', "]"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "["], ['span.keyword', ":li"], " ", ['span.paren.level2', "{"], ['span.keyword', ":class"], " ", ['span.paren.level3', "{"], ['span.keyword', ":completed"], " done,  ", ['span.keyword', ":editing"], " ", ['span.reserved', "@"], "editing", ['span.paren.level3', "}"], ['span.paren.level2', "}"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":div.view"], "\n",
        "          ", ['span.paren.level3', "["], ['span.keyword', ":input.toggle"], " ", ['span.paren.level1', "{"], ['span.keyword', ":type"], " ", ['span.keyword', ":checkbox,"], "  ", ['span.keyword', ":checked"], " done\n",
        "                          ", ['span.keyword', ":onchange"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], "toggle! id", ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], "\n",
        "          ", ['span.paren.level3', "["], ['span.keyword', ":label"], " ", ['span.paren.level1', "{"], ['span.keyword', ":ondblclick"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.reserved', "reset!"], " editing ", ['span.reserved', "true"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], " title", ['span.paren.level3', "]"], "\n",
        "          ", ['span.paren.level3', "["], ['span.keyword', ":button.destroy"], " ", ['span.paren.level1', "{"], ['span.keyword', ":onclick"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], "remove id", ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "        ", ['span.paren.level2', "("], ['span.reserved', "when"], " ", ['span.reserved', "@"], "editing\n",
        "          ", ['span.paren.level3', "["], "todo-edit ", ['span.paren.level1', "{"], ['span.keyword', ":class"], " ", ['span.keyword', ":edit,"], "  ", ['span.keyword', ":title"], " title\n",
        "                      ", ['span.keyword', ":onsave"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], "save! id ", ['span.reserved', "%"], ['span.paren.level2', ")"], "\n",
        "                      ", ['span.keyword', ":onstop"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.reserved', "reset!"], " editing ", ['span.reserved', "false"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "todo-app"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "let"], " ", ['span.paren.level3', "["], "filt ", ['span.paren.level1', "("], ['span.reserved', "r/atom"], " ", ['span.keyword', ":all"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "fn"], " ", ['span.paren.level1', "["], ['span.paren.level1', "]"], "\n",
        "      ", ['span.paren.level1', "("], ['span.reserved', "let"], " ", ['span.paren.level2', "["], "items  ", ['span.paren.level3', "("], ['span.reserved', "vals"], " ", ['span.reserved', "@"], "todos", ['span.paren.level3', ")"], "\n",
        "            done   ", ['span.paren.level3', "("], ['span.reserved', "->>"], " items ", ['span.paren.level1', "("], ['span.reserved', "filter"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.keyword', ":done"], " ", ['span.reserved', "%"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], " ", ['span.reserved', "count"], ['span.paren.level3', ")"], "\n",
        "            active ", ['span.paren.level3', "("], "- ", ['span.paren.level1', "("], ['span.reserved', "count"], " items", ['span.paren.level1', ")"], " done", ['span.paren.level3', ")"], ['span.paren.level2', "]"], "\n",
        "        ", ['span.paren.level2', "["], ['span.keyword', ":div"], "\n",
        "          ", ['span.paren.level3', "["], ['span.keyword', ":section#todoapp"], "\n",
        "            ", ['span.paren.level1', "["], ['span.keyword', ":header#header"], "\n",
        "              ", ['span.paren.level2', "["], ['span.keyword', ":h1"], " ", ['span.string', "\"todos\""], ['span.paren.level2', "]"], "\n",
        "              ", ['span.paren.level2', "["], "todo-input ", ['span.paren.level3', "{"], ['span.keyword', ":id"], "          ", ['span.keyword', ":new-todo"], "\n",
        "                           ", ['span.keyword', ":placeholder"], " ", ['span.string', "\"What needs to be done?\""], "\n",
        "                           ", ['span.keyword', ":onsave"], "      add-todo!", ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "            ", ['span.paren.level1', "("], ['span.reserved', "when"], " ", ['span.paren.level2', "("], ['span.reserved', ">"], " ", ['span.paren.level3', "("], ['span.reserved', "count"], " items", ['span.paren.level3', ")"], " 0", ['span.paren.level2', ")"], "\n",
        "              ", ['span.paren.level2', "["], ['span.keyword', ":div"], "\n",
        "                ", ['span.paren.level3', "["], ['span.keyword', ":section#main"], "\n",
        "                  ", ['span.paren.level1', "["], ['span.keyword', ":input#toggle-all"], " ", ['span.paren.level2', "{"], ['span.keyword', ":type"], " ", ['span.keyword', ":checkbox,"], "  ", ['span.keyword', ":checked"], " ", ['span.paren.level3', "("], ['span.reserved', "="], " active 0", ['span.paren.level3', ")"], "\n",
        "                                      ", ['span.keyword', ":onchange"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], "complete-all! ", ['span.paren.level1', "("], ['span.reserved', ">"], " active 0", ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], "\n",
        "                  ", ['span.paren.level1', "["], ['span.keyword', ":label"], " ", ['span.paren.level2', "{"], ['span.keyword', ":for"], " ", ['span.keyword', ":toggle-all"], ['span.paren.level2', "}"], " ", ['span.string', "\"Mark all as complete\""], ['span.paren.level1', "]"], "\n",
        "                  ", ['span.paren.level1', "("], ['span.reserved', "into"], " ", ['span.paren.level2', "["], ['span.keyword', ":ul#todo-list"], ['span.paren.level2', "]"], "\n",
        "                    ", ['span.paren.level2', "("], ['span.reserved', "for"], " ", ['span.paren.level3', "["], "todo ", ['span.paren.level1', "("], ['span.reserved', "filter"], " ", ['span.paren.level2', "("], ['span.reserved', "case"], " ", ['span.reserved', "@"], "filt\n",
        "                                         ", ['span.keyword', ":active"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "not"], " ", ['span.paren.level1', "("], ['span.keyword', ":done"], " ", ['span.reserved', "%"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        "                                         ", ['span.keyword', ":done"], "   ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.keyword', ":done"], " ", ['span.reserved', "%"], ['span.paren.level3', ")"], "\n",
        "                                         ", ['span.reserved', "identity"], ['span.paren.level2', ")"], "\n",
        "                                       items", ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "                      ", ['span.paren.level3', "("], ['span.reserved', "r/with"], " ", ['span.paren.level1', "{"], ['span.keyword', ":key"], " todo.id", ['span.paren.level1', "}"], " ", ['span.paren.level1', "["], "todo-item todo", ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "                ", ['span.paren.level3', "["], ['span.keyword', ":footer#footer"], "\n",
        "                  ", ['span.paren.level1', "["], "todo-stats ", ['span.paren.level2', "{"], ['span.keyword', ":active"], " active,  ", ['span.keyword', ":done"], " done,  ", ['span.keyword', ":filt"], " filt", ['span.paren.level2', "}"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], "\n",
        "          ", ['span.paren.level3', "["], ['span.keyword', ":footer#info"], "\n",
        "            ", ['span.paren.level1', "["], ['span.keyword', ":p"], " ", ['span.string', "\"Double-click to edit a todo\""], ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; init"], "\n",
        ['span.paren.level1', "("], "add-todo! ", ['span.string', "\"Rename Cloact to Reagent\""], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], "add-todo! ", ['span.string', "\"Add undo demo\""], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], "add-todo! ", ['span.string', "\"Make all rendering async\""], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], "add-todo! ", ['span.string', "\"Allow any arguments to component functions\""], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], "complete-all! ", ['span.reserved', "true"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "r/render"], " ", ['span.paren.level2', "["], "todo-app", ['span.paren.level2', "]"], " ", ['span.paren.level2', "("], ['span.reserved', "document/get-element-by-id"], " ", ['span.keyword', ":app"], ['span.paren.level2', ")"], ['span.paren.level1', ")"]],
  },
};}
