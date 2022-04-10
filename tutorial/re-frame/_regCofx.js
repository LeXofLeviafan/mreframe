let {reFrame: rf, util: {assoc, merge}} = require('mreframe');


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
  ({db: merge(db, {state})}));
