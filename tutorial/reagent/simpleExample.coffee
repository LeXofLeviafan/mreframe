{reagent: r, atom: {deref, reset}} = require 'mreframe'

timer = r.atom (new Date)
timeColor = r.atom "#f34"


greeting = (message) ->
  ['h1', message]

clock = ->
  [timeStr] = (deref timer).toTimeString().split " "
  ['div.example-clock', style: {color: (deref timeColor)}
     timeStr]

colorInput = ->
  ['div.color-input'
    "Time color: "
    ['input', {type: 'text',  value: (deref timeColor)
               oninput: (e) -> (reset timeColor, e.target.value)}]]

simpleExample = ->
  ['div'
    [greeting, "Hello world, it is now"]
    [clock]
    [colorInput]]


setInterval (-> reset timer, new Date), 1000  # timeUpdater

r.render [simpleExample], (document.getElementById 'app')
