//prelude: let simpleComponent = require('examples/simpleComponent');
let simpleParent = () =>
  ['div',
    ['p', "I include simpleComponent."],
    [simpleComponent]];
