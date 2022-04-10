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

r.render([todoApp], document.getElementById('app'));
