import r from 'mreframe/reagent';
import { deref, swap } from 'mreframe/atom';

var clickCount = r.atom(0);

let CountingComponent = () => (
  <div>
    The atom <code>clickCount</code> has value:
    {" "}{deref(clickCount)}{". "}
    <input type="button" value="Click me!"
           onclick={() => swap(clickCount, n => n + 1)}/>
  </div>
);
