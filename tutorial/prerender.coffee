if typeof window is 'undefined'
  global.window = global.document = global.requestAnimationFrame = undefined

[fs, Lexer, domino, Turndown, render, m, reagent: r, util: {isArray, isDict}] =
  ['fs', 'tokenizr', 'domino', 'turndown', 'mithril-node-render', 'mithril', '..'].map require
r._init redraw: ((x) -> x)

_words = (s) -> s.split /[\n\s]+/g

NOT_REQUIRE = "(?=\\s*=(?!\\s*require\\b))"
SYMBOL  = "[_a-zA-Z][_a-zA-Z0-9]*"
KEYWORD = "'[^']+'|#{SYMBOL}(?=:)"
LIBRARY = _words "identity dict entries vals getIn merge assoc assocIn dissoc updateIn chain range map filter deref reset swap rf?\\.#{SYMBOL}"
RUNTIME = _words "setTimeout setInterval parseInt Date Number require fetch \\.(then|catch) (document|console|localStorage|Promise|JSON|Math)\\.#{SYMBOL}"
RESERVED_JS  = _words "var let const if then else switch case try catch return new true false"
OPERATORS_JS = _words "! && \\|\\| => === == = < > \\+ / \\* \\? : \\.\\.\\."
RESERVED_COFFEE  = _words "if then else switch when try catch new not and or true false yes no on off is isnt"
OPERATORS_COFFEE = _words "=> -> = < > \\+ / \\* \\.\\.\\."
SYMBOL_WISP    = "[^\\s(\\[{}\\])\"]+"
KEYWORD_WISP   = ":#{SYMBOL_WISP}"
LIBRARY_WISP   = _words "identity inc int into dictionary\\?? vec nth drop lazy-seq first rest cons range count empty\\? vals map filter assoc dissoc merge #{SYMBOL_WISP}/#{SYMBOL_WISP}"
RUNTIME_WISP   = _words "set-timeout! set-interval! parse-int Date\\. Number fetch then document\\.body"
MREFRAME_WISP  = _words "get-in assoc-in update-in deref reset! swap!"
RESERVED_WISP  = _words "ns defn def fn let cond case try catch for get str not or do if if-not when true false & % %1 %2 %3 ->> -> > < = / \\* \\+ \\.\\."
OPERATORS_WISP = _words "@ #"
SYMBOL_HTML    = "[^\\s</>=&\"]+"
KEYWORD_HTML   = "#{SYMBOL}(?==)"
RESERVED_HTML  = _words "div section header footer ul li h1 h3 p label input button code strong span"
OPERATORS_HTML = _words "</ < = /> >"

WIDTH = 90
BLOCK = ['div', 'ul', 'section', 'header']
PARAGRAPH = ['p', 'h1', 'h3', 'li', 'label']


_convert = (f) -> (component, indent) ->
  isArray(component) and f (if isArray component then component else [component]), indent

