let {reagent: r, atom: {deref, swap}} = require('mreframe');

let timerComponent = () => {
  let secondsElapsed = r.atom(0);
  return () => {
    setTimeout(() => swap(secondsElapsed, n => n + 1), 1000);
    return ['div', "Seconds Elapsed: ", deref(secondsElapsed)];
  };
};
