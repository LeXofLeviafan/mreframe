{reagent: r, atom: {deref, reset}} = require 'mreframe'

atomInput = (value) ->
  ['input', {type: 'text',  value: (deref value),\
             oninput: (evt) -> (reset value, evt.target.value)}]

sharedState = ->
  val = r.atom "foo"
  ->
    ['div'
      ['p', "The value is now: ", (deref val)]
      ['p', "Change it here: ", [atomInput, val]]]
