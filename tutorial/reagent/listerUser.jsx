import r from 'mreframe/reagent';
import { range } from 'lodash';

let Lister = (items) => (
  <ul>
    {items.map(item =>
      <li key={item}>Item {item}</li>)}
  </ul>
)

let ListerUser = () => (
  <div>
    Here is a list:
    <Lister>{[range(3)]}</Lister>
  </div>
);
