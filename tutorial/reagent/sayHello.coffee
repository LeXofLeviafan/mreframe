helloComponent = (name) ->
  ['p', "Hello, ", name, "!"]

sayHello = ->
  [helloComponent, "world"]
