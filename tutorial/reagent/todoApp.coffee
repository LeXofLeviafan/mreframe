{reagent: r, atom: {deref, reset, swap},
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
    ['input', {type: 'text',  value: (deref val),\
               id,  className,  placeholder,\
               onblur: save,\
               oninput:   ((e) -> reset val, e.target.value),\
               onkeydown: ((e) -> switch e.which
                 when 13 then save()
                 when 26 then stop())}];

todoEdit = r.createClass  # not quite equivalent to the original code
  componentDidMount: ({dom}) -> dom.focus()
  reagentRender:     (params) -> [todoInput, params]

todoStats = ({filt, active, done}) ->
  attrsFor = (name) -> {class: [(name is deref filt) and 'selected'],\
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
        ['input.toggle', {type: 'checkbox',  checked: done,\
                          onchange: (-> toggle id)}]
        ['label', {ondblclick: (-> reset editing, on)}, title]
        ['button.destroy', onclick: (-> remove id)]]
      (deref editing) and
        [todoEdit, {className: 'edit',  title,\
                    onsave: ((it) -> save id, it),\
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
          [todoInput, {id:          'new-todo',\
                       placeholder: "What needs to be done?",\
                       onsave:      addTodo}]]
        items.length > 0 and
          ['div'
            ['section#main'
              ['input#toggle-all', {type: 'checkbox', checked: active is 0,\
                                    onchange: -> completeAll (active > 0)}]
              ['label', {for: 'toggle-all'}, "Mark all as complete"]
              ['ul#todo-list'
                ...items.filter(
                  if (deref filt) is 'active' then ((it) -> not it.done) else \
                  if (deref filt) is 'done'   then ((it) -> it.done)     else \
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

r.render [todoApp], (document.getElementById 'app')
