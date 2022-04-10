{reFrame: rf, util: {merge, assoc, assocIn}} = require 'mreframe'


# rf.path works on specified subpath of db (similarly to using assocIn)
rf.regEventDb 'set-foo', [rf.path 'foo'], (db, [_, foo]) -> foo


# rf.unwrap and rf.trimV simplify event data passed into handler
rf.regEventDb 'set', [rf.trimV], (db, [key, value]) -> assoc db, key, value
rf.regEventDb 'set-foo', [rf.unwrap], (db, foo) -> merge db, {foo}


# rf.enrich and rf.after do post-processing of db after the event
ensureNumber = rf.enrich (db, [_, key]) ->
  assoc db, key, ((Number db[key]) or 0)         # db is updated
saveState = rf.after (db, event) ->
  localStorage.setItem 'db', (JSON.stringify db) # side-effect

# after setting the value, it's converted to a number, then db is saved
rf.regEventDb 'set-number', [saveState, ensureNumber], (db, [_, key, value]) ->
  assoc db, key, value


# rf.onChanges is similar to rf.enrich but recalculates conditionally
calcTotal = rf.onChanges ((n1, n2, n3) -> n1 + n2 + n3),
                         ['outputs', 'total'],
                         ['inputs', 1], ['inputs', 2], ['inputs', 3]

# if any of the three inputs is changed, db.outputs.total is recalculated
rf.regEventDb 'set-input', [calcTotal], (db, [_, key, value]) ->
  assocIn db, ['inputs', key], value
