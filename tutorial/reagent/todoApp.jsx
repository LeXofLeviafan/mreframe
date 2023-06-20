import r from 'mreframe/reagent';
import { deref, reset, swap } from 'mreframe/atom';
import { identity, dict, entries, vals, getIn,
         assoc, assocIn, dissoc, updateIn } from 'mreframe/util';
import { map, filter } from 'lodash';

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


let TodoInput = ({title, onsave, onstop}) => {
  let val = r.atom(title || "");
  let stop = () => {reset(val, "");   onstop && onstop()};
  let save = () => {let v = deref(val).trim();
                    v && onsave(v);
                    stop()};
  return ({id, className, placeholder}) => (
    <input type="text" value={deref(val)}
           id={id} className={className} placeholder={placeholder}
           onblur={save}
           oninput={e => reset(val, e.target.value)}
           onkeydown={e => (e.which === 13 ? save() :
                            e.which === 26 ? stop() :
                            null)}/>
  );
};

let TodoEdit = r.createClass({  // not quite equivalent to the original code
  componentDidMount: ({dom}) => dom.focus(),
  reagentRender:     params => <TodoInput>{params}</TodoInput>,
});

let TodoStats = ({filt, active, done}) => {
  let attrsFor = name => ({class: [(name == deref(filt)) && 'selected'],
                           onclick: () => reset(filt, name)});
  return (
    <div>
      <span id="todo-count">
        <strong>{active}</strong> {active == 1 ? "item" : "items"} left
      </span>
      <ul id="filters">
        <li><a {...attrsFor('all')}>All</a></li>
        <li><a {...attrsFor('active')}>Active</a></li>
        <li><a {...attrsFor('done')}>Completed</a></li>
      </ul>
      {(done > 0) &&
         <button id="clear-completed" onclick={clearDone}>
           Clear completed {done}
         </button>}
    </div>
  );
};

let TodoItem = () => {
  let editing = r.atom(false);
  return ({id, done, title}) => (
    <li class={{completed: done, editing: deref(editing)}}>
      <div class="view">
        <input class="toggle" type="checkbox" checked={done}
               onchange={() => toggle(id)}/>
        <label ondblclick={() => reset(editing, true)}>{title}</label>
        <button class="destroy" onclick={() => remove(id)}/>
      </div>
      {deref(editing) &&
         <TodoEdit>{{
           className: 'edit',  title,
           onsave: it => save(id, it),
           onstop: () => reset(editing, false),
         }}</TodoEdit>}
    </li>
  );
};

let TodoApp = () => {
  let filt = r.atom('all');
  return () => {
    let items = vals( deref(todos) );
    let done = items.filter(it => it.done).length;
    let active = items.length - done;
    return (
      <div>
        <section id="todoapp">
          <header id="header">
            <h1>todos</h1>
            <TodoInput>{{
              id:          'new-todo',
              placeholder: "What needs to be done?",
              onsave:      addTodo,
            }}</TodoInput>
          </header>
          {(items.length > 0) &&
             <div>
               <section id="main">
                 <input id="toggle-all" type="checkbox" checked={active === 0}
                        onchange={() => completeAll(active > 0)}/>
                 <label for="toggle-all">Mark all as complete</label>
                 <ul id="todo-list">
                   {items.filter(deref(filt) === 'active' ? (it => !it.done) :
                                 deref(filt) === 'done'   ? (it => it.done)  :
                                 identity).map(todo =>
                      <TodoItem key={todo.id}>{todo}</TodoItem>)}
                 </ul>
               </section>
               <footer id="footer">
                 <TodoStats>{{active, done, filt}}</TodoStats>
               </footer>
             </div>}
        </section>
        <footer id="info">
          <p>Double-click to edit a todo</p>
        </footer>
      </div>
    );
  };
};


// init
addTodo("Rename Cloact to Reagent");
addTodo("Add undo demo");
addTodo("Make all rendering async");
addTodo("Allow any arguments to component functions");
completeAll(true);

r.render(<TodoApp/>, document.getElementById('app'));
