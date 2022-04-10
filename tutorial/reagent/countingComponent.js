let {reagent: r, atom: {deref, swap}} = require('mreframe');

var clickCount = r.atom(0);

let countingComponent = () =>
  ['div',
    "The atom ", ['code', "clickCount"], " has value: ",
    deref(clickCount), ". ",
    ['input', {type: 'button',  value: "Click me!",
               onclick: () => swap(clickCount, n => n + 1)}]];
