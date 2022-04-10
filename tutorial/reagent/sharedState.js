let {reagent: r, atom: {deref, reset}} = require('mreframe');

let atomInput = (value) =>
  ['input', {type: 'text',  value: deref(value),
             oninput: evt => reset(value, evt.target.value)}];

let sharedState = () => {
  let val = r.atom("foo");
  return () =>
    ['div',
      ['p', "The value is now: ", deref(val)],
      ['p', "Change it here: ", [atomInput, val]]];
};
