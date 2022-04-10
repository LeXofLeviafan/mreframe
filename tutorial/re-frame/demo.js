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
r.render([ui], document.getElementById('app')); // mount the application's ui into '<div id="app"/>'
