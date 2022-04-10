let r = require('mreframe/reagent');
let {range} = require('lodash');

let lister = (items) =>
  ['ul',
    ...items.map(item =>
      r.with({key: item}, ['li', "Item ", item]))];

let listerUser = () =>
  ['div',
    "Here is a list:",
    [lister, range(3)]];
