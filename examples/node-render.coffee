# make Mithril happy
unless global.window
  global.window = global.document = global.requestAnimationFrame = undefined

[m, render, r] = ['mithril', 'mithril-node-render', 'mreframe/reagent'].map require

fooBar = (id, name) => ['span', {id}, "Hello, ", name, "!"]

(render r.asElement [fooBar, 'async', "World"]).then (html) => console.log html

html = render.sync r.asElement [fooBar, 'sync', "World"]
console.log html
