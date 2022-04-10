[o, {type, identity, keys, getIn, assoc, assocIn, merge, chain}, {deref}, r, rf] = ['ospec', '../src/util', '../src/atom', '../src/reagent', '../src/re-frame'].map require

mkContext = ({db = {foo: 1, bar: baz: 2}, event = ['do-stuff', answer: 42], cofx = {}, fx = {}, queue = [], stack = []} = {}) ->
  coeffects: {...cofx, db, event}
  effects:   fx
  queue:     queue
  stack:     stack
contextKeys = ['coeffects', 'effects', 'queue', 'stack']
interceptorKeys = ['id', 'before', 'after']
isContext = (x, additional=[]) -> o(keys x).deepEquals(contextKeys.concat additional)
isInterceptor = (x) -> o(keys x).deepEquals(interceptorKeys)
_interceptor = (x) -> merge {id: undefined, before: identity, after: identity}, x
_pathKey = 're-frame-path/db-store'

$db = -> deref rf.appDb
$noop = ->
  rf.regEventCtx 'noop', identity  # no effects dict is added (equivalent to FN handler returning nil value)
  -> rf.dispatchSync ['noop']
$dbUpdates = ->
  rf.regEventCtx 'reset-db', (context) -> rf.assocEffect context, 'db', {}
  rf.regEventCtx 'assoc-in', (context) ->
    [db, [_, path, value]] = (rf.getCoeffect context, k for k in ['db', 'event'])
    rf.assocEffect context, 'db', (assocIn db, path, value)
  {$resetDb: (-> rf.dispatchSync ['reset-db']), $assocIn: (path, value) -> rf.dispatchSync ['assoc-in', path, value]}
$dbg = (after, before=identity) -> rf.toInterceptor
  id:     'dbg'
  before: ((context) -> before context;  context)
  after:  ((context) -> after context;  context)

delay = (timeout) -> new Promise (resolve) -> setTimeout(resolve, timeout)
Timeout = type setTimeout -> # Number in browsers, but has a custom type in NodeJS
butlast = (xs) -> xs[..-2] # sic!

