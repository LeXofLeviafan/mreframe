[fs, {spawnSync}, {html, markdown, parseJs, parseCoffee, parseWisp, parseHtml}] = ['fs', 'child_process', './prerender'].map require

KEYS = ['reagent', 're-frame']

EXPORTS =

  reagent:
    simpleComponent:   {}
    simpleParent:      {deps: ['simpleComponent']}
    sayHello:          {}
    listerUser:        {}
    countingComponent: {}
    timerComponent:    {}
    sharedState:       {}
    _render:           {}
    bmiComponent:      {}
    simpleExample:     {}
    todoApp:           {className: 'todo-app'}

  're-frame':
    _regEventDb:       {}
    _regSub:           {}
    _regSub2:          {}
    _regEventFx:       {}
    _regFx:            {}
    _regCofx:          {}
    _toInterceptor:    {}
    _interceptors:     {}
    demo:              {className: 'demo'}

PREFIX = """
  /* THIS IS A GENERATED SCRIPT */
  if (typeof window !== 'undefined')
    var exports = window;

  {let _nodeEscape = (typeof window !== 'undefined' ? (s => s) : (s => s.replace(/set(Timeout|Interval)/g, s => "//"+s)));
  exports.EXAMPLES = """


_showKeyword = (s) -> "'" + (s.replace /[']/g, "\\'") + "'"
_showString = (s) -> JSON.stringify s
_showText = (s) -> "`#{s.replace /\\/g, "\\\\"}`"
_showForm = (it) -> if typeof it is 'string' then _showString(it) else "[#{_showKeyword it[0]}, #{_showString it[1]}]"
_showForms = (xss, indent) -> if xss
  ["['<>',\n"
   ...(xss.map (xs) -> indent + (xs.map _showForm).join ", ").join ",\n"
   "]"].join ""

_format = (v, k) -> switch
  when k is 'eval'            then " Function(_nodeEscape(\n#{_showText v}\n    ))"
  when k is 'deps'            then " [#{v.map(_showKeyword).join ", "}]"
  when typeof v isnt 'string' then "\n      " + (_showForms v, "        ")
  when v.includes "\n"        then " (\n#{_showText v}\n    )"
  else " " + (_showKeyword v)



for key in KEYS
  withHtml = key is 'reagent'
  console.log "#{key}.examples.js"

  _component = (name, ...deps) => if (fn = EXPORTS[key][name].eval?.replace /set(Timeout|Interval)/g, (s) -> "//"+s)
    _component[name] = _component[name] or
      Function(fn).call mreframe: (require '..'), lodash: (require 'lodash'), examples: Object.fromEntries deps.map (it) -> [it, _component it]

  for name, o of EXPORTS[key]
    console.log "\t#{name}"
    _o = {}
    for lang in ['js', 'coffee', 'wisp']
      _o[lang] = (fs.readFileSync "tutorial/#{key}/#{name}.#{lang}", 'utf-8').trim()
    o.className = o.className or 'simple'
    o.eval = ("let require = path => path.split('/').reduce((x, k) => x[k], this);\n\n" +
              _o.js.replace(/^\/\/prelude: /g, "").replace(/(\nr\.render\(\[(.*)\], .*)?$/, (s, _, comp) -> "\nreturn #{comp or name};"))
    if withHtml or not name.startsWith "_"
      o.html = html _component name, ...o.deps or []
      o.html_ = parseHtml o.html  if withHtml
    delete o.eval  if name.startsWith "_"
    for lang, s of _o
      o[lang] = s.replace(/^\/\/prelude: .*\n/g, "").replace(/^$/g, " ")
      o["#{lang}_"] = switch lang
        when 'js'     then parseJs     o[lang]
        when 'coffee' then parseCoffee o[lang]
        when 'wisp'   then parseWisp   o[lang]

  output = PREFIX + "{\n" + (
    for name, o of EXPORTS[key]
      ["  #{name}: {"
       ...("    #{k}:#{_format v, k}," for k, v of o)
       "  },"].join "\n"
  ).join("\n") + "\n};}\n"

  fs.writeFileSync "tutorial/#{key}.examples.js", output
  console.log "#{key}.html"
  spawnSync 'node', ["tutorial/#{key}"], stdio: 'inherit'
  console.log "#{key}.md\n"
  fs.writeFileSync "#{key}.md", markdown (fs.readFileSync "#{key}.html", 'utf-8')
