r = require 'reagent/mithril'
{range} = require 'lodash'

lister = (items) ->
  ['ul'
    ...items.map (item) ->
      (r.with {key: item}, ['li', "Item ", item])]

listerUser = ->
  ['div'
    "Here is a list:"
    [lister, (range 3)]]
