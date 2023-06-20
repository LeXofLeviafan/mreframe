import r from 'mreframe/reagent';

let SimpleComponent = () => (
  <div>
    <p>I am a component!</p>
    <p class="someclass">
      I have <strong>bold</strong>
      <span style={{color: 'red'}}> and red </span>
      text.
    </p>
  </div>
);

r.render(<SimpleComponent/>, document.body);
