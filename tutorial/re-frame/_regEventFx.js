let {reFrame: rf, util: {merge}} = require('mreframe');


// evokes reminder{message} after specified delay
rf.regEventFx('delayed-reminder', (cofx, [_, message, delayMsec]) =>
  ({dispatchLater: {dispatch: ['reminder', message],  ms: delayMsec}}));

// displays the reminder (adds to appDb) and unsets it after 5 sec
rf.regEventFx('reminder', ({db}, [_, reminder]) =>
  merge({db: merge(db, {reminder})},
        reminder &&
          {dispatchLater: {dispatch: ['reminder'],  ms: 5000}}));


// dispatches multiple events in the given order
rf.regEventFx('schedule-reminders', (cofx, [_, ...reminders]) =>
  ({fx: reminders.map(it => ['dispatch', ['reminder', it]])}));