o.spec "mreframe/re-frame", ->

  _reset = -> rf._init {redraw: identity}

  o.before _reset
  o.afterEach _reset

  o "getCoeffect()", ->
    context = mkContext()
    o(rf.getCoeffect context).equals(context.coeffects)	"returns context coeffects on one argument"
    o(rf.getCoeffect context, 'db')
      .equals(context.coeffects.db)			"returns requested coeffect on two arguments"
    o(rf.getCoeffect context, 'foo').equals(undefined)	"returns undefined if requested coeffect is missing"
    o(rf.getCoeffect context, 'foo', 42).equals(42)	"returns third argument if requested coeffect is missing"
    context2 = mkContext fx: db: null
    o(rf.getEffect context2, 'db', 42).equals(null)	"null is considered an existing value"
    context3 = mkContext fx: db: undefined
    o(rf.getEffect context3, 'db', 42)
      .equals(undefined)				"undefined is considered an existing value"

  o "assocCoeffect()", ->
    context = mkContext()
    context2 = rf.assocCoeffect context, 'foo', 42
    isContext(context2)					"returns a context"
    o(context).deepEquals( mkContext() )		"doesn't modify original context"
    o(rf.getCoeffect context2, 'foo').equals(42)	"returned context contains requested coeffect"

  o "getEffect()", ->
    context = mkContext fx: db: {foo: 'bar'}
    o(rf.getEffect context).equals(context.effects)	"returns context effects on one argument"
    o(rf.getEffect context, 'db')
      .equals(context.effects.db)			"returns requested effect on two arguments"
    o(rf.getEffect context, 'foo').equals(undefined)	"returns undefined if requested effect is missing"
    o(rf.getEffect context, 'foo', 42).equals(42)	"returns third argument if requested effect is missing"
    context2 = mkContext fx: db: null
    o(rf.getEffect context2, 'db', 42).equals(null)	"null is considered an existing value"
    context3 = mkContext fx: db: undefined
    o(rf.getEffect context3, 'db', 42)
      .equals(undefined)				"undefined is considered an existing value"

  o "assocEffect()", ->
    fx = -> db: {foo: 'bar'}
    context = mkContext fx: fx()
    context2 = rf.assocEffect context, 'foo', 42
    isContext(context2)					"returns a context"
    o(context).deepEquals(mkContext fx: fx())		"doesn't modify original context"
    o(rf.getEffect context2, 'foo').equals(42)		"returned context contains requested effect"

  o "enqueue()", ->
    queue = -> ['foo', 'bar', 'baz']
    context = mkContext queue: queue()
    context2 = rf.enqueue context, ['answer', 42]
    isContext(context2)					"returns a context"
    o(context).deepEquals(mkContext queue: queue())	"doesn't modify original context"
    o(context2.queue)
      .deepEquals(queue().concat ['answer', 42])	"returned context contains updated queue"

  o "toInterceptor()", ->
    isInterceptor(rf.toInterceptor {})			"returns an interceptor"
    o( rf.toInterceptor() )
      .deepEquals( _interceptor() )			"returns empty interceptor on no argument"
    o(rf.toInterceptor id: 'foo')
      .deepEquals(_interceptor id: 'foo')		"passed id is set in returned interceptor"
    fn = -> 42
    o(rf.toInterceptor before: fn)
      .deepEquals(_interceptor before: fn)		"passed before value is set in returned interceptor"
    o(rf.toInterceptor after: fn)
      .deepEquals(_interceptor after: fn)		"passed after value is set in returned interceptor"
    o(rf.toInterceptor id: 'foo', before: fn, after: fn, answer: 42)
      .deepEquals(id: 'foo', before: fn, after: fn)	"only id, before & after are set"

  o "path()", ->
    k = _pathKey
    isInterceptor(rf.path 'foo')			"returns an interceptor"
    context = mkContext()
    db = rf.getCoeffect context, 'db'
    pathFoo = rf.path 'foo'
    o(pathFoo.id).equals('path')			"id is 'path'"
    context2 = pathFoo.before context
    isContext(context2, [k])				"before returns a context with '#{k}' key added"
    o(context).deepEquals( mkContext() )		"before doesn't modify original context"
    o(rf.getCoeffect context2, 'db').equals(db.foo)	"before returns a context with db replaced"
    o(type context2[k]).equals(Array)			"before sets a list in '#{k}'"
    o(context2[k].length).equals(1)			"before places a value in '#{k}' list"
    o(context2[k][0]).equals(db)			"before places a db backup in '#{k}' list"
    context2a = rf.assocEffect context2, 'db', answer: 42
    context2b = chain mkContext(), pathFoo.before, [rf.assocEffect, 'db', answer: 42]
    context3 = pathFoo.after context2a
    isContext(context3, [k])				"after returns a context"
    o(context2a).deepEquals(context2b)			"after doesn't modify original context"
    db2 = assoc db, 'foo', {answer: 42}
    o(rf.getEffect context3, 'db').deepEquals(db2)	"after returns a context with db restored"
    o(rf.getCoeffect context3, 'db').equals(db)		"after restores db coeffect from backup"
    o(context3[k].length).equals(0)			"after removes db backup from '#{k}' list"
    pathBar = rf.path 'bar'
    pathBaz = rf.path 'baz'
    context2 = chain context, pathBar.before, pathBaz.before
    isContext(context2, [k])				"chained before returns a context"
    o(rf.getCoeffect context2, 'db').equals(db.bar.baz)	"chained before returns a context with db replaced"
    o(context2[k].length).equals(2)			"chained before places one value in '#{k}' per interceptor"
    o(context2[k][0]).equals(db)			"1st '#{k}' value is the original db"
    o(context2[k][1]).equals(db.bar)			"2nd '#{k}' value is the db produced by 1st interceptor"
    context2a = rf.assocEffect context2, 'db', answer: 42
    db2 = assocIn db, ['bar', 'baz'], answer: 42
    context3 = pathBaz.after context2a
    isContext(context3, [k])				"1st after returns a context"
    o(rf.getEffect context3, 'db').deepEquals(db2.bar)	"1st after returns a context with db restored"
    o(rf.getCoeffect context3, 'db').equals(db.bar)	"1st after restores db coeffect from backup"
    o(context3[k].length).equals(1)			"1st after removes a db backup from '#{k}' list"
    o(context3[k][0]).equals(db)			"after removes db backup from the end of '#{k}' list"
    context3a = pathBar.after context3
    isContext(context3a, [k])				"2nd after returns a context"
    o(rf.getEffect context3a, 'db').deepEquals(db2)	"2nd after returns a context with db restored"
    o(rf.getCoeffect context3a, 'db').equals(db)	"2nd after restores db coeffect from backup"
    o(context3a[k].length).equals(0)			"2nd after removes db backup from '#{k}' list"
    for args, i in [['bar', 'baz'], [['bar', 'baz']], [['bar'], 'baz'], [['bar'], ['baz']]]
      do (i, pathBarBaz = rf.path ...args) ->
        context2 = pathBarBaz.before context
        isContext(context2, [k])			"[#{i}] deep before returns a context"
        o(rf.getCoeffect context2, 'db')
          .equals(db.bar.baz)				"[#{i}] deep before replaces context db"
        o(context2[k].length).equals(1)			"[#{i}] deep before places one value in '#{k}' list"
        o(context2[k][0]).equals(db)			"[#{i}] deep before places db backup in '#{k}'"
        context2a = rf.assocEffect context2, 'db', 42
        context3 = pathBarBaz.after context2a
        db2 = assocIn db, ['bar', 'baz'], 42
        isContext(context3, [k])			"[#{i}] deep after returns a context"
        o(rf.getEffect context3, 'db').deepEquals(db2)	"[#{i}] deep after returns a context with db restored"
        o(rf.getCoeffect context3, 'db').equals(db)	"[#{i}] deep after restores db coeffect from backup"
        o(context3[k].length).equals(0)			"[#{i}] deep after removes db backup from '#{k}' list"

  o "enrich()", ->
    fn = (db, event) -> assoc db, 'foo', event.concat db.bar
    syncFooBar = rf.enrich fn
    isInterceptor(syncFooBar)				"returns an interceptor"
    o(syncFooBar.id).equals('enrich')			"id is 'enrich'"
    o(syncFooBar.before).equals(identity)		"before is identity"
    context = mkContext()
    context2 = syncFooBar.after context
    db2 = fn (rf.getCoeffect context, 'db'), (rf.getCoeffect context, 'event')
    isContext(context2)					"after returns context"
    o(context).deepEquals( mkContext() )		"after doesn't modify original context"
    o(rf.getEffect context2, 'db').deepEquals(db2)	"after updates db coeffect according to passed function (if there's no db effect)"
    context = mkContext fx: db: {bar: 42}
    context2 = syncFooBar.after context
    db2 = fn (rf.getEffect context, 'db'), (rf.getCoeffect context, 'event')
    o(rf.getEffect context2, 'db').deepEquals(db2)	"after updates db effect according to passed function"

  for [k, f, id=k] in [['unwrap', (event) -> event[1]], ['trimV', ((event) -> event[1..]), 'trim-v']]
    do (k, f, id) -> o k, ->
      context = mkContext()
      event = rf.getCoeffect context, 'event'
      isInterceptor(rf[k])				"is an interceptor"
      o(rf[k].id).equals(id)				"id is '#{id}'"
      context2 = rf[k].before context
      isContext(context2)				"before returns a context"
      o(context).deepEquals( mkContext() )		"before doesn't modify original context"
      o(rf.getCoeffect context2, 'event')
        .deepEquals(f event)				"before replaces event coeffect"
      o(rf.getCoeffect context2, 'originalEvent')
        .equals(event)					"before places event backup to originalEvent coeffect"
      context3 = rf[k].after context2
      isContext(context3)				"after returns a context"
      o(context2).deepEquals(rf[k].before mkContext())	"after doesn't modify original context"
      o(rf.getCoeffect context3, 'event').equals(event)	"after restores event coeffect from backup"

  o "after()", ->
    log = o.spy()
    dbg = rf.after log
    isInterceptor(dbg)					"returns an interceptor"
    o(dbg.id).equals('after')				"id is 'after'"
    o(dbg.before).equals(identity)			"before is identity"
    context = mkContext()
    o(dbg.after context).equals(context)		"after returns original context"
    o(context).deepEquals( mkContext() )		"after doesn't modify original context"
    o(log.callCount).equals(1)				"after invokes passed function once"
    o(log.args.length).equals(2)			"after passes 2 arguments to passed function"
    o(log.args[0]).equals(rf.getCoeffect context, 'db')	"after passes db coeffect as 1st argument (if there's no db effect)"
    o(log.args[1])
      .equals(rf.getCoeffect context, 'event')		"after passes event coeffect as 2nd argument"
    context = mkContext fx: db: {foo: 'bar'}
    dbg.after context
    o(log.args[0]).equals(rf.getEffect context, 'db')	"after passes db effect as 1st argument"

  o "onChanges()", ->
    list = (...args) -> args
    foobar = rf.onChanges list, ['foobar'], ['foo'], ['bar', 'baz']
    isInterceptor(foobar)				"returns an interceptor"
    o(foobar.id).equals('on-changes')			"id is 'on-changes'"
    o(foobar.before).equals(identity)			"before is identity"
    context = mkContext()
    db = rf.getCoeffect context, 'db'
    o(foobar.after context).equals(context)		"after returns original context if there's no db effect"
    o(context).deepEquals( mkContext() )		"after doesn't modify original context"
    db2 = assoc db, 'baz', 42
    context2 = rf.assocEffect context, 'db', db2
    o(foobar.after context2).equals(context2)		"after returns original context if paths are unchanged"
    db2 = assoc db, 'foo', 12
    res = list 12, db2.bar.baz
    context2 = rf.assocEffect context, 'db', db2
    context3 = foobar.after context2
    isContext(context3)					"after returns context"
    db3 = rf.getEffect context3, 'db'
    o(db3).deepEquals(merge db2, foobar: res)		"after updates inPath in db effect from outPaths"
    db2 = assocIn db, ['bar', 'baz'], 42
    res = list db2.foo, 42
    context2 = rf.assocEffect context, 'db', db2
    context3 = foobar.after context2
    db3 = rf.getEffect context3, 'db'
    o(db3).deepEquals(merge db2, foobar: res)		"after updates inPath in db effect from outPaths"
    foobar2 = rf.onChanges list, ['foobar'], ['foo'], ['bar']
    context2 = rf.assocEffect context, 'db', (assoc db, 'baz', 42)
    o(foobar2.after context2).equals(context2)		"after returns original contexts if paths are unchanged"
    db2 = assoc db, 'bar', merge db.bar
    res = list db2.foo, db2.bar
    context2 = rf.assocEffect context, 'db', db2
    context3 = foobar2.after context2
    db3 = rf.getEffect context3, 'db'
    o(db3).deepEquals(merge db2, foobar: res)		"after compares paths by identity"

  o "regCofx() + injectCofx()", ->
    now = new Date
    cofx = (cofx, key='time') -> assoc cofx, key, now
    o(rf.regCofx 'now', cofx).equals(undefined)		"regCofx returns undefined"
    context = mkContext()
    for [k, x] in [['time', rf.injectCofx 'now'], ['date', (rf.injectCofx 'now', 'date')]]
      do (k, x) ->
        isInterceptor(x)				"[#{k}] injectCofx returns an interceptor"
        o(x.id).equals('now')				"[#{k}] id is the coeffect id"
        o(x.after).equals(identity)			"[#{k}] after is identity"
        context2 = x.before context
        isContext(context2)				"[#{k}] before returns a context"
        o(context).deepEquals( mkContext() )		"[#{k}] before doesn't modify original context"
        o(rf.getCoeffect context2, k).equals(now)	"[#{k}] before applies cofx function to the value"

  o "clearCofx()", ->
    now = new Date
    for k in ['time', 'date']
      do (k) -> rf.regCofx k, (cofx) -> assoc cofx, k, now
    x = rf.injectCofx 'time'
    y = rf.injectCofx 'date'
    o(rf.clearCofx 'time').equals(undefined)		"returns undefined"
    o(-> x.before mkContext()).throws(TypeError)	"the coeffect cannot be used anymore"
    isInterceptor(rf.injectCofx 'time')			"though existence of coeffects isn't checked upon injection"
    o(rf.clearCofx 'time').equals(undefined)		"returns undefined on nonexistent"
    o(rf.getCoeffect (y.before mkContext()), 'date')
      .equals(now)					"other coeffects aren't affected"
    o( rf.clearCofx() ).equals(undefined)		"returns undefined"
    o(-> y.before mkContext()).throws(TypeError)	"all coeffects were unregistered"

  o "dispatchSync() + db builtin effect", ->
    {$assocIn, $resetDb} = $dbUpdates()
    o( $db() ).deepEquals({})				"appDb is initially empty"
    o( $assocIn(['foo', 'bar'], 'baz') )
      .equals(undefined)				"returns undefined"
    o( $db() ).deepEquals(foo: bar: 'baz')		"appDp is updated"
    $assocIn(['foo', 'answer'], 42)
    o( $db() )
      .deepEquals(foo: {bar: 'baz', answer: 42})	"appDb is updated again"
    $resetDb()
    o( $db() ).deepEquals({})				"appDb was reset"
    o( $noop() ).notThrows(TypeError)			"nil effects dict is a valid change"

  o "dispatch()", ->
    {$resetDb} = $dbUpdates()
    $resetDb()
    o(type rf.dispatch ['assoc-in', ['foo', 'bar'], 'baz'])
      .equals(Timeout)					"returns a timeout value (Timeout or Number)"
    rf.dispatch ['assoc-in', ['foo', 'answer'], 42]
    o( $db() ).deepEquals({})				"no immediate effect"
    delay().then ->
      o( $db() )
        .deepEquals(foo: {bar: 'baz', answer: 42})	"all changes applied after delay"
      rf.dispatch ['reset-db']
      delay()
    .then ->
      o( $db() ).deepEquals({})				"changes applied after delay"
      clearTimeout rf.dispatch ['assoc-in', ['foo'], 'bar']
      delay()
    .then ->
      o( $db() ).deepEquals({})				"event can be cancelled"

  o "purgeEventQueue()", ->
    {$resetDb} = $dbUpdates()
    $resetDb()
    for k in ['foo', 'bar', 'baz']
      rf.dispatch ['assoc-in', [k], 42]
    o( rf.purgeEventQueue() ).equals(undefined)		"returns undefined"
    delay().then ->
      o( $db() ).deepEquals({})				"all events are cancelled"

  assocDb = ((db, [_, key, value]) -> assoc db, key, value)
  foobarDb = (foobar, f) -> f foobar
  db2fx = (f) -> (cofx, event) -> db: f(cofx.db, event)
  db2ctx = (f) -> (context) -> rf.assocEffect context, 'db', (f ...['db', 'event'].map (k) -> rf.getCoeffect context, k)
  for [reg, id1, fn1, id2, fn2] in [['regEventCtx', 'assoc-ctx', (db2ctx assocDb), 'update-foobar-ctx', (db2ctx foobarDb)],
                                    ['regEventFx', 'assoc-fx', (db2fx assocDb), 'update-foobar-fx', (db2fx foobarDb)],
                                    ['regEventDb', 'assoc-db', assocDb, 'update-foobar-db', foobarDb]]
    do (reg, id1, fn1, id2, fn2) ->
      o "#{reg}()", ->
        {$resetDb} = $dbUpdates()
        $resetDb()
        o(rf[reg] id1, fn1).equals(undefined)		"returns undefined"
        rf.dispatchSync [id1, 'foo', bar: 'baz']
        rf.dispatchSync [id1, 'answer', 42]
        db = answer: 42, foo: {bar: 'baz'}
        o( $db() ).deepEquals(db)			"db is updated accordingly"
        initial = o.spy()
        before = o.spy()
        after = o.spy()
        final = o.spy()
        now = new Date
        rf.regCofx 'now', (cofx) -> merge cofx, time: now
        interceptors = [($dbg final, initial), (rf.path 'foo'), (rf.path 'bar'), rf.unwrap, rf.injectCofx('now'), ($dbg after, before)]
        rf[reg] id2, interceptors, fn2
        db2 = assocIn db, ['foo', 'bar'], 'baz!'
        event = [id2, (s) -> "#{s}!"]
        rf.dispatchSync event
        o( $db() ).deepEquals(db2)			"interceptors are supported"
        o(initial.callCount).equals(1)			"captured initial context"
        context = coeffects: {db, event}, queue: interceptors[1..], stack: []
        o(initial.args[0]).deepEquals(context)		"initial context was generated correctly"
        context2 =
          coeffects:  {db: 'baz', event: event[1], originalEvent: event, time: now}
          stack:      (butlast interceptors).reverse()
          queue:      []
          [_pathKey]: [db, db.foo]
        o(before.args[0]).deepEquals(context2)		"context before event was produced correctly"
        context3 = chain context2, [merge, stack: [], queue: context2.stack], [rf.assocEffect, 'db', 'baz!']
        o(after.args[0]).deepEquals(context3)		"context after event was produced correctly"
        context4 = chain (merge context3, queue: [], stack: interceptors[1..]),
          [rf.assocCoeffect, 'event', event]
          [rf.assocCoeffect, 'db', db]
          [rf.assocEffect, 'db', db2]
          [assoc, _pathKey, []]
        o(final.args[0]).deepEquals(context4)		"final context was produced correctly"

  o "clearEvent()", ->
    {$resetDb, $assocIn} = $dbUpdates()
    o(rf.clearEvent 'assoc-in').equals(undefined)	"returns undefined"
    o(-> $assocIn ['foo', 'bar'], 'baz')
      .throws(TypeError)				"removes passed event"
    o(rf.clearEvent 'assoc-in').equals(undefined)	"returns undefined on nonexistent"
    $resetDb()
    o(rf.clearEvent()).equals(undefined)		"returns undefined"
    o($resetDb).throws(TypeError)			"removes all events"

  o "regSub() + subscribe()", ->
    {$resetDb, $assocIn} = $dbUpdates()
    $resetDb();  $assocIn ['foo', 'bar'], 'baz'
    foo = o.spy getIn
    o(rf.regSub 'foo', foo).equals(undefined)		"regSub returns undefined"
    query = ['foo']
    fooSub = rf.subscribe query
    query2 = ['foo', 'bar']
    barSub = rf.subscribe query2
    o(foo.callCount).equals(0)				"subscribe doesn't trigger calculation by itself"
    o(deref fooSub).equals($db().foo)			"subscribe returns cursor which derefs to subscribed value"
    o(foo.callCount).equals(1)				"1st deref triggers sub calculation"
    o(foo.args.length).equals(2)			"passed 2 arguments to sub calculation"
    o(foo.args[0]).equals( $db() )			"1st argument is current appDb value"
    o(foo.args[1]).equals(query)			"2nd argument is query"
    o(deref fooSub).equals($db().foo)			"2nd deref returns same value"
    o(foo.callCount).equals(1)				"2nd deref doesn't trigger sub calculation"
    o(deref barSub).equals($db().foo.bar)		"other deref returns required value"
    o(foo.callCount).equals(2)				"other deref triggers sub calculation"
    o(deref rf.subscribe ['foo']).equals($db().foo)	"new deref returns same value"
    o(foo.callCount).equals(2)				"new deref doesn't trigger sub calculation"
    $assocIn ['foo'], bar: 'baz'
    o(deref fooSub).equals($db().foo)			"deref after update returns current db value"
    o(foo.callCount).equals(2)				"deref after update without change doesn't trigger sub calculation"
    $assocIn ['foo', 'bar'], 'baz!'
    o(deref fooSub).equals($db().foo)			"deref after update with change returns current db value"
    o(foo.callCount).equals(3)				"deref after update with change triggers sub calculation"
    $assocIn ['answer'], 42
    o(deref fooSub).equals($db().foo)			"deref after db changed returns current db value"
    o(foo.callCount).equals(4)				"deref after db change triggers sub calculation"
    $assocIn ['baz', 'bar'], 'foo'
    get = o.spy getIn
    len = o.spy (s) -> s.length
    dbl = o.spy (n) -> n*2
    rf.regSub 'baz', get
    rf.regSub 'len-of', (([_, ...path]) -> rf.subscribe path), len
    lenQuery = ['len-of', 'baz', 'bar']
    rf.regSub 'bar-len2', '<-', lenQuery, dbl
    dblQuery = ['bar-len2']
    dblSub = rf.subscribe dblQuery
    o(get.callCount + len.callCount + dbl.callCount)
      .equals(0)					"no calculations were triggered on subscribe"
    o(deref dblSub).equals(6)				"chain is calculated correctly"
    o(get.callCount).equals(1)				"1st level calculated once"
    o(get.args[0]).equals( $db() )			"passed db to 1st level"
    o(get.args[1]).deepEquals(['baz', 'bar'])		"also passed query to 1st level"
    o(len.callCount).equals(1)				"2nd level calculated once"
    o(len.args[0]).equals('foo')			"passed 1st level result to 2nd level"
    o(len.args[1]).equals(lenQuery)			"also passed static query to 2nd level"
    o(dbl.callCount).equals(1)				"top level calculated once"
    o(dbl.args[0]).equals(3)				"passed 2nd level result to top level"
    o(dbl.args[1]).equals(dblQuery)			"also passed original query to 3rd level"
    $assocIn ['foo'], bar: 'baz'
    o(deref dblSub).equals(6)				"result is correct after unrelated update"
    o(get.callCount).equals(2)				"1st level recalculated once"
    o(get.args[0]).equals( $db() )			"passed new db to 1st level"
    o(len.callCount + len.callCount).equals(1+1)	"2nd & top level weren't triggered on unrelated update"
    $assocIn ['baz'], bar: 'foo!'
    o(deref dblSub).equals(8)				"result is correct after related update"
    o(get.callCount).equals(3)				"1st level recalculated again"
    o(len.callCount).equals(2)				"2nd level recalculated"
    o(len.args[0]).equals('foo!')			"passed 1st level result to 2nd level"
    o(dbl.callCount).equals(2)				"top level recalculated"
    o(dbl.args[0]).equals(4)				"passed 2nd level result to top level"
    $assocIn ['baz'], bar: 'oof!'
    o(deref dblSub).equals(8)				"result is correct after non-affecting update"
    o(get.callCount).equals(4)				"1st level recalculated for non-affecting update"
    o(len.callCount).equals(3)				"2nd level recalculated for non-affecting update"
    o(len.args[0]).equals('oof!')			"passed 1st level result to 2nd level"
    o(dbl.callCount).equals(2)				"top level wasn't triggered on non-affecting update"
    rf.regSub 'answer', getIn
    rf.regSub 'list', (([_, k]) -> [['foo', k], ['baz', k], ['answer']].map rf.subscribe), identity
    o(deref rf.subscribe ['list', 'bar'])
      .deepEquals(['baz', 'oof!', 42])			"dependencies list works"
    depsDict = ([_, k]) ->
      foo: rf.subscribe ['foo', k]
      baz: rf.subscribe ['baz', k]
      answer: rf.subscribe ['answer']
    rf.regSub 'dict', depsDict, identity
    o(deref rf.subscribe ['dict', 'bar'])
      .deepEquals(foo: 'baz', baz: 'oof!', answer: 42)	"dependencies dict works"
    rf.regSub 'list*',
      '<-', ['foo', 'bar']
      '<-', ['baz', 'bar']
      '<-', ['answer']
      identity
    o(deref rf.subscribe ['list*'])
      .deepEquals(['baz', 'oof!', 42])			"multiple shorthands work as dependencies list"

  o "clearSub()", ->
    {$resetDb, $assocIn} = $dbUpdates()
    $resetDb();   $assocIn ['foo', 'bar'], 'baz'
    rf.regSub 'boo', (db) -> db.foo
    rf.regSub 'oob', (db) -> db.foo
    x = rf.subscribe ['boo']
    y = rf.subscribe ['oob']
    o(deref x).equals($db().foo)
    o(rf.clearSub 'boo').equals(undefined)		"returns undefined"
    o(deref x).equals($db().foo)			"calculation still exists"
    o(-> deref rf.subscribe ['boo']).throws(TypeError)	"but subsription cannot access it anymore"
    o(rf.clearSub 'boo').equals(undefined)		"returns undefined on nonexistent"
    o( rf.clearSub() ).equals(undefined)		"returns undefined"
    o(deref y).equals($db().foo)			"uncached calculation also still exists"
    o(-> deref rf.subscribe ['oob']).throws(TypeError)	"but all subscriptions were removed now"

  o "clearSubscriptionCache()", ->
    {$resetDb, $assocIn} = $dbUpdates()
    $resetDb();   $assocIn ['foo', 'bar'], 'baz'
    get = o.spy getIn
    len = o.spy (s) -> s.length
    rf.regSub 'foo', get
    rf.regSub 'len', '<-', ['foo', 'bar'], len
    x = rf.subscribe ['len']
    o(deref x).equals(3)				"subscription works"
    o(get.callCount).equals(1)				"1st level calculated once"
    o(len.callCount).equals(1)				"2nd level calculated once"
    $assocIn ['foo', 'baz'], 'bar'
    o(deref x).equals(3)				"subscription works"
    o(get.callCount).equals(2)				"1st level recalculated"
    o(len.callCount).equals(1)				"2nd level didn't recalculate"
    o(deref x).equals(3)				"subscription works"
    o(get.callCount).equals(2)				"1st level didn't recalculate"
    o(len.callCount).equals(1)				"2nd level didn't recalculate"
    o( rf.clearSubscriptionCache() ).equals(undefined)	"returns undefined"
    o(deref x).equals(3)				"subscription works"
    o(get.callCount).equals(3)				"1st level recalculated"
    o(len.callCount).equals(2)				"2nd level recalculated"

  o "regFx()", ->
    log = o.spy()
    o(rf.regFx 'log', log).equals(undefined)		"returns undefined"
    rf.regEventFx 'log', [rf.unwrap], (_, msg) -> log: msg
    rf.dispatchSync ['log', "Foo"]
    o(log.callCount).equals(1)				"registered effect actioned once on db count"
    o(log.args.length).equals(1)			"passed 1 argument"
    o(log.args[0]).equals("Foo")			"passed query parameter"
    rf.dispatchSync ['log']
    o(log.callCount).equals(2)				"actioned again"
    o(log.args.length).equals(1)			"passed 1 argument"
    o(log.args[0]).equals(undefined)			"passed undefined"

  o "clearFx()", ->
    {$resetDb} = $dbUpdates()
    rf.regFx 'doStuff', identity
    rf.regFx 'doOtherStuff', identity
    rf.regEventFx 'do-stuff', -> doStuff: yes
    rf.regEventFx 'do-other-stuff', -> doOtherStuff: yes
    o(rf.clearFx 'doStuff').equals(undefined)		"returns undefined"
    o(-> rf.dispatchSync ['do-stuff'])
      .throws(TypeError)				"effect was removed"
    o(rf.clearFx 'doStuff').equals(undefined)		"returns undefined on nonexistent"
    o( rf.clearFx() ).equals(undefined)			"returns undefined"
    o(-> rf.dispatchSync ['do-other-stuff'])
      .throws(TypeError)				"all effects were removed"
    o($resetDb).notThrows(Error)			"except for builtin ones"

  o "fx builtin effect", ->
    order = []
    log1 = o.spy() # won't be checking order as it isn't in the same list
    log2 = o.spy -> order.push 'log2'
    log3 = o.spy -> order.push 'log3'
    log4 = o.spy -> order.push 'log4'
    rf.regFx 'log1', log1
    rf.regFx 'log2', log2
    rf.regFx 'log3', log3
    rf.regFx 'log4', log4
    rf.regEventFx 'log-it', [rf.unwrap], (_, msg) ->
      log1: msg
      fx: [(['log2', "?"] unless msg),
           (['log3', msg] if msg),
           ['log4', msg]]
    rf.dispatchSync ['log-it', "Foo"]
    o(log1.callCount).equals(1)				"effect 1 was actioned"
    o(log2.callCount).equals(0)				"effect 2 wasn't actioned"
    o(log3.callCount).equals(1)				"effect 3 was actioned"
    o(log4.callCount).equals(1)				"effect 4 was actioned"
    o(order).deepEquals(['log3', 'log4'])		"passed effects are actioned in the given order"

  o "dispatchLater builtin effect", ->
    log = o.spy()
    rf.regFx 'log', log
    rf.regEventFx 'log', [rf.unwrap], (_, msg) -> log: msg
    rf.regEventFx 'schedule', [rf.unwrap], (_, params) -> dispatchLater: params
    rf.dispatchSync ['schedule', dispatch: ['log', "Foo"]]
    o(log.callCount).equals(0)				"no immediate effect"
    delay().then ->
      o(log.callCount).equals(1)			"event dispatched after delay"
      rf.dispatchSync ['schedule', dispatch: ['log', "Bar"], ms: 20]
      delay()
    .then ->
      o(log.callCount).equals(1)			"specifying time changes delay"
      delay 20
    .then ->
      o(log.callCount).equals(2)			"event dispatched after specified delay"

  o "dispatch builtin effect", ->
    log = o.spy()
    rf.regFx 'log', log
    rf.regEventFx 'log', [rf.unwrap], (_, msg) -> log: msg
    rf.regEventFx 'schedule', [rf.unwrap], (_, params) -> dispatch: params
    rf.dispatchSync ['schedule', ['log', "Foo"]]
    o(log.callCount).equals(0)				"no immediate effect"
    delay().then ->
      o(log.callCount).equals(1)			"event dispatched after delay"

  o "dsub()", ->
    {$resetDb, $assocIn} = $dbUpdates()
    $resetDb();  $assocIn ['foo', 'bar'], 'baz'
    rf.regSub 'foo', getIn
    o(rf.dsub ['foo']).equals($db().foo)		"subscribes to and immediately derefs specified query"

  o "disp()", ->
    log = o.spy()
    rf.regFx 'log', log
    rf.regEventFx 'dbg', [rf.trimV], (_, args) -> log: args
    effect = ({args, onSuccess, onFailure, succeed}) -> if succeed then rf.disp onSuccess, ...args else rf.disp onFailure, "oops"
    o(type effect args: ['foo', 'bar', 'baz'], onSuccess: ['dbg', 42], succeed: yes)
      .equals(Timeout)					"succeeded, dispatching"
    o(log.callCount).equals(0)				"no immediate effect"
    delay().then ->
      o(log.callCount).equals(1)			"processed onSuccess"
      o(log.args[0])
        .deepEquals([42, 'foo', 'bar', 'baz'])		"passed onSuccess values"
      o(effect args: ['foo', 'bar', 'baz'], onSuccess: ['dbg', 42], succeed: no)
        .equals(undefined)				"failed, nothing to dispatch"
      o(effect args: ['foo', 'bar', 'baz'], onFailure: ['dbg', 42], succeed: yes)
        .equals(undefined)				"succeeded, nothing to dispatch"
      o(type effect args: ['foo', 'bar', 'baz'], onFailure: ['dbg', 42], succeed: no)
        .equals(Timeout)				"failed, dispatching"
      o(log.callCount).equals(1)
      delay()
    .then ->
      o(log.callCount).equals(2)			"procesed onFailure"
      o(log.args[0]).deepEquals([42, "oops"])		"passed onFailure values"
