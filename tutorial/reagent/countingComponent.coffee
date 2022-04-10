{reagent: r, atom: {deref, swap}} = require 'mreframe'

clickCount = r.atom 0

countingComponent = ->
  ['div'
    "The atom ", ['code', "clickCount"], " has value: "
    (deref clickCount), ". "
    ['input', {type: 'button',  value: "Click me!",\
               onclick: -> (swap clickCount, (n) -> n + 1)}]]
