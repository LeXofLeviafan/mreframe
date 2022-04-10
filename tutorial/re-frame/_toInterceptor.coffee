{reFrame: rf, util: {merge}} = require 'mreframe'

# this interceptor prints out event context before and after its handling
dbg = rf.toInterceptor
  id: 'dbg'
  before: (context) ->
    console.debug "before:", context
    context
  after:  (context) ->
    console.debug "after:", context
    context

rf.regEventDb 'set-foo', [dbg], (db, [_, foo]) -> merge db, {foo}
