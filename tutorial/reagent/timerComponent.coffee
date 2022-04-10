{reagent: r, atom: {deref, swap}} = require 'mreframe'

timerComponent = ->
  secondsElapsed = r.atom 0
  ->
    setTimeout (-> (swap secondsElapsed, (n) -> n + 1)), 1000
    ['div', "Seconds Elapsed: ", (deref secondsElapsed)]
