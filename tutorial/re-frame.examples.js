/* THIS IS A GENERATED SCRIPT */
if (typeof window !== 'undefined')
  var exports = window;

{let _nodeEscape = (typeof window !== 'undefined' ? (s => s) : (s => s.replace(/set(Timeout|Interval)/g, s => "//"+s)));
exports.EXAMPLES = {
  _regEventDb: {
    className: 'simple',
    js: (
`let rf = require('mreframe/re-frame');


// replaces db state with APP_DB
rf.regEventDb('init-db', (db, event) => APP_DB);

rf.dispatchSync(['init-db']);  // immediately evoke init-db{} (i.e. before r.render)


rf.regEventDb('set-view', (db, [_, view]) => ({...db, view}));

rf.dispatch(['set-view', 'main']);  // asynchronously evoke set-view{'main'}


rf.regEventDb('add-counter', (db, [_, n=1]) => ({...db, counter: db.counter+n}));

rf.disp(['add-counter', 5]);  // asynchronously evoke add-counter{5}
// rf.disp(evt, ...args) <=> evt && rf.dispatch([...evt, ...args])`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " rf ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe/re-frame'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// replaces db state with APP_DB"], "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'init-db'"], ", ", ['span.paren.level2', "("], "db, event", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " APP_DB", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "rf.dispatchSync"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'init-db'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ";  ", ['span.comment', "// immediately evoke init-db{} (i.e. before r.render)"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'set-view'"], ", ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, view", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.reserved', "..."], "db, view", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "rf.dispatch"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'set-view'"], ", ", ['span.keyword', "'main'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ";  ", ['span.comment', "// asynchronously evoke set-view{'main'}"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'add-counter'"], ", ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, n", ['span.reserved', "="], "1", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.reserved', "..."], "db, ", ['span.keyword', "counter"], ['span.reserved', ":"], " db.counter", ['span.reserved', "+"], "n", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "rf.disp"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'add-counter'"], ", 5", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ";  ", ['span.comment', "// asynchronously evoke add-counter{5}"], "\n",
        ['span.comment', "// rf.disp(evt, ...args) <=> evt && rf.dispatch([...evt, ...args])"]],
    coffee: (
`rf = require 'mreframe/re-frame'


# replaces db state with APP_DB
rf.regEventDb 'init-db', (db, event) -> APP_DB

rf.dispatchSync ['init-db']  # immediately evoke init-db{} (i.e. before r.render)


rf.regEventDb 'set-view', (db, [_, view]) -> {...db, view}

rf.dispatch ['set-view', 'main']  # asynchronously evoke set-view{'main'}


rf.regEventDb 'add-counter', (db, [_, n=1]) -> {...db, counter: db.counter+n}

rf.disp ['add-counter', 5]  # asynchronously evoke add-counter{5}
# (rf.disp evt, ...args) <=> evt and rf.dispatch [...evt, ...args]`
    ),
    coffee_:
      ['<>',
        "rf ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe/re-frame'"], "\n",
        "\n",
        "\n",
        ['span.comment', "# replaces db state with APP_DB"], "\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'init-db'"], ", ", ['span.paren.level1', "("], "db, event", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " APP_DB\n",
        "\n",
        ['span.reserved', "rf.dispatchSync"], " ", ['span.paren.level1', "["], ['span.keyword', "'init-db'"], ['span.paren.level1', "]"], "  ", ['span.comment', "# immediately evoke init-db{} (i.e. before r.render)"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'set-view'"], ", ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "_, view", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level1', "{"], ['span.reserved', "..."], "db, view", ['span.paren.level1', "}"], "\n",
        "\n",
        ['span.reserved', "rf.dispatch"], " ", ['span.paren.level1', "["], ['span.keyword', "'set-view'"], ", ", ['span.keyword', "'main'"], ['span.paren.level1', "]"], "  ", ['span.comment', "# asynchronously evoke set-view{'main'}"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'add-counter'"], ", ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "_, n", ['span.reserved', "="], "1", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level1', "{"], ['span.reserved', "..."], "db, ", ['span.keyword', "counter"], ": db.counter", ['span.reserved', "+"], "n", ['span.paren.level1', "}"], "\n",
        "\n",
        ['span.reserved', "rf.disp"], " ", ['span.paren.level1', "["], ['span.keyword', "'add-counter'"], ", 5", ['span.paren.level1', "]"], "  ", ['span.comment', "# asynchronously evoke add-counter{5}"], "\n",
        ['span.comment', "# (rf.disp evt, ...args) <=> evt and rf.dispatch [...evt, ...args]"]],
    wisp: (
`(ns example.reg-event-db
  (:require [wisp.runtime :refer [merge]]
            [wisp.sequence :refer [nth]] ; for destructuring
            [mreframe.re-frame :as rf]))


;; replaces db state with app-db
(rf/reg-event-db :init-db
  (fn [db event] app-db))

(rf/dispatch-sync [:init-db])  ; immediately evoke init-db{} (i.e. before r/render)


(rf/reg-event-db :set-view
  (fn [db [_ view]] (merge db {:view view})))

(rf/dispatch [:set-view :main])  ; asynchronously evoke set-view{:main}


(rf/reg-event-db :add-counter
  (fn [db [_ n]] (merge db {:counter (+ db.counter (or n 1))})))

(rf/disp [:add-counter 5])  ; asynchronously evoke add-counter{5}
;; (rf/disp evt & args) <=> (and evt (rf/dispatch (into evt args)))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.reg-event-db"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "merge"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "nth"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.comment', "; for destructuring"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; replaces db state with app-db"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":init-db"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db event", ['span.paren.level3', "]"], " app-db", ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/dispatch-sync"], " ", ['span.paren.level2', "["], ['span.keyword', ":init-db"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "  ", ['span.comment', "; immediately evoke init-db{} (i.e. before r/render)"], "\n",
        "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":set-view"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "_ view", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "merge"], " db ", ['span.paren.level1', "{"], ['span.keyword', ":view"], " view", ['span.paren.level1', "}"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/dispatch"], " ", ['span.paren.level2', "["], ['span.keyword', ":set-view"], " ", ['span.keyword', ":main"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "  ", ['span.comment', "; asynchronously evoke set-view{:main}"], "\n",
        "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":add-counter"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "_ n", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "merge"], " db ", ['span.paren.level1', "{"], ['span.keyword', ":counter"], " ", ['span.paren.level2', "("], ['span.reserved', "+"], " db.counter ", ['span.paren.level3', "("], ['span.reserved', "or"], " n 1", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/disp"], " ", ['span.paren.level2', "["], ['span.keyword', ":add-counter"], " 5", ['span.paren.level2', "]"], ['span.paren.level1', ")"], "  ", ['span.comment', "; asynchronously evoke add-counter{5}"], "\n",
        ['span.comment', ";; (rf/disp evt & args) <=> (and evt (rf/dispatch (into evt args)))"]],
  },
  _regSub: {
    className: 'simple',
    js: (
`let rf = require('mreframe/re-frame');


rf.regSub('view', (db, sub) => db.view);

rf.subscribe(['view']) // => RCursor returning current db.view value


rf.regSub('item', (db, [_, key]) => db.dict[key]);

rf.dsub(['item', 'foo']) // db.dict['foo']
// rf.dsub(sub) <=> deref( rf.subscribe(sub) )`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " rf ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe/re-frame'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'view'"], ", ", ['span.paren.level2', "("], "db, sub", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " db.view", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "rf.subscribe"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'view'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.comment', "// => RCursor returning current db.view value"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'item'"], ", ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, key", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " db.dict", ['span.paren.level2', "["], "key", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "rf.dsub"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'item'"], ", ", ['span.keyword', "'foo'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.comment', "// db.dict['foo']"], "\n",
        ['span.comment', "// rf.dsub(sub) <=> deref( rf.subscribe(sub) )"]],
    coffee: (
`rf = require 'mreframe/re-frame'


rf.regSub 'view', (db, sub) -> db.view

rf.subscribe ['view'] # => RCursor returning current db.view value


rf.regSub 'item', (db, [_, key]) -> db.dict[key]

rf.dsub ['item', 'foo'] # db.dict['foo']
# rf.dsub sub <=> deref rf.subscribe sub`
    ),
    coffee_:
      ['<>',
        "rf ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe/re-frame'"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'view'"], ", ", ['span.paren.level1', "("], "db, sub", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " db.view\n",
        "\n",
        ['span.reserved', "rf.subscribe"], " ", ['span.paren.level1', "["], ['span.keyword', "'view'"], ['span.paren.level1', "]"], " ", ['span.comment', "# => RCursor returning current db.view value"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'item'"], ", ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "_, key", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " db.dict", ['span.paren.level1', "["], "key", ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.reserved', "rf.dsub"], " ", ['span.paren.level1', "["], ['span.keyword', "'item'"], ", ", ['span.keyword', "'foo'"], ['span.paren.level1', "]"], " ", ['span.comment', "# db.dict['foo']"], "\n",
        ['span.comment', "# rf.dsub sub <=> deref rf.subscribe sub"]],
    wisp: (
`(ns example.reg-sub
  (:require [wisp.sequence :refer [nth]] ; for destructuring
            [mreframe.util :refer [get-in]]
            [mreframe.re-frame :as rf]))


(rf/reg-sub :view
  (fn [db sub] (:view db)))

(rf/subscribe [:view]) ; => RCursor returning current db.view value


(rf/reg-sub :item
  (fn [db [_ key]] (get-in db [:dict key])))

(rf/dsub [:item "foo"]) ; (get db.dict "foo")
;; (rf/dsub sub) <=> @(rf/subscribe sub)`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.reg-sub"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "nth"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.comment', "; for destructuring"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.util ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "get-in"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":view"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db sub", ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.keyword', ":view"], " db", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/subscribe"], " ", ['span.paren.level2', "["], ['span.keyword', ":view"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.comment', "; => RCursor returning current db.view value"], "\n",
        "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":item"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "_ key", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "get-in"], " db ", ['span.paren.level1', "["], ['span.keyword', ":dict"], " key", ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/dsub"], " ", ['span.paren.level2', "["], ['span.keyword', ":item"], " ", ['span.string', "\"foo\""], ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.comment', "; (get db.dict \"foo\")"], "\n",
        ['span.comment', ";; (rf/dsub sub) <=> @(rf/subscribe sub)"]],
  },
  _regSub2: {
    className: 'simple',
    js: (
`let {reFrame: rf, util: {getIn, identity, dict}} = require('mreframe');

// extraction subscription
rf.regSub('list', getIn);  // getIn(db, ['list']) | getIn(db, ['list', idx]) | ...

// computation subscriptions (simple)
rf.regSub('#list', '<-', ['list'],    list => list.length);
rf.regSub('first', '<-', ['list', 0], identity);

// (derived from multiple)
rf.regSub('pair', '<-', ['first'], '<-', ['list', 1],
          ([first, second], _sub) => first + ", " + second);

// (calculated dependency)
rf.regSub('reverse', ([_, idx]) => rf.subscribe(['list', idx]),
          (item, _sub) => item.split("").reverse().join(""));

// (multiple)
rf.regSub('palindrome',
          ([_, idx]) => [['list', idx], ['reverse', idx]].map(rf.subscribe),
          ([item, reverse], _sub) => item + reverse);

// (dict)
rf.regSub('sizes',
          ([_, ...keys]) => dict( keys.map(k => [k, rf.subscribe(['item', k])]) ),
          (dict, [_, ...keys]) => dict( keys.map(k => [k, dict[k].length]) ));`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ['span.reserved', ":"], " rf, ", ['span.keyword', "util"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "getIn"], ", ", ['span.reserved', "identity"], ", ", ['span.reserved', "dict"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// extraction subscription"], "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'list'"], ", ", ['span.reserved', "getIn"], ['span.paren.level1', ")"], ";  ", ['span.comment', "// getIn(db, ['list']) | getIn(db, ['list', idx]) | ..."], "\n",
        "\n",
        ['span.comment', "// computation subscriptions (simple)"], "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'#list'"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'list'"], ['span.paren.level2', "]"], ",    list ", ['span.reserved', "=>"], " list.length", ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'first'"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'list'"], ", 0", ['span.paren.level2', "]"], ", ", ['span.reserved', "identity"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// (derived from multiple)"], "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'pair'"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'first'"], ['span.paren.level2', "]"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'list'"], ", 1", ['span.paren.level2', "]"], ",\n",
        "          ", ['span.paren.level2', "("], ['span.paren.level3', "["], "first, second", ['span.paren.level3', "]"], ", _sub", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " first ", ['span.reserved', "+"], " ", ['span.string', "\", \""], " ", ['span.reserved', "+"], " second", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// (calculated dependency)"], "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'reverse'"], ", ", ['span.paren.level2', "("], ['span.paren.level3', "["], "_, idx", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "rf.subscribe"], ['span.paren.level2', "("], ['span.paren.level3', "["], ['span.keyword', "'list'"], ", idx", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ",\n",
        "          ", ['span.paren.level2', "("], "item, _sub", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " item.split", ['span.paren.level2', "("], ['span.string', "\"\""], ['span.paren.level2', ")"], ".reverse", ['span.paren.level2', "("], ['span.paren.level2', ")"], ".join", ['span.paren.level2', "("], ['span.string', "\"\""], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// (multiple)"], "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'palindrome'"], ",\n",
        "          ", ['span.paren.level2', "("], ['span.paren.level3', "["], "_, idx", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "["], ['span.paren.level3', "["], ['span.keyword', "'list'"], ", idx", ['span.paren.level3', "]"], ", ", ['span.paren.level3', "["], ['span.keyword', "'reverse'"], ", idx", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ".map", ['span.paren.level2', "("], ['span.reserved', "rf.subscribe"], ['span.paren.level2', ")"], ",\n",
        "          ", ['span.paren.level2', "("], ['span.paren.level3', "["], "item, reverse", ['span.paren.level3', "]"], ", _sub", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " item ", ['span.reserved', "+"], " reverse", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// (dict)"], "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'sizes'"], ",\n",
        "          ", ['span.paren.level2', "("], ['span.paren.level3', "["], "_, ", ['span.reserved', "..."], "keys", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "dict"], ['span.paren.level2', "("], " keys.map", ['span.paren.level3', "("], "k ", ['span.reserved', "=>"], " ", ['span.paren.level1', "["], "k, ", ['span.reserved', "rf.subscribe"], ['span.paren.level2', "("], ['span.paren.level3', "["], ['span.keyword', "'item'"], ", k", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', "]"], ['span.paren.level3', ")"], " ", ['span.paren.level2', ")"], ",\n",
        "          ", ['span.paren.level2', "("], ['span.reserved', "dict"], ", ", ['span.paren.level3', "["], "_, ", ['span.reserved', "..."], "keys", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "dict"], ['span.paren.level2', "("], " keys.map", ['span.paren.level3', "("], "k ", ['span.reserved', "=>"], " ", ['span.paren.level1', "["], "k, ", ['span.reserved', "dict"], ['span.paren.level2', "["], "k", ['span.paren.level2', "]"], ".length", ['span.paren.level1', "]"], ['span.paren.level3', ")"], " ", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";"],
    coffee: (
`{reFrame: rf, util: {getIn, identity, dict}} = require 'mreframe'

# extraction subscription
rf.regSub 'list', getIn  # (getIn db, ['list']) | (getIn db, ['list', idx]) | ...

# computation subscriptions (simple)
rf.regSub '#list', '<-', ['list'],    (list) -> list.length
rf.regSub 'first', '<-', ['list', 0], identity

# (derived from multiple)
rf.regSub 'pair', '<-', ['first'], '<-', ['list', 1],
          ([first, second], _sub) -> first + ", " + second

# (calculated dependency)
rf.regSub 'reverse', (([_, idx]) -> rf.subscribe ['list', idx]),
          (item, _sub) -> item.split("").reverse().join("")

# (multiple)
rf.regSub 'palindrome',
          (([_, idx]) -> [['list', idx], ['reverse', idx]].map rf.subscribe),
          ([item, reverse], _sub) -> item + reverse

# (dict)
rf.regSub 'sizes',
          (([_, ...keys]) -> dict keys.map (k) -> [k, rf.subscribe ['item', k]]),
          (dict, [_, ...keys]) -> dict keys.map (k) -> [k, dict[k].length]`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ": rf, ", ['span.keyword', "util"], ": ", ['span.paren.level2', "{"], ['span.reserved', "getIn"], ", ", ['span.reserved', "identity"], ", ", ['span.reserved', "dict"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        ['span.comment', "# extraction subscription"], "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'list'"], ", ", ['span.reserved', "getIn"], "  ", ['span.comment', "# (getIn db, ['list']) | (getIn db, ['list', idx]) | ..."], "\n",
        "\n",
        ['span.comment', "# computation subscriptions (simple)"], "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'#list'"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level1', "["], ['span.keyword', "'list'"], ['span.paren.level1', "]"], ",    ", ['span.paren.level1', "("], "list", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " list.length\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'first'"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level1', "["], ['span.keyword', "'list'"], ", 0", ['span.paren.level1', "]"], ", ", ['span.reserved', "identity"], "\n",
        "\n",
        ['span.comment', "# (derived from multiple)"], "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'pair'"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level1', "["], ['span.keyword', "'first'"], ['span.paren.level1', "]"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level1', "["], ['span.keyword', "'list'"], ", 1", ['span.paren.level1', "]"], ",\n",
        "          ", ['span.paren.level1', "("], ['span.paren.level2', "["], "first, second", ['span.paren.level2', "]"], ", _sub", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " first ", ['span.reserved', "+"], " ", ['span.string', "\", \""], " ", ['span.reserved', "+"], " second\n",
        "\n",
        ['span.comment', "# (calculated dependency)"], "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'reverse'"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "("], ['span.paren.level3', "["], "_, idx", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "rf.subscribe"], " ", ['span.paren.level2', "["], ['span.keyword', "'list'"], ", idx", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ",\n",
        "          ", ['span.paren.level1', "("], "item, _sub", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " item.split", ['span.paren.level1', "("], ['span.string', "\"\""], ['span.paren.level1', ")"], ".reverse", ['span.paren.level1', "("], ['span.paren.level1', ")"], ".join", ['span.paren.level1', "("], ['span.string', "\"\""], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', "# (multiple)"], "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'palindrome'"], ",\n",
        "          ", ['span.paren.level1', "("], ['span.paren.level2', "("], ['span.paren.level3', "["], "_, idx", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level2', "["], ['span.paren.level3', "["], ['span.keyword', "'list'"], ", idx", ['span.paren.level3', "]"], ", ", ['span.paren.level3', "["], ['span.keyword', "'reverse'"], ", idx", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ".map ", ['span.reserved', "rf.subscribe"], ['span.paren.level1', ")"], ",\n",
        "          ", ['span.paren.level1', "("], ['span.paren.level2', "["], "item, reverse", ['span.paren.level2', "]"], ", _sub", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " item ", ['span.reserved', "+"], " reverse\n",
        "\n",
        ['span.comment', "# (dict)"], "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'sizes'"], ",\n",
        "          ", ['span.paren.level1', "("], ['span.paren.level2', "("], ['span.paren.level3', "["], "_, ", ['span.reserved', "..."], "keys", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "dict"], " keys.map ", ['span.paren.level2', "("], "k", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level2', "["], "k, ", ['span.reserved', "rf.subscribe"], " ", ['span.paren.level3', "["], ['span.keyword', "'item'"], ", k", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ",\n",
        "          ", ['span.paren.level1', "("], ['span.reserved', "dict"], ", ", ['span.paren.level2', "["], "_, ", ['span.reserved', "..."], "keys", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "dict"], " keys.map ", ['span.paren.level1', "("], "k", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level1', "["], "k, ", ['span.reserved', "dict"], ['span.paren.level2', "["], "k", ['span.paren.level2', "]"], ".length", ['span.paren.level1', "]"]],
    wisp: (
`(ns example.reg-sub2
  (:require [wisp.runtime :refer [identity]]
            [wisp.sequence :refer [map into nth drop]]
            [wisp.string :as s]
            [mreframe.util :refer [get-in]]
            [mreframe.re-frame :as rf]))

;; extraction subscription
(rf/reg-sub :list get-in)  ; (get-in db [:list]) | (get-in db [:list idx]) | ...

;; computation subscriptions (simple)
(rf/reg-sub :#list :<- [:list] #(:length %))
(rf/reg-sub :first :<- [:list 0] identity)

;; (derived from multiple)
(rf/reg-sub :pair :<- [:first] :<- [:list 1]
  (fn [[first second] -sub] (str first ", " second)))

;; (calculated dependency)
(rf/reg-sub :reverse (fn [[_ idx]] (rf/subscribe [:list idx])) s/reverse)

;; (multiple)
(rf/reg-sub :palindrome
            (fn [[_ idx]] (map rf/subscribe [[:list idx] [:reverse idx]]))
            (fn [[item reverse] -sub] (str item reverse)))

(defn -keys->dict [ks f] (into {} (map vector ks (map f ks))))
;; (dict)
(rf/reg-sub :sizes (fn [[_ & keys]] (-keys->dict keys #(rf/subscribe [:item %])))
  (fn [dict [_ & keys]]
    (-keys->dict keys #(get-in dict [% :length]))))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.reg-sub2"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "identity"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "map"], " ", ['span.reserved', "into"], " ", ['span.reserved', "nth"], " ", ['span.reserved', "drop"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "wisp.string ", ['span.keyword', ":as"], " s", ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.util ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "get-in"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; extraction subscription"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":list"], " ", ['span.reserved', "get-in"], ['span.paren.level1', ")"], "  ", ['span.comment', "; (get-in db [:list]) | (get-in db [:list idx]) | ..."], "\n",
        "\n",
        ['span.comment', ";; computation subscriptions (simple)"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":#list"], " ", ['span.keyword', ":<-"], " ", ['span.paren.level2', "["], ['span.keyword', ":list"], ['span.paren.level2', "]"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.keyword', ":length"], " ", ['span.reserved', "%"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":first"], " ", ['span.keyword', ":<-"], " ", ['span.paren.level2', "["], ['span.keyword', ":list"], " 0", ['span.paren.level2', "]"], " ", ['span.reserved', "identity"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; (derived from multiple)"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":pair"], " ", ['span.keyword', ":<-"], " ", ['span.paren.level2', "["], ['span.keyword', ":first"], ['span.paren.level2', "]"], " ", ['span.keyword', ":<-"], " ", ['span.paren.level2', "["], ['span.keyword', ":list"], " 1", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level1', "["], ['span.reserved', "first"], " second", ['span.paren.level1', "]"], " -sub", ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "str"], " ", ['span.reserved', "first"], " ", ['span.string', "\", \""], " second", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; (calculated dependency)"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":reverse"], " ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level1', "["], "_ idx", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "rf/subscribe"], " ", ['span.paren.level1', "["], ['span.keyword', ":list"], " idx", ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], " ", ['span.reserved', "s/reverse"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; (multiple)"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":palindrome"], "\n",
        "            ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level1', "["], "_ idx", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "map"], " ", ['span.reserved', "rf/subscribe"], " ", ['span.paren.level1', "["], ['span.paren.level2', "["], ['span.keyword', ":list"], " idx", ['span.paren.level2', "]"], " ", ['span.paren.level2', "["], ['span.keyword', ":reverse"], " idx", ['span.paren.level2', "]"], ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], "\n",
        "            ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level1', "["], "item reverse", ['span.paren.level1', "]"], " -sub", ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "str"], " item reverse", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "-keys->dict"], " ", ['span.paren.level2', "["], "ks f", ['span.paren.level2', "]"], " ", ['span.paren.level2', "("], ['span.reserved', "into"], " ", ['span.paren.level3', "{"], ['span.paren.level3', "}"], " ", ['span.paren.level3', "("], ['span.reserved', "map"], " vector ks ", ['span.paren.level1', "("], ['span.reserved', "map"], " f ks", ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.comment', ";; (dict)"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":sizes"], " ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level1', "["], "_ ", ['span.reserved', "&"], " keys", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], "-keys->dict keys ", ['span.reserved', "#"], ['span.paren.level1', "("], ['span.reserved', "rf/subscribe"], " ", ['span.paren.level2', "["], ['span.keyword', ":item"], " ", ['span.reserved', "%"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "dict ", ['span.paren.level1', "["], "_ ", ['span.reserved', "&"], " keys", ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], "-keys->dict keys ", ['span.reserved', "#"], ['span.paren.level1', "("], ['span.reserved', "get-in"], " dict ", ['span.paren.level2', "["], ['span.reserved', "%"], " ", ['span.keyword', ":length"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"]],
  },
  _regEventFx: {
    className: 'simple',
    js: (
`let {reFrame: rf, util: {merge}} = require('mreframe');


// evokes reminder{message} after specified delay
rf.regEventFx('delayed-reminder', (cofx, [_, message, delayMsec]) =>
  ({dispatchLater: {dispatch: ['reminder', message],  ms: delayMsec}}));

// displays the reminder (adds to appDb) and unsets it after 5 sec
rf.regEventFx('reminder', ({db}, [_, reminder]) =>
  merge({db: merge(db, {reminder})},
        reminder &&
          {dispatchLater: {dispatch: ['reminder'],  ms: 5000}}));


// dispatches multiple events in the given order
rf.regEventFx('schedule-reminders', (cofx, [_, ...reminders]) =>
  ({fx: reminders.map(it => ['dispatch', ['reminder', it]])}));`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ['span.reserved', ":"], " rf, ", ['span.keyword', "util"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "merge"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// evokes reminder{message} after specified delay"], "\n",
        ['span.reserved', "rf.regEventFx"], ['span.paren.level1', "("], ['span.keyword', "'delayed-reminder'"], ", ", ['span.paren.level2', "("], "cofx, ", ['span.paren.level3', "["], "_, message, delayMsec", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "dispatchLater"], ['span.reserved', ":"], " ", ['span.paren.level1', "{"], ['span.keyword', "dispatch"], ['span.reserved', ":"], " ", ['span.paren.level2', "["], ['span.keyword', "'reminder'"], ", message", ['span.paren.level2', "]"], ",  ", ['span.keyword', "ms"], ['span.reserved', ":"], " delayMsec", ['span.paren.level1', "}"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// displays the reminder (adds to appDb) and unsets it after 5 sec"], "\n",
        ['span.reserved', "rf.regEventFx"], ['span.paren.level1', "("], ['span.keyword', "'reminder'"], ", ", ['span.paren.level2', "("], ['span.paren.level3', "{"], "db", ['span.paren.level3', "}"], ", ", ['span.paren.level3', "["], "_, reminder", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.reserved', "merge"], ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "db"], ['span.reserved', ":"], " ", ['span.reserved', "merge"], ['span.paren.level1', "("], "db, ", ['span.paren.level2', "{"], "reminder", ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ",\n",
        "        reminder ", ['span.reserved', "&&"], "\n",
        "          ", ['span.paren.level3', "{"], ['span.keyword', "dispatchLater"], ['span.reserved', ":"], " ", ['span.paren.level1', "{"], ['span.keyword', "dispatch"], ['span.reserved', ":"], " ", ['span.paren.level2', "["], ['span.keyword', "'reminder'"], ['span.paren.level2', "]"], ",  ", ['span.keyword', "ms"], ['span.reserved', ":"], " 5000", ['span.paren.level1', "}"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// dispatches multiple events in the given order"], "\n",
        ['span.reserved', "rf.regEventFx"], ['span.paren.level1', "("], ['span.keyword', "'schedule-reminders'"], ", ", ['span.paren.level2', "("], "cofx, ", ['span.paren.level3', "["], "_, ", ['span.reserved', "..."], "reminders", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "fx"], ['span.reserved', ":"], " reminders.map", ['span.paren.level1', "("], "it ", ['span.reserved', "=>"], " ", ['span.paren.level2', "["], ['span.keyword', "'dispatch'"], ", ", ['span.paren.level3', "["], ['span.keyword', "'reminder'"], ", it", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";"],
    coffee: (
`{reFrame: rf, util: {merge}} = require 'mreframe'


# evokes reminder{message} after specified delay
rf.regEventFx 'delayed-reminder', (cofx, [_, message, delayMsec]) ->
  dispatchLater: {dispatch: ['reminder', message],  ms: delayMsec}

# displays the reminder (adds to appDb) and unsets it after 5 sec
rf.regEventFx 'reminder', ({db}, [_, reminder]) ->
  merge(db: merge(db, {reminder}),
        reminder and
          dispatchLater: {dispatch: ['reminder'],  ms: 5000})


# dispatches multiple events in the given order
rf.regEventFx 'schedule-reminders', (cofx, [_, ...reminders]) ->
  fx: reminders.map (it) -> ['dispatch', ['reminder', it]]`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ": rf, ", ['span.keyword', "util"], ": ", ['span.paren.level2', "{"], ['span.reserved', "merge"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        "\n",
        ['span.comment', "# evokes reminder{message} after specified delay"], "\n",
        ['span.reserved', "rf.regEventFx"], " ", ['span.keyword', "'delayed-reminder'"], ", ", ['span.paren.level1', "("], "cofx, ", ['span.paren.level2', "["], "_, message, delayMsec", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.keyword', "dispatchLater"], ": ", ['span.paren.level1', "{"], ['span.keyword', "dispatch"], ": ", ['span.paren.level2', "["], ['span.keyword', "'reminder'"], ", message", ['span.paren.level2', "]"], ",  ", ['span.keyword', "ms"], ": delayMsec", ['span.paren.level1', "}"], "\n",
        "\n",
        ['span.comment', "# displays the reminder (adds to appDb) and unsets it after 5 sec"], "\n",
        ['span.reserved', "rf.regEventFx"], " ", ['span.keyword', "'reminder'"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "db", ['span.paren.level2', "}"], ", ", ['span.paren.level2', "["], "_, reminder", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.reserved', "merge"], ['span.paren.level1', "("], ['span.keyword', "db"], ": ", ['span.reserved', "merge"], ['span.paren.level2', "("], "db, ", ['span.paren.level3', "{"], "reminder", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ",\n",
        "        reminder ", ['span.reserved', "and"], "\n",
        "          ", ['span.keyword', "dispatchLater"], ": ", ['span.paren.level2', "{"], ['span.keyword', "dispatch"], ": ", ['span.paren.level3', "["], ['span.keyword', "'reminder'"], ['span.paren.level3', "]"], ",  ", ['span.keyword', "ms"], ": 5000", ['span.paren.level2', "}"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', "# dispatches multiple events in the given order"], "\n",
        ['span.reserved', "rf.regEventFx"], " ", ['span.keyword', "'schedule-reminders'"], ", ", ['span.paren.level1', "("], "cofx, ", ['span.paren.level2', "["], "_, ", ['span.reserved', "..."], "reminders", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.keyword', "fx"], ": reminders.map ", ['span.paren.level1', "("], "it", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.paren.level1', "["], ['span.keyword', "'dispatch'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'reminder'"], ", it", ['span.paren.level2', "]"], ['span.paren.level1', "]"]],
    wisp: (
`(ns example.reg-event-fx
  (:require [wisp.runtime :refer [merge dictionary? dictionary]] ; used by destructuring
            [wisp.sequence :refer [nth drop vec lazy-seq empty? first rest cons]] ; used by (for)
            [mreframe.re-frame :as rf]))


;; evokes reminder{message} after specified delay
(rf/reg-event-fx :delayed-reminder
  (fn [cofx [_ message delay-msec]]
    {:dispatchLater {:dispatch [:reminder message],  :ms delay-msec}}))

;; displays the reminder (adds to app-db) and unsets it after 5 sec
(rf/reg-event-fx :reminder
  (fn [{db :db} [_ reminder]]
    (merge
      {:db (merge db {:reminder reminder})}
      (and reminder
        {:dispatchLater {:dispatch [:reminder],  :ms 5000}}))))


;; dispatches multiple events in the given order
(rf/reg-event-fx :schedule-reminders
  (fn [_ [_ & reminders]]
    {:fx (vec (for [it reminders]
                [:dispatch [:reminder it]]))}))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.reg-event-fx"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "merge"], " ", ['span.reserved', "dictionary?"], " ", ['span.reserved', "dictionary"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.comment', "; used by destructuring"], "\n",
        "            ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "nth"], " ", ['span.reserved', "drop"], " ", ['span.reserved', "vec"], " ", ['span.reserved', "lazy-seq"], " ", ['span.reserved', "empty?"], " ", ['span.reserved', "first"], " ", ['span.reserved', "rest"], " ", ['span.reserved', "cons"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.comment', "; used by (for)"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; evokes reminder{message} after specified delay"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-fx"], " ", ['span.keyword', ":delayed-reminder"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "cofx ", ['span.paren.level1', "["], "_ message delay-msec", ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "{"], ['span.keyword', ":dispatchLater"], " ", ['span.paren.level1', "{"], ['span.keyword', ":dispatch"], " ", ['span.paren.level2', "["], ['span.keyword', ":reminder"], " message", ['span.paren.level2', "]"], ",  ", ['span.keyword', ":ms"], " delay-msec", ['span.paren.level1', "}"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; displays the reminder (adds to app-db) and unsets it after 5 sec"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-fx"], " ", ['span.keyword', ":reminder"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level1', "{"], "db ", ['span.keyword', ":db"], ['span.paren.level1', "}"], " ", ['span.paren.level1', "["], "_ reminder", ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "merge"], "\n",
        "      ", ['span.paren.level1', "{"], ['span.keyword', ":db"], " ", ['span.paren.level2', "("], ['span.reserved', "merge"], " db ", ['span.paren.level3', "{"], ['span.keyword', ":reminder"], " reminder", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], "\n",
        "      ", ['span.paren.level1', "("], "and reminder\n",
        "        ", ['span.paren.level2', "{"], ['span.keyword', ":dispatchLater"], " ", ['span.paren.level3', "{"], ['span.keyword', ":dispatch"], " ", ['span.paren.level1', "["], ['span.keyword', ":reminder"], ['span.paren.level1', "]"], ",  ", ['span.keyword', ":ms"], " 5000", ['span.paren.level3', "}"], ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; dispatches multiple events in the given order"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-fx"], " ", ['span.keyword', ":schedule-reminders"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "_ ", ['span.paren.level1', "["], "_ ", ['span.reserved', "&"], " reminders", ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "{"], ['span.keyword', ":fx"], " ", ['span.paren.level1', "("], ['span.reserved', "vec"], " ", ['span.paren.level2', "("], ['span.reserved', "for"], " ", ['span.paren.level3', "["], "it reminders", ['span.paren.level3', "]"], "\n",
        "                ", ['span.paren.level3', "["], ['span.keyword', ":dispatch"], " ", ['span.paren.level1', "["], ['span.keyword', ":reminder"], " it", ['span.paren.level1', "]"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"]],
  },
  _regFx: {
    className: 'simple',
    js: (
`let {reFrame: rf, util: {assocIn}} = require('mreframe');


// side-effect alert(arg)
rf.regFx('alert', arg => alert(arg));

// event alert{msg} causes side-effect alert
rf.regEventFx('alert', (cofx, [_, msg]) => ({alert: msg});


let _jsonRequest = response =>
  (response.ok ? response.json() : Promise.reject(response.status));
// downloads JSON from a URL, then evokes passed event with added param
rf.regFx('fetchJson', ({url, params, onSuccess, onFailure}) =>
  fetch(url, params).then(_jsonRequest)
                    .then(data => rf.disp(onSuccess, data))
                    .catch(status => rf.disp(onFailure, status));

// event fetch-json{key, url} causes side-effect fetchJson
rf.regEventFx('fetch-json', ({db}, [_, key, url]) =>
  ({fetchJson: {url,  params: db.params,  onSuccess: ['-fetch-json', key]}}));

// evoked by fetchJson on success
rf.regEventFx('-fetch-json', ({db}, [_, key, data]) =>
  ({db:    assocIn(db, ['cache', key], data),
    alert: "Fetched '" + key + "'!"}));`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ['span.reserved', ":"], " rf, ", ['span.keyword', "util"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "assocIn"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// side-effect alert(arg)"], "\n",
        ['span.reserved', "rf.regFx"], ['span.paren.level1', "("], ['span.keyword', "'alert'"], ", arg ", ['span.reserved', "=>"], " alert", ['span.paren.level2', "("], "arg", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// event alert{msg} causes side-effect alert"], "\n",
        ['span.reserved', "rf.regEventFx"], ['span.paren.level1', "("], ['span.keyword', "'alert'"], ", ", ['span.paren.level2', "("], "cofx, ", ['span.paren.level3', "["], "_, msg", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "alert"], ['span.reserved', ":"], " msg", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ";\n",
        "\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "_jsonRequest"], " ", ['span.reserved', "="], " response ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level2', "("], "response.ok ", ['span.reserved', "?"], " response.json", ['span.paren.level3', "("], ['span.paren.level3', ")"], " ", ['span.reserved', ":"], " ", ['span.reserved', "Promise.reject"], ['span.paren.level3', "("], "response.status", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ";\n",
        ['span.comment', "// downloads JSON from a URL, then evokes passed event with added param"], "\n",
        ['span.reserved', "rf.regFx"], ['span.paren.level2', "("], ['span.keyword', "'fetchJson'"], ", ", ['span.paren.level3', "("], ['span.paren.level1', "{"], "url, params, onSuccess, onFailure", ['span.paren.level1', "}"], ['span.paren.level3', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.reserved', "fetch"], ['span.paren.level3', "("], "url, params", ['span.paren.level3', ")"], ['span.reserved', ".then"], ['span.paren.level3', "("], "_jsonRequest", ['span.paren.level3', ")"], "\n",
        "                    ", ['span.reserved', ".then"], ['span.paren.level3', "("], "data ", ['span.reserved', "=>"], " ", ['span.reserved', "rf.disp"], ['span.paren.level1', "("], "onSuccess, data", ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        "                    ", ['span.reserved', ".catch"], ['span.paren.level3', "("], "status ", ['span.reserved', "=>"], " ", ['span.reserved', "rf.disp"], ['span.paren.level1', "("], "onFailure, status", ['span.paren.level1', ")"], ['span.paren.level3', ")"], ";\n",
        "\n",
        ['span.comment', "// event fetch-json{key, url} causes side-effect fetchJson"], "\n",
        ['span.reserved', "rf.regEventFx"], ['span.paren.level3', "("], ['span.keyword', "'fetch-json'"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "db", ['span.paren.level2', "}"], ", ", ['span.paren.level2', "["], "_, key, url", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "("], ['span.paren.level2', "{"], ['span.keyword', "fetchJson"], ['span.reserved', ":"], " ", ['span.paren.level3', "{"], "url,  ", ['span.keyword', "params"], ['span.reserved', ":"], " db.params,  ", ['span.keyword', "onSuccess"], ['span.reserved', ":"], " ", ['span.paren.level1', "["], ['span.keyword', "'-fetch-json'"], ", key", ['span.paren.level1', "]"], ['span.paren.level3', "}"], ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ";\n",
        "\n",
        ['span.comment', "// evoked by fetchJson on success"], "\n",
        ['span.reserved', "rf.regEventFx"], ['span.paren.level3', "("], ['span.keyword', "'-fetch-json'"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "db", ['span.paren.level2', "}"], ", ", ['span.paren.level2', "["], "_, key, data", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "("], ['span.paren.level2', "{"], ['span.keyword', "db"], ['span.reserved', ":"], "    ", ['span.reserved', "assocIn"], ['span.paren.level3', "("], "db, ", ['span.paren.level1', "["], ['span.keyword', "'cache'"], ", key", ['span.paren.level1', "]"], ", data", ['span.paren.level3', ")"], ",\n",
        "    ", ['span.keyword', "alert"], ['span.reserved', ":"], " ", ['span.string', "\"Fetched '\""], " ", ['span.reserved', "+"], " key ", ['span.reserved', "+"], " ", ['span.string', "\"'!\""], ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ";"],
    coffee: (
`{reFrame: rf, util: {assocIn}} = require 'mreframe'


# side-effect alert(arg)
rf.regFx 'alert', (arg) -> alert arg

# event alert{msg} causes side-effect alert
rf.regEventFx 'alert', (cofx, [_, msg]) -> alert: msg


_jsonRequest = (response) ->
  if response.ok then response.json() else Promise.reject response.status
# downloads JSON from a URL, then evokes passed event with added param
rf.regFx 'fetchJson', ({url, params, onSuccess, onFailure}) ->
  (fetch url, params).then _jsonRequest
                     .then((data) -> rf.disp onSuccess, data)
                     .catch((status) -> rf.disp onFailure, status)

# event fetch-json{key, url} causes side-effect fetchJson
rf.regEventFx 'fetch-json', ({db}, [_, key, url]) ->
  fetchJson: {url,  params: db.params,  onSuccess: ['-fetch-json', key]}

# evoked by fetchJson on success
rf.regEventFx '-fetch-json', ({db}, [_, key, data]) ->
  db:    assocIn db, ['cache', key], data
  alert: "Fetched '" + key + "'!"`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ": rf, ", ['span.keyword', "util"], ": ", ['span.paren.level2', "{"], ['span.reserved', "assocIn"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        "\n",
        ['span.comment', "# side-effect alert(arg)"], "\n",
        ['span.reserved', "rf.regFx"], " ", ['span.keyword', "'alert'"], ", ", ['span.paren.level1', "("], "arg", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " alert arg\n",
        "\n",
        ['span.comment', "# event alert{msg} causes side-effect alert"], "\n",
        ['span.reserved', "rf.regEventFx"], " ", ['span.keyword', "'alert'"], ", ", ['span.paren.level1', "("], "cofx, ", ['span.paren.level2', "["], "_, msg", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.keyword', "alert"], ": msg\n",
        "\n",
        "\n",
        ['span.declaration', "_jsonRequest"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], "response", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.reserved', "if"], " response.ok ", ['span.reserved', "then"], " response.json", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "else"], " ", ['span.reserved', "Promise.reject"], " response.status\n",
        ['span.comment', "# downloads JSON from a URL, then evokes passed event with added param"], "\n",
        ['span.reserved', "rf.regFx"], " ", ['span.keyword', "'fetchJson'"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "url, params, onSuccess, onFailure", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "("], ['span.reserved', "fetch"], " url, params", ['span.paren.level1', ")"], ['span.reserved', ".then"], " _jsonRequest\n",
        "                     ", ['span.reserved', ".then"], ['span.paren.level1', "("], ['span.paren.level2', "("], "data", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "rf.disp"], " onSuccess, data", ['span.paren.level1', ")"], "\n",
        "                     ", ['span.reserved', ".catch"], ['span.paren.level1', "("], ['span.paren.level2', "("], "status", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "rf.disp"], " onFailure, status", ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', "# event fetch-json{key, url} causes side-effect fetchJson"], "\n",
        ['span.reserved', "rf.regEventFx"], " ", ['span.keyword', "'fetch-json'"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "db", ['span.paren.level2', "}"], ", ", ['span.paren.level2', "["], "_, key, url", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.keyword', "fetchJson"], ": ", ['span.paren.level1', "{"], "url,  ", ['span.keyword', "params"], ": db.params,  ", ['span.keyword', "onSuccess"], ": ", ['span.paren.level2', "["], ['span.keyword', "'-fetch-json'"], ", key", ['span.paren.level2', "]"], ['span.paren.level1', "}"], "\n",
        "\n",
        ['span.comment', "# evoked by fetchJson on success"], "\n",
        ['span.reserved', "rf.regEventFx"], " ", ['span.keyword', "'-fetch-json'"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "db", ['span.paren.level2', "}"], ", ", ['span.paren.level2', "["], "_, key, data", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.keyword', "db"], ":    ", ['span.reserved', "assocIn"], " db, ", ['span.paren.level1', "["], ['span.keyword', "'cache'"], ", key", ['span.paren.level1', "]"], ", data\n",
        "  ", ['span.keyword', "alert"], ": ", ['span.string', "\"Fetched '\""], " ", ['span.reserved', "+"], " key ", ['span.reserved', "+"], " ", ['span.string', "\"'!\""]],
    wisp: (
`(ns example.reg-fx
  (:require [wisp.runtime :refer [dictionary? dictionary] ; used by
            [wisp.sequence :refer [vec nth]               ;  destructuring
            [mreframe.util :refer [assoc-in]]
            [mreframe.re-frame :as rf]))


;; side-effect alert(arg)
(rf/reg-fx :alert #(alert %))

;; event alert{msg} causes side-effect alert
(rf/reg-event-fx :alert
  (fn [cofx [_ msg]] {:alert msg}))


(defn -json-request [response]
  (if response.ok (response.json) (Promise/reject response.status)))
;; downloads JSON from a URL, then evokes passed event with added param
(defn fetch-json [{:strs [url params on-success on-failure]}]
  (.. (fetch url params)
      (then -json-request)
      (then #(rf/disp on-success %))
      (catch #(rf/disp on-failure %))))
(rf/reg-fx :fetchJson fetch-json)

;; event fetch-json{key, url} causes side-effect fetchJson
(rf/reg-event-fx :fetch-json
  (fn [{db :db} [_ key url]]
    {:fetchJson {:url url,  :params db.params,  :on-success [:-fetch-json key]}}))

;; evoked by fetchJson on success
(rf/reg-event-fx :-fetch-json
  (fn [{db :db} [_ key data]]
    {:db    (assoc-in db [:cache key] data)
     :alert (str "Fetched '" key "'!")}))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.reg-fx"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "dictionary?"], " ", ['span.reserved', "dictionary"], ['span.paren.level1', "]"], " ", ['span.comment', "; used by"], "\n",
        "            ", ['span.paren.level1', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level2', "["], ['span.reserved', "vec"], " ", ['span.reserved', "nth"], ['span.paren.level2', "]"], "               ", ['span.comment', ";  destructuring"], "\n",
        "            ", ['span.paren.level2', "["], "mreframe.util ", ['span.keyword', ":refer"], " ", ['span.paren.level3', "["], ['span.reserved', "assoc-in"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "            ", ['span.paren.level2', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; side-effect alert(arg)"], "\n",
        ['span.paren.level3', "("], ['span.reserved', "rf/reg-fx"], " ", ['span.keyword', ":alert"], " ", ['span.reserved', "#"], ['span.paren.level1', "("], "alert ", ['span.reserved', "%"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        "\n",
        ['span.comment', ";; event alert{msg} causes side-effect alert"], "\n",
        ['span.paren.level3', "("], ['span.reserved', "rf/reg-event-fx"], " ", ['span.keyword', ":alert"], "\n",
        "  ", ['span.paren.level1', "("], ['span.reserved', "fn"], " ", ['span.paren.level2', "["], "cofx ", ['span.paren.level3', "["], "_ msg", ['span.paren.level3', "]"], ['span.paren.level2', "]"], " ", ['span.paren.level2', "{"], ['span.keyword', ":alert"], " msg", ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        "\n",
        "\n",
        ['span.paren.level3', "("], ['span.reserved', "defn"], " ", ['span.declaration', "-json-request"], " ", ['span.paren.level1', "["], "response", ['span.paren.level1', "]"], "\n",
        "  ", ['span.paren.level1', "("], ['span.reserved', "if"], " response.ok ", ['span.paren.level2', "("], "response.json", ['span.paren.level2', ")"], " ", ['span.paren.level2', "("], ['span.reserved', "Promise/reject"], " response.status", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        ['span.comment', ";; downloads JSON from a URL, then evokes passed event with added param"], "\n",
        ['span.paren.level3', "("], ['span.reserved', "defn"], " ", ['span.declaration', "fetch-json"], " ", ['span.paren.level1', "["], ['span.paren.level2', "{"], ['span.keyword', ":strs"], " ", ['span.paren.level3', "["], "url params on-success on-failure", ['span.paren.level3', "]"], ['span.paren.level2', "}"], ['span.paren.level1', "]"], "\n",
        "  ", ['span.paren.level1', "("], ['span.reserved', ".."], " ", ['span.paren.level2', "("], ['span.reserved', "fetch"], " url params", ['span.paren.level2', ")"], "\n",
        "      ", ['span.paren.level2', "("], ['span.reserved', "then"], " -json-request", ['span.paren.level2', ")"], "\n",
        "      ", ['span.paren.level2', "("], ['span.reserved', "then"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "rf/disp"], " on-success ", ['span.reserved', "%"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], "\n",
        "      ", ['span.paren.level2', "("], ['span.reserved', "catch"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "rf/disp"], " on-failure ", ['span.reserved', "%"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        ['span.paren.level3', "("], ['span.reserved', "rf/reg-fx"], " ", ['span.keyword', ":fetchJson"], " fetch-json", ['span.paren.level3', ")"], "\n",
        "\n",
        ['span.comment', ";; event fetch-json{key, url} causes side-effect fetchJson"], "\n",
        ['span.paren.level3', "("], ['span.reserved', "rf/reg-event-fx"], " ", ['span.keyword', ":fetch-json"], "\n",
        "  ", ['span.paren.level1', "("], ['span.reserved', "fn"], " ", ['span.paren.level2', "["], ['span.paren.level3', "{"], "db ", ['span.keyword', ":db"], ['span.paren.level3', "}"], " ", ['span.paren.level3', "["], "_ key url", ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "{"], ['span.keyword', ":fetchJson"], " ", ['span.paren.level3', "{"], ['span.keyword', ":url"], " url,  ", ['span.keyword', ":params"], " db.params,  ", ['span.keyword', ":on-success"], " ", ['span.paren.level1', "["], ['span.keyword', ":-fetch-json"], " key", ['span.paren.level1', "]"], ['span.paren.level3', "}"], ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], "\n",
        "\n",
        ['span.comment', ";; evoked by fetchJson on success"], "\n",
        ['span.paren.level3', "("], ['span.reserved', "rf/reg-event-fx"], " ", ['span.keyword', ":-fetch-json"], "\n",
        "  ", ['span.paren.level1', "("], ['span.reserved', "fn"], " ", ['span.paren.level2', "["], ['span.paren.level3', "{"], "db ", ['span.keyword', ":db"], ['span.paren.level3', "}"], " ", ['span.paren.level3', "["], "_ key data", ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "{"], ['span.keyword', ":db"], "    ", ['span.paren.level3', "("], ['span.reserved', "assoc-in"], " db ", ['span.paren.level1', "["], ['span.keyword', ":cache"], " key", ['span.paren.level1', "]"], " data", ['span.paren.level3', ")"], "\n",
        "     ", ['span.keyword', ":alert"], " ", ['span.paren.level3', "("], ['span.reserved', "str"], " ", ['span.string', "\"Fetched '\""], " key ", ['span.string', "\"'!\""], ['span.paren.level3', ")"], ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', ")"]],
  },
  _regCofx: {
    className: 'simple',
    js: (
`let {reFrame: rf, util: {assoc, merge}} = require('mreframe');


// adds a value named 'now' into the cofx dict (non-pure function)
rf.regCofx('time', cofx => merge(cofx, {now: new Date}));

// uses the time coeffect (pure function)
rf.regEventFx('show-time', [rf.injectCofx('time')], ({now}) =>
  ({alert: "Current time is: " + now}));


// loads a value from localStorage
rf.regCofx('load', (cofx, key) => {
  try {return assoc(cofx, key, JSON.parse( localStorage.getItem(key) ))}
  catch (e) {return cofx}
});

// loads 'state' from localStorage and adds it into appDb
rf.regEventFx('load-state', [rf.injectCofx('load', 'state')], ({db, state}) =>
  ({db: merge(db, {state})}));`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ['span.reserved', ":"], " rf, ", ['span.keyword', "util"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "assoc"], ", ", ['span.reserved', "merge"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// adds a value named 'now' into the cofx dict (non-pure function)"], "\n",
        ['span.reserved', "rf.regCofx"], ['span.paren.level1', "("], ['span.keyword', "'time'"], ", cofx ", ['span.reserved', "=>"], " ", ['span.reserved', "merge"], ['span.paren.level2', "("], "cofx, ", ['span.paren.level3', "{"], ['span.keyword', "now"], ['span.reserved', ":"], " ", ['span.reserved', "new"], " ", ['span.reserved', "Date"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// uses the time coeffect (pure function)"], "\n",
        ['span.reserved', "rf.regEventFx"], ['span.paren.level1', "("], ['span.keyword', "'show-time'"], ", ", ['span.paren.level2', "["], ['span.reserved', "rf.injectCofx"], ['span.paren.level3', "("], ['span.keyword', "'time'"], ['span.paren.level3', ")"], ['span.paren.level2', "]"], ", ", ['span.paren.level2', "("], ['span.paren.level3', "{"], "now", ['span.paren.level3', "}"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "alert"], ['span.reserved', ":"], " ", ['span.string', "\"Current time is: \""], " ", ['span.reserved', "+"], " now", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// loads a value from localStorage"], "\n",
        ['span.reserved', "rf.regCofx"], ['span.paren.level1', "("], ['span.keyword', "'load'"], ", ", ['span.paren.level2', "("], "cofx, key", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.paren.level2', "{"], "\n",
        "  ", ['span.reserved', "try"], " ", ['span.paren.level3', "{"], ['span.reserved', "return"], " ", ['span.reserved', "assoc"], ['span.paren.level1', "("], "cofx, key, ", ['span.reserved', "JSON.parse"], ['span.paren.level2', "("], " ", ['span.reserved', "localStorage.getItem"], ['span.paren.level3', "("], "key", ['span.paren.level3', ")"], " ", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], "\n",
        "  ", ['span.reserved', "catch"], " ", ['span.paren.level3', "("], "e", ['span.paren.level3', ")"], " ", ['span.paren.level3', "{"], ['span.reserved', "return"], " cofx", ['span.paren.level3', "}"], "\n",
        ['span.paren.level2', "}"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// loads 'state' from localStorage and adds it into appDb"], "\n",
        ['span.reserved', "rf.regEventFx"], ['span.paren.level1', "("], ['span.keyword', "'load-state'"], ", ", ['span.paren.level2', "["], ['span.reserved', "rf.injectCofx"], ['span.paren.level3', "("], ['span.keyword', "'load'"], ", ", ['span.keyword', "'state'"], ['span.paren.level3', ")"], ['span.paren.level2', "]"], ", ", ['span.paren.level2', "("], ['span.paren.level3', "{"], "db, state", ['span.paren.level3', "}"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "db"], ['span.reserved', ":"], " ", ['span.reserved', "merge"], ['span.paren.level1', "("], "db, ", ['span.paren.level2', "{"], "state", ['span.paren.level2', "}"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";"],
    coffee: (
`{reFrame: rf, util: {assoc, merge}} = require 'mreframe'


# adds a value named 'now' into the cofx dict (non-pure function)
rf.regCofx 'time', (cofx) -> merge cofx, now: new Date

# uses the time coeffect (pure function)
rf.regEventFx 'show-time', [rf.injectCofx 'time'], ({now}) ->
  alert: "Current time is: " + now


# loads a value from localStorage
rf.regCofx 'load', (cofx, key) ->
  try assoc cofx, key, (JSON.parse localStorage.getItem key)
  catch then cofx

# loads 'state' from localStorage and adds it into appDb
rf.regEventFx 'load-state', [(rf.injectCofx 'load', 'state')], ({db, state}) ->
  db: merge db, {state}`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ": rf, ", ['span.keyword', "util"], ": ", ['span.paren.level2', "{"], ['span.reserved', "assoc"], ", ", ['span.reserved', "merge"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        "\n",
        ['span.comment', "# adds a value named 'now' into the cofx dict (non-pure function)"], "\n",
        ['span.reserved', "rf.regCofx"], " ", ['span.keyword', "'time'"], ", ", ['span.paren.level1', "("], "cofx", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "merge"], " cofx, ", ['span.keyword', "now"], ": ", ['span.reserved', "new"], " ", ['span.reserved', "Date"], "\n",
        "\n",
        ['span.comment', "# uses the time coeffect (pure function)"], "\n",
        ['span.reserved', "rf.regEventFx"], " ", ['span.keyword', "'show-time'"], ", ", ['span.paren.level1', "["], ['span.reserved', "rf.injectCofx"], " ", ['span.keyword', "'time'"], ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "now", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.keyword', "alert"], ": ", ['span.string', "\"Current time is: \""], " ", ['span.reserved', "+"], " now\n",
        "\n",
        "\n",
        ['span.comment', "# loads a value from localStorage"], "\n",
        ['span.reserved', "rf.regCofx"], " ", ['span.keyword', "'load'"], ", ", ['span.paren.level1', "("], "cofx, key", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.reserved', "try"], " ", ['span.reserved', "assoc"], " cofx, key, ", ['span.paren.level1', "("], ['span.reserved', "JSON.parse"], " ", ['span.reserved', "localStorage.getItem"], " key", ['span.paren.level1', ")"], "\n",
        "  ", ['span.reserved', "catch"], " ", ['span.reserved', "then"], " cofx\n",
        "\n",
        ['span.comment', "# loads 'state' from localStorage and adds it into appDb"], "\n",
        ['span.reserved', "rf.regEventFx"], " ", ['span.keyword', "'load-state'"], ", ", ['span.paren.level1', "["], ['span.paren.level2', "("], ['span.reserved', "rf.injectCofx"], " ", ['span.keyword', "'load'"], ", ", ['span.keyword', "'state'"], ['span.paren.level2', ")"], ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], ['span.paren.level2', "{"], "db, state", ['span.paren.level2', "}"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.keyword', "db"], ": ", ['span.reserved', "merge"], " db, ", ['span.paren.level1', "{"], "state", ['span.paren.level1', "}"]],
    wisp: (
`(ns example.reg-cofx
  (:require [wisp.runtime :refer [dictionary? dictionary]] ; used by destructuring
            [wisp.sequence :refer [assoc vec]]
            [mreframe.re-frame :as rf]))


;; adds a value named :now into the cofx dict (non-pure function)
(rf/reg-cofx :time #(assoc % :now (Date.)))

;; uses the time coeffect (pure function)
(rf/reg-event-fx :show-time [(rf/inject-cofx :time)]
  (fn [{now :now}]
    {:alert (str "Current time is: " now)}))


;; loads a value from localStorage
(rf/reg-cofx :load
  (fn [cofx key]
    (try
      (assoc cofx key (JSON/parse (local-storage/get-item key)))
      (catch e cofx))))

;; loads :state from local-storage and adds it into appDb
(rf/reg-event-fx :load-state [(rf/inject-cofx :load :state)]
  (fn [{:strs [db state]}]
    {:db (assoc db :state state)}))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.reg-cofx"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "dictionary?"], " ", ['span.reserved', "dictionary"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.comment', "; used by destructuring"], "\n",
        "            ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "assoc"], " ", ['span.reserved', "vec"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; adds a value named :now into the cofx dict (non-pure function)"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-cofx"], " ", ['span.keyword', ":time"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.reserved', "assoc"], " ", ['span.reserved', "%"], " ", ['span.keyword', ":now"], " ", ['span.paren.level3', "("], ['span.reserved', "Date."], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; uses the time coeffect (pure function)"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-fx"], " ", ['span.keyword', ":show-time"], " ", ['span.paren.level2', "["], ['span.paren.level3', "("], ['span.reserved', "rf/inject-cofx"], " ", ['span.keyword', ":time"], ['span.paren.level3', ")"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level1', "{"], "now ", ['span.keyword', ":now"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "{"], ['span.keyword', ":alert"], " ", ['span.paren.level1', "("], ['span.reserved', "str"], " ", ['span.string', "\"Current time is: \""], " now", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; loads a value from localStorage"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-cofx"], " ", ['span.keyword', ":load"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "cofx key", ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "try"], "\n",
        "      ", ['span.paren.level1', "("], ['span.reserved', "assoc"], " cofx key ", ['span.paren.level2', "("], ['span.reserved', "JSON/parse"], " ", ['span.paren.level3', "("], ['span.reserved', "local-storage/get-item"], " key", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "      ", ['span.paren.level1', "("], ['span.reserved', "catch"], " e cofx", ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; loads :state from local-storage and adds it into appDb"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-fx"], " ", ['span.keyword', ":load-state"], " ", ['span.paren.level2', "["], ['span.paren.level3', "("], ['span.reserved', "rf/inject-cofx"], " ", ['span.keyword', ":load"], " ", ['span.keyword', ":state"], ['span.paren.level3', ")"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level1', "{"], ['span.keyword', ":strs"], " ", ['span.paren.level2', "["], "db state", ['span.paren.level2', "]"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "{"], ['span.keyword', ":db"], " ", ['span.paren.level1', "("], ['span.reserved', "assoc"], " db ", ['span.keyword', ":state"], " state", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"]],
  },
  _toInterceptor: {
    className: 'simple',
    js: (
`let {reFrame: rf, util: {merge}} = require('mreframe');

// this interceptor prints out event context before and after its handling
let dbg = rf.toInterceptor({
  id: 'dbg',
  before: context => {
    console.debug("before:", context);
    return context;
  },
  after:  context => {
    console.debug("after:", context);
    return context;
  },
});

rf.regEventDb('set-foo', [dbg], (db, [_, foo]) => merge(db, {foo}));`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ['span.reserved', ":"], " rf, ", ['span.keyword', "util"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "merge"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// this interceptor prints out event context before and after its handling"], "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "dbg"], " ", ['span.reserved', "="], " ", ['span.reserved', "rf.toInterceptor"], ['span.paren.level1', "("], ['span.paren.level2', "{"], "\n",
        "  ", ['span.keyword', "id"], ['span.reserved', ":"], " ", ['span.keyword', "'dbg'"], ",\n",
        "  ", ['span.keyword', "before"], ['span.reserved', ":"], " context ", ['span.reserved', "=>"], " ", ['span.paren.level3', "{"], "\n",
        "    ", ['span.reserved', "console.debug"], ['span.paren.level1', "("], ['span.string', "\"before:\""], ", context", ['span.paren.level1', ")"], ";\n",
        "    ", ['span.reserved', "return"], " context;\n",
        "  ", ['span.paren.level3', "}"], ",\n",
        "  ", ['span.keyword', "after"], ['span.reserved', ":"], "  context ", ['span.reserved', "=>"], " ", ['span.paren.level3', "{"], "\n",
        "    ", ['span.reserved', "console.debug"], ['span.paren.level1', "("], ['span.string', "\"after:\""], ", context", ['span.paren.level1', ")"], ";\n",
        "    ", ['span.reserved', "return"], " context;\n",
        "  ", ['span.paren.level3', "}"], ",\n",
        ['span.paren.level2', "}"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'set-foo'"], ", ", ['span.paren.level2', "["], "dbg", ['span.paren.level2', "]"], ", ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, foo", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "merge"], ['span.paren.level2', "("], "db, ", ['span.paren.level3', "{"], "foo", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";"],
    coffee: (
`{reFrame: rf, util: {merge}} = require 'mreframe'

# this interceptor prints out event context before and after its handling
dbg = rf.toInterceptor
  id: 'dbg'
  before: (context) ->
    console.debug "before:", context
    context
  after:  (context) ->
    console.debug "after:", context
    context

rf.regEventDb 'set-foo', [dbg], (db, [_, foo]) -> merge db, {foo}`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ": rf, ", ['span.keyword', "util"], ": ", ['span.paren.level2', "{"], ['span.reserved', "merge"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        ['span.comment', "# this interceptor prints out event context before and after its handling"], "\n",
        ['span.declaration', "dbg"], " ", ['span.reserved', "="], " ", ['span.reserved', "rf.toInterceptor"], "\n",
        "  ", ['span.keyword', "id"], ": ", ['span.keyword', "'dbg'"], "\n",
        "  ", ['span.keyword', "before"], ": ", ['span.paren.level1', "("], "context", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "    ", ['span.reserved', "console.debug"], " ", ['span.string', "\"before:\""], ", context\n",
        "    context\n",
        "  ", ['span.keyword', "after"], ":  ", ['span.paren.level1', "("], "context", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "    ", ['span.reserved', "console.debug"], " ", ['span.string', "\"after:\""], ", context\n",
        "    context\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'set-foo'"], ", ", ['span.paren.level1', "["], "dbg", ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "_, foo", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "merge"], " db, ", ['span.paren.level1', "{"], "foo", ['span.paren.level1', "}"]],
    wisp: (
`(ns example.->interceptor
  (:require [wisp.runtime :refer [merge]]
            [wisp.sequence :refer [nth]] ; used by destructuring
            [mreframe.re-frame :as rf]))

;; this interceptor prints out event context before and after its handling
(def dbg
  (rf/->interceptor
    {:id :dbg
     :before (fn [context]
               (console/debug "before:" context)
               context)
     :after  (fn [context]
               (console/debug "after:" context)
               context)}))

(defn set-foo [db [_ foo]]
  (merge db {:foo foo}))
(rf/reg-event-db :set-foo [dbg] set-foo)`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.->interceptor"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "merge"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "nth"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.comment', "; used by destructuring"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; this interceptor prints out event context before and after its handling"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "dbg"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "rf/->interceptor"], "\n",
        "    ", ['span.paren.level3', "{"], ['span.keyword', ":id"], " ", ['span.keyword', ":dbg"], "\n",
        "     ", ['span.keyword', ":before"], " ", ['span.paren.level1', "("], ['span.reserved', "fn"], " ", ['span.paren.level2', "["], "context", ['span.paren.level2', "]"], "\n",
        "               ", ['span.paren.level2', "("], ['span.reserved', "console/debug"], " ", ['span.string', "\"before:\""], " context", ['span.paren.level2', ")"], "\n",
        "               context", ['span.paren.level1', ")"], "\n",
        "     ", ['span.keyword', ":after"], "  ", ['span.paren.level1', "("], ['span.reserved', "fn"], " ", ['span.paren.level2', "["], "context", ['span.paren.level2', "]"], "\n",
        "               ", ['span.paren.level2', "("], ['span.reserved', "console/debug"], " ", ['span.string', "\"after:\""], " context", ['span.paren.level2', ")"], "\n",
        "               context", ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "set-foo"], " ", ['span.paren.level2', "["], "db ", ['span.paren.level3', "["], "_ foo", ['span.paren.level3', "]"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "merge"], " db ", ['span.paren.level3', "{"], ['span.keyword', ":foo"], " foo", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":set-foo"], " ", ['span.paren.level2', "["], "dbg", ['span.paren.level2', "]"], " set-foo", ['span.paren.level1', ")"]],
  },
  _interceptors: {
    className: 'simple',
    js: (
`let {reFrame: rf, util: {merge, assoc, assocIn}} = require('mreframe');


// rf.path works on specified subpath of db (similarly to using assocIn)
rf.regEventDb('set-foo', [rf.path('foo')], (db, [_, foo]) => foo);


// rf.unwrap and rf.trimV simplify event data passed into handler
rf.regEventDb('set', [rf.trimV], (db, [key, value]) => assoc(db, key, value));
rf.regEventDb('set-foo', [rf.unwrap], (db, foo) => merge(db, {foo}));


// rf.enrich and rf.after do post-processing of db after the event
let ensureNumber = rf.enrich((db, [_, key]) =>
  assoc(db, key, Number(db[key]) || 0));           // db is updated
let saveState = rf.after((db, event) =>
  localStorage.setItem('db', JSON.stringify(db))); // side-effect

// after setting the value, it's converted to a number, then db is saved
rf.regEventDb('set-number', [saveState, ensureNumber], (db, [_, key, value]) =>
  assoc(db, key, value));


// rf.onChanges is similar to rf.enrich but recalculates conditionally
let calcTotal = rf.onChanges((n1, n2, n3) => n1 + n2 + n3,
                             ['outputs', 'total'],
                             ['inputs', 1], ['inputs', 2], ['inputs', 3]);

// if any of the three inputs is changed, db.outputs.total is recalculated
rf.regEventDb('set-input', [calcTotal], (db, [_, key, value]) =>
  assocIn(db, ['inputs', key], value));`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ['span.reserved', ":"], " rf, ", ['span.keyword', "util"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "merge"], ", ", ['span.reserved', "assoc"], ", ", ['span.reserved', "assocIn"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// rf.path works on specified subpath of db (similarly to using assocIn)"], "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'set-foo'"], ", ", ['span.paren.level2', "["], ['span.reserved', "rf.path"], ['span.paren.level3', "("], ['span.keyword', "'foo'"], ['span.paren.level3', ")"], ['span.paren.level2', "]"], ", ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, foo", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " foo", ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// rf.unwrap and rf.trimV simplify event data passed into handler"], "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'set'"], ", ", ['span.paren.level2', "["], ['span.reserved', "rf.trimV"], ['span.paren.level2', "]"], ", ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "key, value", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "assoc"], ['span.paren.level2', "("], "db, key, value", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'set-foo'"], ", ", ['span.paren.level2', "["], ['span.reserved', "rf.unwrap"], ['span.paren.level2', "]"], ", ", ['span.paren.level2', "("], "db, foo", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " ", ['span.reserved', "merge"], ['span.paren.level2', "("], "db, ", ['span.paren.level3', "{"], "foo", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// rf.enrich and rf.after do post-processing of db after the event"], "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "ensureNumber"], " ", ['span.reserved', "="], " ", ['span.reserved', "rf.enrich"], ['span.paren.level1', "("], ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, key", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.reserved', "assoc"], ['span.paren.level2', "("], "db, key, ", ['span.reserved', "Number"], ['span.paren.level3', "("], "db", ['span.paren.level1', "["], "key", ['span.paren.level1', "]"], ['span.paren.level3', ")"], " ", ['span.reserved', "||"], " 0", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";           ", ['span.comment', "// db is updated"], "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "saveState"], " ", ['span.reserved', "="], " ", ['span.reserved', "rf.after"], ['span.paren.level1', "("], ['span.paren.level2', "("], "db, event", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.reserved', "localStorage.setItem"], ['span.paren.level2', "("], ['span.keyword', "'db'"], ", ", ['span.reserved', "JSON.stringify"], ['span.paren.level3', "("], "db", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "; ", ['span.comment', "// side-effect"], "\n",
        "\n",
        ['span.comment', "// after setting the value, it's converted to a number, then db is saved"], "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'set-number'"], ", ", ['span.paren.level2', "["], "saveState, ensureNumber", ['span.paren.level2', "]"], ", ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, key, value", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.reserved', "assoc"], ['span.paren.level2', "("], "db, key, value", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// rf.onChanges is similar to rf.enrich but recalculates conditionally"], "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "calcTotal"], " ", ['span.reserved', "="], " ", ['span.reserved', "rf.onChanges"], ['span.paren.level1', "("], ['span.paren.level2', "("], "n1, n2, n3", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], " n1 ", ['span.reserved', "+"], " n2 ", ['span.reserved', "+"], " n3,\n",
        "                             ", ['span.paren.level2', "["], ['span.keyword', "'outputs'"], ", ", ['span.keyword', "'total'"], ['span.paren.level2', "]"], ",\n",
        "                             ", ['span.paren.level2', "["], ['span.keyword', "'inputs'"], ", 1", ['span.paren.level2', "]"], ", ", ['span.paren.level2', "["], ['span.keyword', "'inputs'"], ", 2", ['span.paren.level2', "]"], ", ", ['span.paren.level2', "["], ['span.keyword', "'inputs'"], ", 3", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.comment', "// if any of the three inputs is changed, db.outputs.total is recalculated"], "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], ['span.keyword', "'set-input'"], ", ", ['span.paren.level2', "["], "calcTotal", ['span.paren.level2', "]"], ", ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, key, value", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.reserved', "assocIn"], ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], ['span.keyword', "'inputs'"], ", key", ['span.paren.level3', "]"], ", value", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";"],
    coffee: (
`{reFrame: rf, util: {merge, assoc, assocIn}} = require 'mreframe'


# rf.path works on specified subpath of db (similarly to using assocIn)
rf.regEventDb 'set-foo', [rf.path 'foo'], (db, [_, foo]) -> foo


# rf.unwrap and rf.trimV simplify event data passed into handler
rf.regEventDb 'set', [rf.trimV], (db, [key, value]) -> assoc db, key, value
rf.regEventDb 'set-foo', [rf.unwrap], (db, foo) -> merge db, {foo}


# rf.enrich and rf.after do post-processing of db after the event
ensureNumber = rf.enrich (db, [_, key]) ->
  assoc db, key, ((Number db[key]) or 0)         # db is updated
saveState = rf.after (db, event) ->
  localStorage.setItem 'db', (JSON.stringify db) # side-effect

# after setting the value, it's converted to a number, then db is saved
rf.regEventDb 'set-number', [saveState, ensureNumber], (db, [_, key, value]) ->
  assoc db, key, value


# rf.onChanges is similar to rf.enrich but recalculates conditionally
calcTotal = rf.onChanges ((n1, n2, n3) -> n1 + n2 + n3),
                         ['outputs', 'total'],
                         ['inputs', 1], ['inputs', 2], ['inputs', 3]

# if any of the three inputs is changed, db.outputs.total is recalculated
rf.regEventDb 'set-input', [calcTotal], (db, [_, key, value]) ->
  assocIn db, ['inputs', key], value`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ": rf, ", ['span.keyword', "util"], ": ", ['span.paren.level2', "{"], ['span.reserved', "merge"], ", ", ['span.reserved', "assoc"], ", ", ['span.reserved', "assocIn"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        "\n",
        ['span.comment', "# rf.path works on specified subpath of db (similarly to using assocIn)"], "\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'set-foo'"], ", ", ['span.paren.level1', "["], ['span.reserved', "rf.path"], " ", ['span.keyword', "'foo'"], ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "_, foo", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " foo\n",
        "\n",
        "\n",
        ['span.comment', "# rf.unwrap and rf.trimV simplify event data passed into handler"], "\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'set'"], ", ", ['span.paren.level1', "["], ['span.reserved', "rf.trimV"], ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "key, value", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "assoc"], " db, key, value\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'set-foo'"], ", ", ['span.paren.level1', "["], ['span.reserved', "rf.unwrap"], ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], "db, foo", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "merge"], " db, ", ['span.paren.level1', "{"], "foo", ['span.paren.level1', "}"], "\n",
        "\n",
        "\n",
        ['span.comment', "# rf.enrich and rf.after do post-processing of db after the event"], "\n",
        ['span.declaration', "ensureNumber"], " ", ['span.reserved', "="], " ", ['span.reserved', "rf.enrich"], " ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "_, key", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.reserved', "assoc"], " db, key, ", ['span.paren.level1', "("], ['span.paren.level2', "("], ['span.reserved', "Number"], " db", ['span.paren.level3', "["], "key", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "or"], " 0", ['span.paren.level1', ")"], "         ", ['span.comment', "# db is updated"], "\n",
        ['span.declaration', "saveState"], " ", ['span.reserved', "="], " ", ['span.reserved', "rf.after"], " ", ['span.paren.level1', "("], "db, event", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.reserved', "localStorage.setItem"], " ", ['span.keyword', "'db'"], ", ", ['span.paren.level1', "("], ['span.reserved', "JSON.stringify"], " db", ['span.paren.level1', ")"], " ", ['span.comment', "# side-effect"], "\n",
        "\n",
        ['span.comment', "# after setting the value, it's converted to a number, then db is saved"], "\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'set-number'"], ", ", ['span.paren.level1', "["], "saveState, ensureNumber", ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "_, key, value", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.reserved', "assoc"], " db, key, value\n",
        "\n",
        "\n",
        ['span.comment', "# rf.onChanges is similar to rf.enrich but recalculates conditionally"], "\n",
        ['span.declaration', "calcTotal"], " ", ['span.reserved', "="], " ", ['span.reserved', "rf.onChanges"], " ", ['span.paren.level1', "("], ['span.paren.level2', "("], "n1, n2, n3", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " n1 ", ['span.reserved', "+"], " n2 ", ['span.reserved', "+"], " n3", ['span.paren.level1', ")"], ",\n",
        "                         ", ['span.paren.level1', "["], ['span.keyword', "'outputs'"], ", ", ['span.keyword', "'total'"], ['span.paren.level1', "]"], ",\n",
        "                         ", ['span.paren.level1', "["], ['span.keyword', "'inputs'"], ", 1", ['span.paren.level1', "]"], ", ", ['span.paren.level1', "["], ['span.keyword', "'inputs'"], ", 2", ['span.paren.level1', "]"], ", ", ['span.paren.level1', "["], ['span.keyword', "'inputs'"], ", 3", ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.comment', "# if any of the three inputs is changed, db.outputs.total is recalculated"], "\n",
        ['span.reserved', "rf.regEventDb"], " ", ['span.keyword', "'set-input'"], ", ", ['span.paren.level1', "["], "calcTotal", ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], "db, ", ['span.paren.level2', "["], "_, key, value", ['span.paren.level2', "]"], ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.reserved', "assocIn"], " db, ", ['span.paren.level1', "["], ['span.keyword', "'inputs'"], ", key", ['span.paren.level1', "]"], ", value"],
    wisp: (
`(ns example.interceptors
  (:require [wisp.sequence :refer [assoc nth]]
            [mreframe.util :refer [assoc-in]]
            [mreframe.re-frame :as rf]))


;; rf/path works on specified subpath of db (similarly to using assoc-in)
(rf/reg-event-db :set-foo [(rf/path :foo)]
  (fn [db [_ foo]] foo))


;; rf/unwrap and rf/trim-v simplify event data passed into handler
(rf/reg-event-db :set [rf/trim-v]
  (fn [db [key value]] (assoc db key value)))
(rf/reg-event-db :set-foo [rf/unwrap]
  (fn [db foo] (assoc db :foo foo)))


;; rf/enrich and rf/after do post-processing of db after the event
(def ensure-number
  (rf/enrich (fn [db [_ key]]
               (assoc db key (or (Number (get db key)) 0)))))    ; db is updated
(def save-state
  (rf/after (fn [db event]
              (localStorage/set-item :db (JSON/stringify db))))) ; side-effect

;; after setting the value, it's converted to a number, then db is saved
(rf/reg-event-db :set-number [save-state ensure-number]
  (fn [db [_ key value]] (assoc db key value)))


;; rf/on-changes is similar to rf/enrich but recalculates conditionally
(def calc-total
  (rf/on-changes #(+ %1 %2 %3)
                 [:outputs :total]
                 [:inputs 1] [:inputs 2] [:inputs 3]))

;; if any of the three inputs is changed, db.outputs.total is recalculated
(rf/reg-event-db :set-input [calc-total]
  (fn [db [_ key value]]
    (assoc-in db [:inputs key] value)))`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.interceptors"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "assoc"], " ", ['span.reserved', "nth"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.util ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "assoc-in"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; rf/path works on specified subpath of db (similarly to using assoc-in)"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":set-foo"], " ", ['span.paren.level2', "["], ['span.paren.level3', "("], ['span.reserved', "rf/path"], " ", ['span.keyword', ":foo"], ['span.paren.level3', ")"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "_ foo", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " foo", ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; rf/unwrap and rf/trim-v simplify event data passed into handler"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":set"], " ", ['span.paren.level2', "["], ['span.reserved', "rf/trim-v"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "key value", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "assoc"], " db key value", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":set-foo"], " ", ['span.paren.level2', "["], ['span.reserved', "rf/unwrap"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db foo", ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "assoc"], " db ", ['span.keyword', ":foo"], " foo", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; rf/enrich and rf/after do post-processing of db after the event"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "ensure-number"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "rf/enrich"], " ", ['span.paren.level3', "("], ['span.reserved', "fn"], " ", ['span.paren.level1', "["], "db ", ['span.paren.level2', "["], "_ key", ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "               ", ['span.paren.level1', "("], ['span.reserved', "assoc"], " db key ", ['span.paren.level2', "("], ['span.reserved', "or"], " ", ['span.paren.level3', "("], ['span.reserved', "Number"], " ", ['span.paren.level1', "("], ['span.reserved', "get"], " db key", ['span.paren.level1', ")"], ['span.paren.level3', ")"], " 0", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "    ", ['span.comment', "; db is updated"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "save-state"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "rf/after"], " ", ['span.paren.level3', "("], ['span.reserved', "fn"], " ", ['span.paren.level1', "["], "db event", ['span.paren.level1', "]"], "\n",
        "              ", ['span.paren.level1', "("], ['span.reserved', "localStorage/set-item"], " ", ['span.keyword', ":db"], " ", ['span.paren.level2', "("], ['span.reserved', "JSON/stringify"], " db", ['span.paren.level2', ")"], ['span.paren.level1', ")"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], " ", ['span.comment', "; side-effect"], "\n",
        "\n",
        ['span.comment', ";; after setting the value, it's converted to a number, then db is saved"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":set-number"], " ", ['span.paren.level2', "["], "save-state ensure-number", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "_ key value", ['span.paren.level1', "]"], ['span.paren.level3', "]"], " ", ['span.paren.level3', "("], ['span.reserved', "assoc"], " db key value", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; rf/on-changes is similar to rf/enrich but recalculates conditionally"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "def"], " ", ['span.declaration', "calc-total"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "rf/on-changes"], " ", ['span.reserved', "#"], ['span.paren.level3', "("], ['span.reserved', "+"], " ", ['span.reserved', "%1"], " ", ['span.reserved', "%2"], " ", ['span.reserved', "%3"], ['span.paren.level3', ")"], "\n",
        "                 ", ['span.paren.level3', "["], ['span.keyword', ":outputs"], " ", ['span.keyword', ":total"], ['span.paren.level3', "]"], "\n",
        "                 ", ['span.paren.level3', "["], ['span.keyword', ":inputs"], " 1", ['span.paren.level3', "]"], " ", ['span.paren.level3', "["], ['span.keyword', ":inputs"], " 2", ['span.paren.level3', "]"], " ", ['span.paren.level3', "["], ['span.keyword', ":inputs"], " 3", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.comment', ";; if any of the three inputs is changed, db.outputs.total is recalculated"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], " ", ['span.keyword', ":set-input"], " ", ['span.paren.level2', "["], "calc-total", ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "_ key value", ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "("], ['span.reserved', "assoc-in"], " db ", ['span.paren.level1', "["], ['span.keyword', ":inputs"], " key", ['span.paren.level1', "]"], " value", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"]],
  },
  demo: {
    className: 'demo',
    eval: Function(_nodeEscape(
`let require = path => path.split('/').reduce((x, k) => x[k], this);

let {reFrame: rf, reagent: r, util: {merge}} = require('mreframe');


// -- event dispatch ----------------------------------------------------------

let dispatchTimerEvent = () =>
  rf.dispatch(['timer', new Date]);  // <-- dispatch used

// Call the dispatching function every second.
setInterval(dispatchTimerEvent, 1000);  // doTimer


// -- event handlers ----------------------------------------------------------

rf.regEventDb(               // sets up initial application state
 'initialize',               // usage:  rf.dispatch(['initialize'])
 () =>                       // the two parameters are not important here, so omitting them
   ({time: new Date,         // What it returns becomes the new application state
     timeColor: "#f88"}));   // so the application state will initially be a dict with two keys


rf.regEventDb(                 // usage:  rf.dispatch(['time-color-change', 34562])
 'time-color-change',          // dispatched when the user enters a new colour into the UI text field
 (db, [_, newColorValue]) =>   // DB event handlers given 2 parameters: application state and event (an array)
   merge(db, {timeColor: newColorValue}));   // compute and return the new application state


rf.regEventDb(                  // usage:  rf.dispatch(['timer', aJsDate])
 'timer',                       // every second an event of this kind will be dispatched
 (db, [_, newTime]) =>          // note how the 2nd parameter is destructured to obtain the data value
   merge(db, {time: newTime})); // compute and return the new application state


// -- query -------------------------------------------------------------------

rf.regSub(
 'time',
 (db, _) =>     // db is current app state. 2nd unused param is query array
   db.time);    // return a query computation over the application state

rf.regSub('timeColor', db => db.timeColor);

rf.regSub('time-show', '<-', ['time'], it =>
  it.toTimeString().split(" ")[0]);


// -- view functions ----------------------------------------------------------

let clock = () =>
  ['div.example-clock', {style: {color: rf.dsub(['timeColor'])}},
    rf.dsub(['time-show'])];

let colorInput = () =>
  ['div.color-input',
    "Time color: ",
    ['input', {type:    'text',
               value:   rf.dsub(['timeColor']),
               oninput: e => rf.dispatch(['time-color-change', e.target.value])}]];  // <---

let ui = () =>
  ['div',
    ['h1', "Hello world, it is now"],
    [clock],
    [colorInput]];


// -- entry point -------------------------------------------------------------

rf.dispatchSync(['initialize']);                // put a value into application state
return ui;`
    )),
    html: (
`<div>
  <h1>Hello world, it is now</h1>
  <div class="example-clock" style="color:#f88">
    02:25:00
  </div>
  <div class="color-input">
    Time color: <input type="text" value="#f88"/>
  </div>
</div>`
    ),
    js: (
`let {reFrame: rf, reagent: r, util: {merge}} = require('mreframe');


// -- event dispatch ----------------------------------------------------------

let dispatchTimerEvent = () =>
  rf.dispatch(['timer', new Date]);  // <-- dispatch used

// Call the dispatching function every second.
setInterval(dispatchTimerEvent, 1000);  // doTimer


// -- event handlers ----------------------------------------------------------

rf.regEventDb(               // sets up initial application state
 'initialize',               // usage:  rf.dispatch(['initialize'])
 () =>                       // the two parameters are not important here, so omitting them
   ({time: new Date,         // What it returns becomes the new application state
     timeColor: "#f88"}));   // so the application state will initially be a dict with two keys


rf.regEventDb(                 // usage:  rf.dispatch(['time-color-change', 34562])
 'time-color-change',          // dispatched when the user enters a new colour into the UI text field
 (db, [_, newColorValue]) =>   // DB event handlers given 2 parameters: application state and event (an array)
   merge(db, {timeColor: newColorValue}));   // compute and return the new application state


rf.regEventDb(                  // usage:  rf.dispatch(['timer', aJsDate])
 'timer',                       // every second an event of this kind will be dispatched
 (db, [_, newTime]) =>          // note how the 2nd parameter is destructured to obtain the data value
   merge(db, {time: newTime})); // compute and return the new application state


// -- query -------------------------------------------------------------------

rf.regSub(
 'time',
 (db, _) =>     // db is current app state. 2nd unused param is query array
   db.time);    // return a query computation over the application state

rf.regSub('timeColor', db => db.timeColor);

rf.regSub('time-show', '<-', ['time'], it =>
  it.toTimeString().split(" ")[0]);


// -- view functions ----------------------------------------------------------

let clock = () =>
  ['div.example-clock', {style: {color: rf.dsub(['timeColor'])}},
    rf.dsub(['time-show'])];

let colorInput = () =>
  ['div.color-input',
    "Time color: ",
    ['input', {type:    'text',
               value:   rf.dsub(['timeColor']),
               oninput: e => rf.dispatch(['time-color-change', e.target.value])}]];  // <---

let ui = () =>
  ['div',
    ['h1', "Hello world, it is now"],
    [clock],
    [colorInput]];


// -- entry point -------------------------------------------------------------

rf.dispatchSync(['initialize']);                // put a value into application state
r.render([ui], document.getElementById('app')); // mount the application's ui into '<div id="app"/>'`
    ),
    js_:
      ['<>',
        ['span.reserved', "let"], " ", ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ['span.reserved', ":"], " rf, ", ['span.keyword', "reagent"], ['span.reserved', ":"], " r, ", ['span.keyword', "util"], ['span.reserved', ":"], " ", ['span.paren.level2', "{"], ['span.reserved', "merge"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], ['span.paren.level1', "("], ['span.keyword', "'mreframe'"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// -- event dispatch ----------------------------------------------------------"], "\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "dispatchTimerEvent"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.reserved', "rf.dispatch"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'timer'"], ", ", ['span.reserved', "new"], " ", ['span.reserved', "Date"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ";  ", ['span.comment', "// <-- dispatch used"], "\n",
        "\n",
        ['span.comment', "// Call the dispatching function every second."], "\n",
        ['span.reserved', "setInterval"], ['span.paren.level1', "("], "dispatchTimerEvent, 1000", ['span.paren.level1', ")"], ";  ", ['span.comment', "// doTimer"], "\n",
        "\n",
        "\n",
        ['span.comment', "// -- event handlers ----------------------------------------------------------"], "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], "               ", ['span.comment', "// sets up initial application state"], "\n",
        " ", ['span.keyword', "'initialize'"], ",               ", ['span.comment', "// usage:  rf.dispatch(['initialize'])"], "\n",
        " ", ['span.paren.level2', "("], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "                       ", ['span.comment', "// the two parameters are not important here, so omitting them"], "\n",
        "   ", ['span.paren.level2', "("], ['span.paren.level3', "{"], ['span.keyword', "time"], ['span.reserved', ":"], " ", ['span.reserved', "new"], " ", ['span.reserved', "Date"], ",         ", ['span.comment', "// What it returns becomes the new application state"], "\n",
        "     ", ['span.keyword', "timeColor"], ['span.reserved', ":"], " ", ['span.string', "\"#f88\""], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";   ", ['span.comment', "// so the application state will initially be a dict with two keys"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], "                 ", ['span.comment', "// usage:  rf.dispatch(['time-color-change', 34562])"], "\n",
        " ", ['span.keyword', "'time-color-change'"], ",          ", ['span.comment', "// dispatched when the user enters a new colour into the UI text field"], "\n",
        " ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, newColorValue", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "   ", ['span.comment', "// DB event handlers given 2 parameters: application state and event (an array)"], "\n",
        "   ", ['span.reserved', "merge"], ['span.paren.level2', "("], "db, ", ['span.paren.level3', "{"], ['span.keyword', "timeColor"], ['span.reserved', ":"], " newColorValue", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], ";   ", ['span.comment', "// compute and return the new application state"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], "                  ", ['span.comment', "// usage:  rf.dispatch(['timer', aJsDate])"], "\n",
        " ", ['span.keyword', "'timer'"], ",                       ", ['span.comment', "// every second an event of this kind will be dispatched"], "\n",
        " ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, newTime", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "          ", ['span.comment', "// note how the 2nd parameter is destructured to obtain the data value"], "\n",
        "   ", ['span.reserved', "merge"], ['span.paren.level2', "("], "db, ", ['span.paren.level3', "{"], ['span.keyword', "time"], ['span.reserved', ":"], " newTime", ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "; ", ['span.comment', "// compute and return the new application state"], "\n",
        "\n",
        "\n",
        ['span.comment', "// -- query -------------------------------------------------------------------"], "\n",
        "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], "\n",
        " ", ['span.keyword', "'time'"], ",\n",
        " ", ['span.paren.level2', "("], "db, _", ['span.paren.level2', ")"], " ", ['span.reserved', "=>"], "     ", ['span.comment', "// db is current app state. 2nd unused param is query array"], "\n",
        "   db.time", ['span.paren.level1', ")"], ";    ", ['span.comment', "// return a query computation over the application state"], "\n",
        "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'timeColor'"], ", db ", ['span.reserved', "=>"], " db.timeColor", ['span.paren.level1', ")"], ";\n",
        "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], ['span.keyword', "'time-show'"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level2', "["], ['span.keyword', "'time'"], ['span.paren.level2', "]"], ", it ", ['span.reserved', "=>"], "\n",
        "  it.toTimeString", ['span.paren.level2', "("], ['span.paren.level2', ")"], ".split", ['span.paren.level2', "("], ['span.string', "\" \""], ['span.paren.level2', ")"], ['span.paren.level2', "["], "0", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// -- view functions ----------------------------------------------------------"], "\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "clock"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div.example-clock'"], ", ", ['span.paren.level2', "{"], ['span.keyword', "style"], ['span.reserved', ":"], " ", ['span.paren.level3', "{"], ['span.keyword', "color"], ['span.reserved', ":"], " ", ['span.reserved', "rf.dsub"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'timeColor'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "}"], ",\n",
        "    ", ['span.reserved', "rf.dsub"], ['span.paren.level2', "("], ['span.paren.level3', "["], ['span.keyword', "'time-show'"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', "]"], ";\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "colorInput"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div.color-input'"], ",\n",
        "    ", ['span.string', "\"Time color: \""], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "type"], ['span.reserved', ":"], "    ", ['span.keyword', "'text'"], ",\n",
        "               ", ['span.keyword', "value"], ['span.reserved', ":"], "   ", ['span.reserved', "rf.dsub"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'timeColor'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ",\n",
        "               ", ['span.keyword', "oninput"], ['span.reserved', ":"], " e ", ['span.reserved', "=>"], " ", ['span.reserved', "rf.dispatch"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'time-color-change'"], ", e.target.value", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";  ", ['span.comment', "// <---"], "\n",
        "\n",
        ['span.reserved', "let"], " ", ['span.declaration', "ui"], " ", ['span.reserved', "="], " ", ['span.paren.level1', "("], ['span.paren.level1', ")"], " ", ['span.reserved', "=>"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], ",\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'h1'"], ", ", ['span.string', "\"Hello world, it is now\""], ['span.paren.level2', "]"], ",\n",
        "    ", ['span.paren.level2', "["], "clock", ['span.paren.level2', "]"], ",\n",
        "    ", ['span.paren.level2', "["], "colorInput", ['span.paren.level2', "]"], ['span.paren.level1', "]"], ";\n",
        "\n",
        "\n",
        ['span.comment', "// -- entry point -------------------------------------------------------------"], "\n",
        "\n",
        ['span.reserved', "rf.dispatchSync"], ['span.paren.level1', "("], ['span.paren.level2', "["], ['span.keyword', "'initialize'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ";                ", ['span.comment', "// put a value into application state"], "\n",
        ['span.reserved', "r.render"], ['span.paren.level1', "("], ['span.paren.level2', "["], "ui", ['span.paren.level2', "]"], ", ", ['span.reserved', "document.getElementById"], ['span.paren.level2', "("], ['span.keyword', "'app'"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "; ", ['span.comment', "// mount the application's ui into '<div id=\"app\"/>'"]],
    coffee: (
`{reFrame: rf, reagent: r, util: {merge}} = require 'mreframe'


# -- event dispatch ----------------------------------------------------------

dispatchTimerEvent = ->
  rf.dispatch ['timer', new Date]  # <-- dispatch used

# Call the dispatching function every second.
setInterval dispatchTimerEvent, 1000  # doTimer


# -- event handlers ----------------------------------------------------------

rf.regEventDb(         # sets up initial application state
 'initialize',         # usage:  rf.dispatch ['initialize']
 ->                    # the two parameters are not important here, so omitting them
  time: new Date       # What it returns becomes the new application state
  timeColor: "#f88")   # so the application state will initially be a dict with two keys


rf.regEventDb(                 # usage:  rf.dispatch ['time-color-change', 34562]
 'time-color-change',          # dispatched when the user enters a new colour into the UI text field
 (db, [_, newColorValue]) ->   # DB event handlers given 2 parameters: application state and event (an array)
   (merge db, timeColor: newColorValue))   # compute and return the new application state


rf.regEventDb(                # usage:  rf.dispatch ['timer', aJsDate]
 'timer',                     # every second an event of this kind will be dispatched
 (db, [_, newTime]) ->        # note how the 2nd parameter is destructured to obtain the data value
   (merge db, time: newTime)) # compute and return the new application state


# -- query -------------------------------------------------------------------

rf.regSub(
 'time',
 (db, _) ->    # db is current app state. 2nd unused param is query array
   db.time)    # return a query computation over the application state

rf.regSub 'timeColor', (db) -> db.timeColor

rf.regSub 'time-show', '<-', ['time'], (it) ->
  it.toTimeString().split(" ")[0]


# -- view functions ----------------------------------------------------------

clock = ->
  ['div.example-clock', style: {color: rf.dsub ['timeColor']}
    rf.dsub ['time-show']]

colorInput = ->
  ['div.color-input'
    "Time color: "
    ['input', {type:    'text',\\
               value:   (rf.dsub ['timeColor']),\\
               oninput: ((e) -> rf.dispatch ['time-color-change', e.target.value])}]]  # <---

ui = ->
  ['div'
    ['h1', "Hello world, it is now"]
    [clock]
    [colorInput]]


# -- entry point -------------------------------------------------------------

rf.dispatchSync ['initialize']                 # put a value into application state
r.render [ui], (document.getElementById 'app') # mount the application's ui into '<div id="app"/>'`
    ),
    coffee_:
      ['<>',
        ['span.paren.level1', "{"], ['span.keyword', "reFrame"], ": rf, ", ['span.keyword', "reagent"], ": r, ", ['span.keyword', "util"], ": ", ['span.paren.level2', "{"], ['span.reserved', "merge"], ['span.paren.level2', "}"], ['span.paren.level1', "}"], " ", ['span.reserved', "="], " ", ['span.reserved', "require"], " ", ['span.keyword', "'mreframe'"], "\n",
        "\n",
        "\n",
        ['span.comment', "# -- event dispatch ----------------------------------------------------------"], "\n",
        "\n",
        ['span.declaration', "dispatchTimerEvent"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.reserved', "rf.dispatch"], " ", ['span.paren.level1', "["], ['span.keyword', "'timer'"], ", ", ['span.reserved', "new"], " ", ['span.reserved', "Date"], ['span.paren.level1', "]"], "  ", ['span.comment', "# <-- dispatch used"], "\n",
        "\n",
        ['span.comment', "# Call the dispatching function every second."], "\n",
        ['span.reserved', "setInterval"], " dispatchTimerEvent, 1000  ", ['span.comment', "# doTimer"], "\n",
        "\n",
        "\n",
        ['span.comment', "# -- event handlers ----------------------------------------------------------"], "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], "         ", ['span.comment', "# sets up initial application state"], "\n",
        " ", ['span.keyword', "'initialize'"], ",         ", ['span.comment', "# usage:  rf.dispatch ['initialize']"], "\n",
        " ", ['span.reserved', "->"], "                    ", ['span.comment', "# the two parameters are not important here, so omitting them"], "\n",
        "  ", ['span.keyword', "time"], ": ", ['span.reserved', "new"], " ", ['span.reserved', "Date"], "       ", ['span.comment', "# What it returns becomes the new application state"], "\n",
        "  ", ['span.keyword', "timeColor"], ": ", ['span.string', "\"#f88\""], ['span.paren.level1', ")"], "   ", ['span.comment', "# so the application state will initially be a dict with two keys"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], "                 ", ['span.comment', "# usage:  rf.dispatch ['time-color-change', 34562]"], "\n",
        " ", ['span.keyword', "'time-color-change'"], ",          ", ['span.comment', "# dispatched when the user enters a new colour into the UI text field"], "\n",
        " ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, newColorValue", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "->"], "   ", ['span.comment', "# DB event handlers given 2 parameters: application state and event (an array)"], "\n",
        "   ", ['span.paren.level2', "("], ['span.reserved', "merge"], " db, ", ['span.keyword', "timeColor"], ": newColorValue", ['span.paren.level2', ")"], ['span.paren.level1', ")"], "   ", ['span.comment', "# compute and return the new application state"], "\n",
        "\n",
        "\n",
        ['span.reserved', "rf.regEventDb"], ['span.paren.level1', "("], "                ", ['span.comment', "# usage:  rf.dispatch ['timer', aJsDate]"], "\n",
        " ", ['span.keyword', "'timer'"], ",                     ", ['span.comment', "# every second an event of this kind will be dispatched"], "\n",
        " ", ['span.paren.level2', "("], "db, ", ['span.paren.level3', "["], "_, newTime", ['span.paren.level3', "]"], ['span.paren.level2', ")"], " ", ['span.reserved', "->"], "        ", ['span.comment', "# note how the 2nd parameter is destructured to obtain the data value"], "\n",
        "   ", ['span.paren.level2', "("], ['span.reserved', "merge"], " db, ", ['span.keyword', "time"], ": newTime", ['span.paren.level2', ")"], ['span.paren.level1', ")"], " ", ['span.comment', "# compute and return the new application state"], "\n",
        "\n",
        "\n",
        ['span.comment', "# -- query -------------------------------------------------------------------"], "\n",
        "\n",
        ['span.reserved', "rf.regSub"], ['span.paren.level1', "("], "\n",
        " ", ['span.keyword', "'time'"], ",\n",
        " ", ['span.paren.level2', "("], "db, _", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], "    ", ['span.comment', "# db is current app state. 2nd unused param is query array"], "\n",
        "   db.time", ['span.paren.level1', ")"], "    ", ['span.comment', "# return a query computation over the application state"], "\n",
        "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'timeColor'"], ", ", ['span.paren.level1', "("], "db", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], " db.timeColor\n",
        "\n",
        ['span.reserved', "rf.regSub"], " ", ['span.keyword', "'time-show'"], ", ", ['span.keyword', "'<-'"], ", ", ['span.paren.level1', "["], ['span.keyword', "'time'"], ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], "it", ['span.paren.level1', ")"], " ", ['span.reserved', "->"], "\n",
        "  it.toTimeString", ['span.paren.level1', "("], ['span.paren.level1', ")"], ".split", ['span.paren.level1', "("], ['span.string', "\" \""], ['span.paren.level1', ")"], ['span.paren.level1', "["], "0", ['span.paren.level1', "]"], "\n",
        "\n",
        "\n",
        ['span.comment', "# -- view functions ----------------------------------------------------------"], "\n",
        "\n",
        ['span.declaration', "clock"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div.example-clock'"], ", ", ['span.keyword', "style"], ": ", ['span.paren.level2', "{"], ['span.keyword', "color"], ": ", ['span.reserved', "rf.dsub"], " ", ['span.paren.level3', "["], ['span.keyword', "'timeColor'"], ['span.paren.level3', "]"], ['span.paren.level2', "}"], "\n",
        "    ", ['span.reserved', "rf.dsub"], " ", ['span.paren.level2', "["], ['span.keyword', "'time-show'"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "\n",
        ['span.declaration', "colorInput"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div.color-input'"], "\n",
        "    ", ['span.string', "\"Time color: \""], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'input'"], ", ", ['span.paren.level3', "{"], ['span.keyword', "type"], ":    ", ['span.keyword', "'text'"], ",\\\n",
        "               ", ['span.keyword', "value"], ":   ", ['span.paren.level1', "("], ['span.reserved', "rf.dsub"], " ", ['span.paren.level2', "["], ['span.keyword', "'timeColor'"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], ",\\\n",
        "               ", ['span.keyword', "oninput"], ": ", ['span.paren.level1', "("], ['span.paren.level2', "("], "e", ['span.paren.level2', ")"], " ", ['span.reserved', "->"], " ", ['span.reserved', "rf.dispatch"], " ", ['span.paren.level2', "["], ['span.keyword', "'time-color-change'"], ", e.target.value", ['span.paren.level2', "]"], ['span.paren.level1', ")"], ['span.paren.level3', "}"], ['span.paren.level2', "]"], ['span.paren.level1', "]"], "  ", ['span.comment', "# <---"], "\n",
        "\n",
        ['span.declaration', "ui"], " ", ['span.reserved', "="], " ", ['span.reserved', "->"], "\n",
        "  ", ['span.paren.level1', "["], ['span.keyword', "'div'"], "\n",
        "    ", ['span.paren.level2', "["], ['span.keyword', "'h1'"], ", ", ['span.string', "\"Hello world, it is now\""], ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], "clock", ['span.paren.level2', "]"], "\n",
        "    ", ['span.paren.level2', "["], "colorInput", ['span.paren.level2', "]"], ['span.paren.level1', "]"], "\n",
        "\n",
        "\n",
        ['span.comment', "# -- entry point -------------------------------------------------------------"], "\n",
        "\n",
        ['span.reserved', "rf.dispatchSync"], " ", ['span.paren.level1', "["], ['span.keyword', "'initialize'"], ['span.paren.level1', "]"], "                 ", ['span.comment', "# put a value into application state"], "\n",
        ['span.reserved', "r.render"], " ", ['span.paren.level1', "["], "ui", ['span.paren.level1', "]"], ", ", ['span.paren.level1', "("], ['span.reserved', "document.getElementById"], " ", ['span.keyword', "'app'"], ['span.paren.level1', ")"], " ", ['span.comment', "# mount the application's ui into '<div id=\"app\"/>'"]],
    wisp: (
`(ns example.demo
  (:require [wisp.runtime :refer [merge]]
            [wisp.sequence :refer [first nth]]
            [wisp.string :as s]
            [mreframe.reagent :as r]
            [mreframe.re-frame :as rf]))


;; -- event dispatch ----------------------------------------------------------

(defn dispatch-timer-event []
  (rf/dispatch [:timer (Date.)]))  ; <-- dispatch used

;; Call the dispatching function every second.
(set-interval! dispatch-timer-event 1000)  ; do-timer


;; -- event handlers ----------------------------------------------------------

(rf/reg-event-db            ; sets up initial application state
 :initialize                ; usage:  (rf/dispatch [:initialize])
 (fn []                     ; the two parameters are not important here, so omitting them
   {:time      (Date.),     ; What it returns becomes the new application state
    :timeColor "#f88"}))    ; so the application state will initially be a dict with two keys


(rf/reg-event-db                ; usage:  (rf/dispatch [:time-color-change 34562])
 :time-color-change             ; dispatched when the user enters a new colour into the UI text field
 (fn [db [_ new-color-value]]   ; DB event handlers given 2 parameters: application state and event (a vector)
   (merge db {:timeColor new-color-value})))   ; compute and return the new application state


(rf/reg-event-db                 ; usage:  (rf/dispatch [:timer a-js-Date])
 :timer                          ; every second an event of this kind will be dispatched
 (fn [db [_ new-time]]           ; note how the 2nd parameter is destructured to obtain the data value
   (merge db {:time new-time}))) ; compute and return the new application state


;; -- query -------------------------------------------------------------------

(rf/reg-sub
 :time
 (fn [db _]        ; db is current app state. 2nd unused param is query array
   (:time db)))    ; return a query computation over the application state

(rf/reg-sub :timeColor #(:timeColor %))

(rf/reg-sub :time-show :<- [:time]
  #(-> % .to-time-string (s/split " ") first))


;; -- view functions ----------------------------------------------------------

(defn clock []
  [:div.example-clock {:style {:color (rf/dsub [:timeColor])}}
    (rf.dsub [:time-show])])

(defn color-input []
  [:div.color-input
    "Time color: "
    [:input {:type    :text
             :value   (rf/dsub [:timeColor])
             :oninput #(rf/dispatch [:time-color-change (-> % :target :value)])}]])  ; <---

(defn ui []
  [:div
    [:h1 "Hello world, it is now"]
    [clock]
    [color-input]])


;; -- entry point -------------------------------------------------------------

(rf/dispatch-sync [:initialize])                  ; put a value into application state
(r/render [ui] (document.get-element-by-id :app)) ; mount the application's ui into '<div id="app"/>'`
    ),
    wisp_:
      ['<>',
        ['span.paren.level1', "("], ['span.reserved', "ns"], " ", ['span.declaration', "example.demo"], "\n",
        "  ", ['span.paren.level2', "("], ['span.keyword', ":require"], " ", ['span.paren.level3', "["], "wisp.runtime ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "merge"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "wisp.sequence ", ['span.keyword', ":refer"], " ", ['span.paren.level1', "["], ['span.reserved', "first"], " ", ['span.reserved', "nth"], ['span.paren.level1', "]"], ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "wisp.string ", ['span.keyword', ":as"], " s", ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.reagent ", ['span.keyword', ":as"], " r", ['span.paren.level3', "]"], "\n",
        "            ", ['span.paren.level3', "["], "mreframe.re-frame ", ['span.keyword', ":as"], " rf", ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; -- event dispatch ----------------------------------------------------------"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "dispatch-timer-event"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "("], ['span.reserved', "rf/dispatch"], " ", ['span.paren.level3', "["], ['span.keyword', ":timer"], " ", ['span.paren.level1', "("], ['span.reserved', "Date."], ['span.paren.level1', ")"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "  ", ['span.comment', "; <-- dispatch used"], "\n",
        "\n",
        ['span.comment', ";; Call the dispatching function every second."], "\n",
        ['span.paren.level1', "("], ['span.reserved', "set-interval!"], " dispatch-timer-event 1000", ['span.paren.level1', ")"], "  ", ['span.comment', "; do-timer"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; -- event handlers ----------------------------------------------------------"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], "            ", ['span.comment', "; sets up initial application state"], "\n",
        " ", ['span.keyword', ":initialize"], "                ", ['span.comment', "; usage:  (rf/dispatch [:initialize])"], "\n",
        " ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], ['span.paren.level3', "]"], "                     ", ['span.comment', "; the two parameters are not important here, so omitting them"], "\n",
        "   ", ['span.paren.level3', "{"], ['span.keyword', ":time"], "      ", ['span.paren.level1', "("], ['span.reserved', "Date."], ['span.paren.level1', ")"], ",     ", ['span.comment', "; What it returns becomes the new application state"], "\n",
        "    ", ['span.keyword', ":timeColor"], " ", ['span.string', "\"#f88\""], ['span.paren.level3', "}"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "    ", ['span.comment', "; so the application state will initially be a dict with two keys"], "\n",
        "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], "                ", ['span.comment', "; usage:  (rf/dispatch [:time-color-change 34562])"], "\n",
        " ", ['span.keyword', ":time-color-change"], "             ", ['span.comment', "; dispatched when the user enters a new colour into the UI text field"], "\n",
        " ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "_ new-color-value", ['span.paren.level1', "]"], ['span.paren.level3', "]"], "   ", ['span.comment', "; DB event handlers given 2 parameters: application state and event (a vector)"], "\n",
        "   ", ['span.paren.level3', "("], ['span.reserved', "merge"], " db ", ['span.paren.level1', "{"], ['span.keyword', ":timeColor"], " new-color-value", ['span.paren.level1', "}"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "   ", ['span.comment', "; compute and return the new application state"], "\n",
        "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-event-db"], "                 ", ['span.comment', "; usage:  (rf/dispatch [:timer a-js-Date])"], "\n",
        " ", ['span.keyword', ":timer"], "                          ", ['span.comment', "; every second an event of this kind will be dispatched"], "\n",
        " ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db ", ['span.paren.level1', "["], "_ new-time", ['span.paren.level1', "]"], ['span.paren.level3', "]"], "           ", ['span.comment', "; note how the 2nd parameter is destructured to obtain the data value"], "\n",
        "   ", ['span.paren.level3', "("], ['span.reserved', "merge"], " db ", ['span.paren.level1', "{"], ['span.keyword', ":time"], " new-time", ['span.paren.level1', "}"], ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], " ", ['span.comment', "; compute and return the new application state"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; -- query -------------------------------------------------------------------"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], "\n",
        " ", ['span.keyword', ":time"], "\n",
        " ", ['span.paren.level2', "("], ['span.reserved', "fn"], " ", ['span.paren.level3', "["], "db _", ['span.paren.level3', "]"], "        ", ['span.comment', "; db is current app state. 2nd unused param is query array"], "\n",
        "   ", ['span.paren.level3', "("], ['span.keyword', ":time"], " db", ['span.paren.level3', ")"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "    ", ['span.comment', "; return a query computation over the application state"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":timeColor"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.keyword', ":timeColor"], " ", ['span.reserved', "%"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/reg-sub"], " ", ['span.keyword', ":time-show"], " ", ['span.keyword', ":<-"], " ", ['span.paren.level2', "["], ['span.keyword', ":time"], ['span.paren.level2', "]"], "\n",
        "  ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.reserved', "->"], " ", ['span.reserved', "%"], " .to-time-string ", ['span.paren.level3', "("], ['span.reserved', "s/split"], " ", ['span.string', "\" \""], ['span.paren.level3', ")"], " ", ['span.reserved', "first"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; -- view functions ----------------------------------------------------------"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "clock"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":div.example-clock"], " ", ['span.paren.level3', "{"], ['span.keyword', ":style"], " ", ['span.paren.level1', "{"], ['span.keyword', ":color"], " ", ['span.paren.level2', "("], ['span.reserved', "rf/dsub"], " ", ['span.paren.level3', "["], ['span.keyword', ":timeColor"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "}"], "\n",
        "    ", ['span.paren.level3', "("], "rf.dsub ", ['span.paren.level1', "["], ['span.keyword', ":time-show"], ['span.paren.level1', "]"], ['span.paren.level3', ")"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "color-input"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":div.color-input"], "\n",
        "    ", ['span.string', "\"Time color: \""], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":input"], " ", ['span.paren.level1', "{"], ['span.keyword', ":type"], "    ", ['span.keyword', ":text"], "\n",
        "             ", ['span.keyword', ":value"], "   ", ['span.paren.level2', "("], ['span.reserved', "rf/dsub"], " ", ['span.paren.level3', "["], ['span.keyword', ":timeColor"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], "\n",
        "             ", ['span.keyword', ":oninput"], " ", ['span.reserved', "#"], ['span.paren.level2', "("], ['span.reserved', "rf/dispatch"], " ", ['span.paren.level3', "["], ['span.keyword', ":time-color-change"], " ", ['span.paren.level1', "("], ['span.reserved', "->"], " ", ['span.reserved', "%"], " ", ['span.keyword', ":target"], " ", ['span.keyword', ":value"], ['span.paren.level1', ")"], ['span.paren.level3', "]"], ['span.paren.level2', ")"], ['span.paren.level1', "}"], ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "  ", ['span.comment', "; <---"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "defn"], " ", ['span.declaration', "ui"], " ", ['span.paren.level2', "["], ['span.paren.level2', "]"], "\n",
        "  ", ['span.paren.level2', "["], ['span.keyword', ":div"], "\n",
        "    ", ['span.paren.level3', "["], ['span.keyword', ":h1"], " ", ['span.string', "\"Hello world, it is now\""], ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "["], "clock", ['span.paren.level3', "]"], "\n",
        "    ", ['span.paren.level3', "["], "color-input", ['span.paren.level3', "]"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "\n",
        "\n",
        "\n",
        ['span.comment', ";; -- entry point -------------------------------------------------------------"], "\n",
        "\n",
        ['span.paren.level1', "("], ['span.reserved', "rf/dispatch-sync"], " ", ['span.paren.level2', "["], ['span.keyword', ":initialize"], ['span.paren.level2', "]"], ['span.paren.level1', ")"], "                  ", ['span.comment', "; put a value into application state"], "\n",
        ['span.paren.level1', "("], ['span.reserved', "r/render"], " ", ['span.paren.level2', "["], "ui", ['span.paren.level2', "]"], " ", ['span.paren.level2', "("], "document.get-element-by-id ", ['span.keyword', ":app"], ['span.paren.level2', ")"], ['span.paren.level1', ")"], " ", ['span.comment', "; mount the application's ui into '<div id=\"app\"/>'"]],
  },
};}
