import r from 'mreframe/reagent';
import { deref, reset } from 'mreframe/atom';

var timer = r.atom(new Date);
var timeColor = r.atom("#f34");


let Greeting = (message) => (
  <h1>{message}</h1>
);

let Clock = () => {
  let [timeStr] = deref(timer).toTimeString().split(" ");
  return (
    <div class="example-clock" style={{color: deref(timeColor)}}>
      {timeStr}
    </div>
  );
};

let ColorInput = () => (
  <div class="color-input">
    {"Time color: "}
    <input type="text" value={deref(timeColor)}
           oninput={e => reset(timeColor, e.target.value)}/>
  </div>
);

let SimpleExample = () => (
  <div>
    <Greeting>Hello world, it is now</Greeting>
    <Clock/>
    <ColorInput/>
  </div>
);


setInterval(() => reset(timer, new Date), 1000);  // timeUpdater

r.render(<SimpleExample/>, document.getElementById('app'));
