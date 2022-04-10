rf = require 'mreframe/re-frame'


rf.regSub 'view', (db, sub) -> db.view

rf.subscribe ['view'] # => RCursor returning current db.view value


rf.regSub 'item', (db, [_, key]) -> db.dict[key]

rf.dsub ['item', 'foo'] # db.dict['foo']
# rf.dsub sub <=> deref rf.subscribe sub
