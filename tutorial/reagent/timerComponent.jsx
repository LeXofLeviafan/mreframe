import r from 'mreframe/reagent';
import { deref, swap } from 'mreframe/atom';

let TimerComponent = () => {
  let secondsElapsed = r.atom(0);
  return () => {
    setTimeout(() => swap(secondsElapsed, n => n + 1), 1000);
    return <div>Seconds Elapsed: {deref(secondsElapsed)}</div>;
  };
};