_tag = (tag) -> tag.replace(/(#|\.).*/, "")
_block = (component, indent) -> isBlock(component, indent) or isParagraph(component, indent)
multiline = _convert ([tag, ...children], indent) -> children.some (it) -> _block(it, indent+"  ")

isParagraph = _convert ([tag, attrs]) -> _tag(tag) in PARAGRAPH or attrs?.style?.width is "100%"

isBlock = _convert ([tag, ...children], indent) -> _tag(tag) in BLOCK or
  multiline([tag, ...children], indent) or
  render.sync(r.asElement [tag, ...children]).length + indent.length > WIDTH

_html = (component, indent="") ->
  return component  unless isArray component
  indent_ = indent + "  "
  [tag, ...args] = if isArray component then component else [component]
  return component  unless isBlock component, indent_
  inline = not multiline component, indent_
  [attrs, ...children] = if isDict args[0] then args else [{}, ...args]
  children_ = children.map((it, i) -> [it, children[i+1]]).flatMap ([it, next]) ->
    [it, (next or no) and (_block(it, indent_) or _block(next, indent_)) and "\n#{indent_}"]
  [tag, attrs, "\n#{indent_}", ...children_.map((it) -> _html it, indent_), "\n#{indent}"]

_expand = (component) -> switch
  when typeof component is 'function' then _expand component()
  when not isArray component          then component
  else
    [tag, ...args] = component
    tag = tag ...args     while typeof tag is 'function'
    [tag, ...args] = tag  if isArray tag
    if typeof tag is 'function' then _expand( tag(...args) ) else [tag, ...args.map(_expand)]

exports.html = (component) -> render.sync (r.asElement _html _expand component), strict: yes
exports.markdown = do (parser = new Turndown headingStyle: 'atx', codeBlockStyle: 'fenced') ->
  parser.remove ['nav', 'title']
  parser.addRule 'strikethrough', filter: 'del', replacement: (content) -> "~~#{content}~~"
  parser.addRule 'heading',
    filter: ((node) -> node.className.match /(example|source)-heading/)
    replacement: -> ""
  _escape = (s) -> s.replace(/&/, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  _examples = (node) -> if node.nodeName is 'DIV' and node.className.match /example/ then [node] else
    Array.from(node.childNodes).flatMap _examples
  _source = (it) -> it = it.nextSibling while it and it.nodeName isnt 'PRE';   it
  (html) ->
    _root = domino.createDocument html
    for _node in _examples _root
      _node.innerHTML = """<pre><code class="language-html">#{_escape _node.innerHTML}</code></pre>"""
      _node.parentNode.insertBefore it, _node  if (it = _source _node)
    (parser.turndown _root.outerHTML).trim() + "\n"


_parser = ({symbol, keyword, reserved, operators, declaration, comment}) -> (input) ->
  lexer = new Lexer

  [_level, _text] = [0, ""]
  lexer.before (ctx, match, rule) ->
    if _text and (rule.name isnt 'text' or _text.endsWith "\n")
      ctx.accept 'text', _text
      _text = ""
    _level-- if "}])".includes match[0]
  lexer.after (ctx, match, rule) ->
    _level++ if "([{".includes match[0]
  lexer.finish (ctx) -> _text and ctx.accept 'text', _text

  if comment
    lexer.rule RegExp(comment), (ctx) -> ctx.accept 'comment'
  lexer.rule /\"([^"]*)\"/, (ctx) -> ctx.accept 'string'
  lexer.rule RegExp(keyword), (ctx) -> ctx.accept 'keyword'
  lexer.rule /[\[\](){}]/, (ctx) -> ctx.accept "paren.level#{_level % 3 + 1}"
  if reserved
    lexer.rule RegExp("(?<!#{symbol}|\\.)(#{reserved.join "|"})(?!#{symbol})"), (ctx, match) -> ctx.accept 'reserved'
  if operators
    lexer.rule RegExp("(#{operators.join "|"})"), (ctx, match) -> ctx.accept 'reserved'
  lexer.rule RegExp(declaration), (ctx) -> ctx.accept 'declaration'

  lexer.rule /[^]/, ((ctx, match) -> _text += match[0];  ctx.ignore()), 'text'

  lexer.input input
  lexer.tokens()
       .filter ({type}) -> type isnt 'EOF'
       .map ({type, value}) -> if type is 'text' then value else ['span.'+type, value]
       .reduce ((res, it) ->
         res[res.length - 1].push it
         res.push []  if typeof it is 'string' and it.endsWith "\n"
         res
       ), [[]]

exports.parseJs = _parser
  symbol:      SYMBOL
  keyword:     KEYWORD
  reserved:    [].concat LIBRARY, RUNTIME, RESERVED_JS
  operators:   OPERATORS_JS
  declaration: "(?<=(^|\n)(var|let|const)\\s+)#{SYMBOL}#{NOT_REQUIRE}"
  comment:     "//.*"

exports.parseCoffee = _parser
  symbol:      SYMBOL
  keyword:     KEYWORD
  reserved:    [].concat LIBRARY, RUNTIME, RESERVED_COFFEE
  operators:   OPERATORS_COFFEE
  declaration: "(?<=(^|\n))#{SYMBOL}#{NOT_REQUIRE}"
  comment:     "#.*"

exports.parseWisp = _parser
  symbol:      SYMBOL_WISP
  keyword:     KEYWORD_WISP
  reserved:    [].concat MREFRAME_WISP, LIBRARY_WISP, RUNTIME_WISP, RESERVED_WISP
  operators:   OPERATORS_WISP
  declaration: "(?<=(ns|defn?)\\s+)#{SYMBOL_WISP}"
  comment:     ";.*"

exports.parseHtml = _parser
  symbol:      SYMBOL_HTML
  keyword:     KEYWORD_HTML
#  reserved:    RESERVED_HTML
  operators:   OPERATORS_HTML
  declaration: "(?<=</?)#{SYMBOL_HTML}"
  comment:     "<!--[^]*-->"
