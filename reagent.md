# ~~Reagent~~ `mreframe/reagent`: Minimalistic ~~React~~ Mithril for ~~ClojureScript~~ JavaScript

**Note: This is a repurposed copy of the [original tutorial for Reagent (a React/ClojureScript library)](https://reagent-project.github.io)**

## Introduction to Reagent

[`mreframe/reagent`](https://github.com/LeXofLeviafan/mreframe/blob/main/docs/reagent.md) provides a minimalistic interface for [Mithril](https://mithril.js.org). It allows you to define efficient React components using nothing but plain JavaScript functions and data, that describe your UI using a [Hiccup](https://github.com/weavejester/hiccup)\-like syntax.

The goal of Reagent is to make it possible to define arbitrarily complex UIs using just a couple of basic concepts, and to be fast enough by default that you rarely have to think about performance.

A very basic Reagent component may look something like this:

```js
let simpleComponent = () =>
  ['div',
    ['p', "I am a component!"],
    ['p.someclass',
      "I have ", ['strong', "bold"],
      ['span', {style: {color: 'red'}}, " and red "], "text."]];
```

```html
<div>
  <p>I am a component!</p>
  <p class="someclass">
    I have <strong>bold</strong><span style="color:red"> and red </span>text.
  </p>
</div>
```

You can build new components using other components as building blocks. Like this:

```js
let simpleParent = () =>
  ['div',
    ['p', "I include simpleComponent."],
    [simpleComponent]];
```

```html
<div>
  <p>I include simpleComponent.</p>
  <div>
    <p>I am a component!</p>
    <p class="someclass">
      I have <strong>bold</strong><span style="color:red"> and red </span>text.
    </p>
  </div>
</div>
```

Data is passed to child components using plain old JS data types. Like this:

```js
let helloComponent = (name) =>
  ['p', "Hello, ", name, "!"];

let sayHello = () =>
  [helloComponent, "world"];
```

```html
<p>Hello, world!</p>
```

**Note:** In the example above, `helloComponent` might just as well have been called as a normal JS function instead of as a Reagent component. The only difference would have been performance, since ”real” Reagent components are only re-rendered when their data have changed. More advanced components though (see below) must be called with square brackets.

Here is another example that shows items in a list:

```js
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
```

```html
<div>
  Here is a list:
  <ul>
    <li>Item 0</li>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

**Note:** The `r.with({key: item},` part above isn’t really necessary in this simple example, but attaching a unique key to every item in a dynamically generated list of components is good practice, and helps Mithril to improve performance for large lists. (Note: use it either for every list item, or for none.) The key can be given either (as in this example) as meta-data, or as a `key` value in the attributes of a tag. See Mithril [documentation](https://mithril.js.org/keys.html) for more info.

## Managing state in Reagent

The easiest way to manage state in Reagent is to use Reagent’s own version of [`atom`](https://github.com/LeXofLeviafan/mreframe/blob/main/docs/atom.md). It works exactly like the basic one, except that it schedules a redraw every time it is changed. Any component that uses a `r.atom` is automagically re-rendered when its value changes.

Let’s demonstrate that with a simple example:

```js
let {reagent: r, atom: {deref, swap}} = require('mreframe');

var clickCount = r.atom(0);

let countingComponent = () =>
  ['div',
    "The atom ", ['code', "clickCount"], " has value: ",
    deref(clickCount), ". ",
    ['input', {type: 'button',  value: "Click me!",
               onclick: () => swap(clickCount, n => n + 1)}]];
```

```html
<div>
  The atom <code>clickCount</code> has value: 0. <input type="button" value="Click me!">
</div>
```

Sometimes you may want to maintain state locally in a component. That is easy to do with a `r.atom` as well.

Here is an example of that, where we call `setTimeout` every time the component is rendered to update a counter:

```js
let {reagent: r, atom: {deref, swap}} = require('mreframe');

let timerComponent = () => {
  let secondsElapsed = r.atom(0);
  return () => {
    setTimeout(() => swap(secondsElapsed, n => n + 1), 1000);
    return ['div', "Seconds Elapsed: ", deref(secondsElapsed)];
  };
};
```

```html
<div>
  Seconds Elapsed: 0
</div>
```

The previous example also uses another feature of Reagent: a component function can return another function, that is used to do the actual rendering. This function is called with the same arguments as the first one.

This allows you to perform some setup of newly created components without resorting to Mithril lifecycle events.

By simply passing a `r.atom` around you can share state management between components, like this:

```js
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
```

```html
<div>
  <p>The value is now: foo</p>
  <p>Change it here: <input type="text" value="foo"></p>
</div>
```

## Essential API

Reagent supports most of Mithril API, but there is really only one entry-point that is necessary for most applications: `r.render`.

It takes two arguments: a component, and a DOM node. For example, splashing the very first example all over the page would look like this:

```js
let r = require('mreframe/reagent');

let simpleComponent = () =>
  ['div',
    ['p', "I am a component!"],
    ['p.someclass',
      "I have ", ['strong', "bold"],
      ['span', {style: {color: 'red'}}, " and red "], "text."]];

r.render([simpleComponent], document.body);
```

## Putting it all together

Here is a slightly less contrived example: a simple BMI calculator.

Data is kept in a single `r.atom`: a dict with height, weight and BMI as keys.

```js
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
```

```html
<div>
  <h3>BMI calculator</h3>
  <div>
    Height: 180cm
    <input type="range" min="100" max="220" value="180" style="width:100%">
  </div>
  <div>
    Weight: 80kg
    <input type="range" min="30" max="150" value="80" style="width:100%">
  </div>
  <div>
    BMI: 24 <span style="color:inherit">normal</span>
    <input type="range" min="10" max="50" value="24.691358024691358" style="width:100%">
  </div>
</div>
```

## Performance

Mithril itself is very fast, and so is Reagent. In fact, Reagent will be even faster than plain Mithril a lot of the time, as it automatically prevents rerendering of unchanged components (which are normally the majority).

Mounted components are only re-rendered when their parameters have changed. The change could come from a deref’ed `r.atom`, the arguments passed to the component or component `r.state`.

All of these are checked for changes with `identical` which is basically only a pointer comparison, so the overhead is very low. Dicts passed as arguments to components are compared the same way: they are considered equal if all their entries are identical.

All this means that you simply won’t have to care about performance most of the time. Just define your UI however you like – it will be fast enough.

There are a couple of situations that you might have to care about, though. If you give Reagent a big list of components to render, you might have to supply all of them with a unique `key` attribute to speed up rendering (see above). Also note that anonymous functions are not, in general, equal to each other even if they represent the same code and closure.

But again, in general you should just trust that Mithril and Reagent will be fast enough. This very page is composed of a single Reagent component with thousands of child components (every single parenthesis etc in the code examples is a separate vnode) and yet the page can be updated many times every second without taxing the browser the slightest.

Incidentally, this page also uses another Mithril trick: the entire page is pre-rendered using Node, and `mithril-node-renderer`. When it is loaded into the browser, Mithril automatically attaches event-handlers to the already present DOM tree.

**Note:** Comparing with Mithril perftests (which are mostly testing raw rendering speed), mreframe shows a relative slowdown in the direct performance (by up to 4 times); however, performance of tests involving re-rendering of unchanged components is improved by anywhere from a few to a few dozen times or so depending on the test, due to these components not being recalculated in the first place.

## Complete demo

```js
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

r.render([simpleExample], document.getElementById('app'));
```

```html
<div>
  <h1>Hello world, it is now</h1>
  <div style="color:#f34" class="example-clock">
    02:25:00
  </div>
  <div class="color-input">
    Time color: <input type="text" value="#f34">
  </div>
</div>
```

## Todomvc

The obligatory todo list looks roughly like this in Reagent (cheating a little bit by skipping routing and persistence):

```js
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
```

```html
<div>
  <section id="todoapp">
    <header id="header">
      <h1>todos</h1>
      <input type="text" value="" id="new-todo" placeholder="What needs to be done?">
    </header>
    <div>
      <section id="main">
        <input type="checkbox" checked="" id="toggle-all">
        <label for="toggle-all">Mark all as complete</label>
        <ul id="todo-list">
          <li class="completed">
            <div class="view">
              <input type="checkbox" checked="" class="toggle">
              <label>Rename Cloact to Reagent</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li class="completed">
            <div class="view">
              <input type="checkbox" checked="" class="toggle">
              <label>Add undo demo</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li class="completed">
            <div class="view">
              <input type="checkbox" checked="" class="toggle">
              <label>Make all rendering async</label>
              <button class="destroy"></button>
            </div>
          </li>
          <li class="completed">
            <div class="view">
              <input type="checkbox" checked="" class="toggle">
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
</div>
```
