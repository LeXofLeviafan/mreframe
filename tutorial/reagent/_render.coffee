r = require 'mreframe/reagent'

simpleComponent = ->
  ['div'
    ['p', "I am a component!"]
    ['p.someclass'
      "I have ", ['strong', "bold"]
      ['span', {style: {color: 'red'}}, " and red "], "text."]]

r.render [simpleComponent], document.body
