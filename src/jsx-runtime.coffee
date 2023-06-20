r = require './reagent'

jsx = (tag, {children=[], ...attrs}, key) => # this API isn't documented properly...
  r.with {key, ...attrs}, [tag].concat(children)

module.exports = {jsx, jsxs: jsx, Fragment: '<>'}
