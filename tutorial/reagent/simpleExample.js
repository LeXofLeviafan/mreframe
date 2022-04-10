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
