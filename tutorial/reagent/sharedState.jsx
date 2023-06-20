import r from 'mreframe/reagent';
import { deref, reset } from 'mreframe/atom';

let AtomInput = (value) => (
  <input type="text" value={deref(value)}
         oninput={evt => reset(value, evt.target.value)}/>
);

let SharedState = () => {
  let val = r.atom("foo");
  return () => (
    <div>
      <p>The value is now: {deref(val)}</p>
      <p>Change it here: <AtomInput>{val}</AtomInput></p>
    </div>
  );
};
