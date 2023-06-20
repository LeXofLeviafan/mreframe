/* Console output logs init/render events, and demonstrates automatic redraw detection */
const [{reagent: r, atom: {atom, deref, swap}}, m] = ['mreframe', 'mithril/hyperscript'].map(require);
const {Fragment} = require('mreframe/jsx-runtime'); // to use with key={}

// Mithril component using 'this'
let Component = {
  oninit ({attrs: {add}}) {this.answer = 1;  console.log({add}, 'Component')},
  view ({children, attrs: {add}}) {
    return m('span', this.answer+(add||0), " ", children);
  },
}, Component_ = r.adaptComponent(Component); // native (Mithril) components have to be adapted to be used
// Mithril component using 'vnode.state'
let Component2 = {
  oninit: ({state, attrs: {add}}) => {state.answer = 2;  console.log({add}, 'Component2')},
  view: ({state, children, attrs: {add}}) => (console.log('Component2'),
    m('span', state.answer+(add||0), " ", children)),
}, Component2_ = r.adaptComponent(Component2);
// Mithril closure component
let ComponentF = ({attrs: {add}}) => {
  let answer = 3;
  console.log({add}, 'ComponentF');
  return {view: ({children, attrs: {add}}) => (console.log('ComponentF'),
    m('span', answer+(add||0), " ", children))};
}, ComponentF_ = r.adaptComponent(ComponentF);

let RComponentFNoredraw = (...children) => {
  let answer = 4, add = Math.random();
  console.log('RComponentFNoredraw');
  return <span>{answer+add} <>{children}</></span>; // arrays are NOT equivalent to fragments in reagent!
};

// Reagent form-2 component
let RComponentF = (add) => {
  let answer = 5;
  console.log({add}, 'RComponentF');
  return (add, ...children) => (console.log('RComponentF'),
    <span>{[answer+(add||0), " ", ...children]}</span>); // you can do this though
};

// Reagent form-2 component with inner state and delayed update
let RComponentF2 = (add) => {
  let self = r.currentComponent();
  r.setState(self, {answer: 6});
  console.log({add}, 'RComponentF2');
  setTimeout(() => r.setState(self, {answer: 21}), 10000);
  return (add, ...children) => (console.log('RComponentF2'),
    <span children={[r.state(self).answer+(add||0), " ", ...children]}/>); // or even this
};

// Reagent form-3 component with delayed update
let RComponent = r.createClass({
  constructor: vnode => {
    console.log({add: r.argv(vnode)[1]}, 'RComponent');
    setTimeout(() => r.setState(vnode, {answer: 42}), 5000);
  },
  getInitialState: () => ({answer: 7}),
  reagentRender: (add, ...children) => (console.log('RComponent'),
    <span>{r.state( r.currentComponent() ).answer+(add||0)} <>{children}</></span>), // :-(
});

{
  let renders = atom(0),  redraws = r.atom(0),  inc = n => n + 1;
  let App = () => ( // includes various usage examples for components
    <>
      <h1>{document.title || "JSX reagent example"}</h1>
      Plain text
      <p>Plain paragraph</p>
      <p>
        <i title={"Hover me "+Math.random()}>Nested</i>
        {" "}
        <span style={{color: 'green'}}>text</span>
      </p>
      <p><Component_ add={Math.random()}>component</Component_> text</p>
      <p>{[Component2_, {add: Math.random()}, "component"]} text</p>
      {/* or: ['>', Component2, {add: Math.random()}, "component"] */}
      <p><ComponentF_ add={Math.random()} children="function"/> text</p>
      <p>{[RComponentFNoredraw, "function"]} text (has no inputs, won{"'"}t be redrawn)</p>
      <p>{r.asElement([RComponentF, Math.random(), "component"])} text</p>
      <p><RComponentF>{Math.random()}{"function"}</RComponentF> text</p>
      <p><RComponentF2>{[Math.random(), "function"]}</RComponentF2> text (causes rerender after 10 seconds)</p>
      <p><RComponent children={[Math.random(), "component"]}/> text (causes rerender after 5 seconds)</p>
      <button onclick={() => swap(redraws, inc)}>Redraw</button>
      {" ("}renders: {swap(renders, inc)}, redraws: {deref(redraws)}{") "}
      <button onclick={() => {}}>No Redraw</button>{" "}
      <button onclick={() => setTimeout(() => swap(redraws, inc), 1000)}>Delayed Redraw</button>
      <p style={{color: 'lightgrey'}} title="‘key’ works on fragments as well">
        <span key={1} title="key checks aren't that consistent though">foo </span>
        <Fragment key={2}>
          <span>bar </span>
          <span>baz </span>
        </Fragment>
        <RComponentF key={3}>{Math.random()}~</RComponentF>
      </p>
    </>
  );

  r.render(<App/>, document.body);
}
