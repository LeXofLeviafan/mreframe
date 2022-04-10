let rf = require('mreframe/re-frame');


// replaces db state with APP_DB
rf.regEventDb('init-db', (db, event) => APP_DB);

rf.dispatchSync(['init-db']);  // immediately evoke init-db{} (i.e. before r.render)


rf.regEventDb('set-view', (db, [_, view]) => ({...db, view}));

rf.dispatch(['set-view', 'main']);  // asynchronously evoke set-view{'main'}


rf.regEventDb('add-counter', (db, [_, n=1]) => ({...db, counter: db.counter+n}));

rf.disp(['add-counter', 5]);  // asynchronously evoke add-counter{5}
// rf.disp(evt, ...args) <=> evt && rf.dispatch([...evt, ...args])
