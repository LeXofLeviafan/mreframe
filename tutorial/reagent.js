var browser = typeof window !== 'undefined';
if (!browser) {  // node
  global.window = global.document = global.requestAnimationFrame = void 0;
  var m = require('mithril');
}

var mreframe = require(browser ? 'mreframe' : '..'),
    {reagent: r, atom: {deref, reset}, util: {identity, dict, entries}} = mreframe;
var lodash = (typeof _ !== 'undefined' ? _ : require('lodash'));
if (typeof EXAMPLES === 'undefined')
  var {EXAMPLES} = require('./reagent.examples');

const NBSP = "\u202F";
const REP = "https://github.com/LeXofLeviafan/mreframe/blob/main";
const MODES = {
  html:   "HTML",
  js:     "JS",
  coffee: "Coffee",
  wisp:   "Wisp",
};


let kebabToCamel = s => s.replace(/[a-z]-[a-z]/g, z => z[0] + z[2].toUpperCase());

let exampleComponent = (name, ...deps) => (exampleComponent[name] = exampleComponent[name] ||
  EXAMPLES[name].eval?.call({mreframe, lodash, examples: dict( deps.map(it => [it, exampleComponent(it)]))}));

var mode = r.atom('js'); // 'js' | 'coffee' | 'wisp' | 'html'


// The "\n"s (and m.trust) are for generating (relatively) readable HTML
let Example = (id, ...deps) => {
  let show = r.atom(true);
  let name = kebabToCamel(id);
  id = id.replace(/^_/, "");
  let example = EXAMPLES[name];
  let component = exampleComponent(name, ...deps.map(kebabToCamel));
  return () => {
    let [_show, lang] = [show, mode].map(deref);
    let className = [example.className, !_show && 'hidden'];
    let code = (browser && example[lang+'_']) || example[lang];// : `\n${example[lang]}\n`);
    return ['<>', "\n",
             component && ['<>',
                            ['h3.example-heading', "Example",
                              ['a.example-hide', {onclick: () => reset(show, !_show)}, (_show ? "hide" : "show")]], "\n",
                            ['.example', {id, className}, (browser ? [component] : m.trust(example.html))], "\n"],
             _show && ['<>',
                        ['h3.source-heading', {className}, "Source", ['span.source-lang', MODES[lang]]], "\n",
                        ['pre.source', {className}, ['code', {class: `language-${lang}`}, code]], "\n"]];
  };
};

let Href = (href, text, title) => ['a', {href, title, target: '_blank'}, text];

let Nav = () =>
  ['nav',
    ['ul.nav', "\n ",
      ['li', [Href, "https://lexofleviafan.github.io/mreframe", "mreframe", "mreframe (\"Mithril + re-frame\")"]], "\n",
      ['li', [Href, "https://reagent-project.github.io", "[Reagent]", "Reagent (CLJS)"]], "\n",
      ['li', [Href, "re-frame.html", "re-frame", "re-frame"]], "\n",
      ['li.separator'], "\n",
      ...entries(MODES).flatMap(([k, s]) =>
        [['li', {class: {brand: deref(mode) === k}}, ['a', {title: `Display ${s} code examples`, onclick: () => reset(mode, k)}, s]], "\n"])]];

let Header = () =>
  ['<>',
    ['h1', ['del', "Reagent"], " ", ['code', "mreframe/reagent"], ": Minimalistic ", ['del', "React"], " Mithril for ", ['del', "ClojureScript"], " JavaScript"], "\n",
    ['p', ['strong', "Note: This is a repurposed copy of the ",
            [Href, "https://reagent-project.github.io", "original tutorial for Reagent (a React/ClojureScript library)"]]], "\n"];

let IntroductionToReagent = () =>
  ['<>', "\n\n",
    ['h2', {id: 'introduction-to-reagent'}, "Introduction to Reagent"], "\n",
    ['p',
      [Href, `${REP}/docs/reagent.md`, ['code', "mreframe/reagent"]], " provides a minimalistic interface\n",
      " for ", [Href, "https://mithril.js.org", "Mithril"], ". It allows you to define efficient React components using nothing but\n",
      " plain JavaScript functions and data, that describe your UI using a ", [Href, "https://github.com/weavejester/hiccup", "Hiccup"], "-like syntax."], "\n",
    ['p',
      "The goal of Reagent is to make it possible to define arbitrarily complex UIs using just a couple of basic concepts,\n",
      " and to be fast enough by default that you rarely have to think about performance."], "\n",
    ['p', "A very basic Reagent component may look something like this:"], "\n",
    [Example, 'simple-component'], "\n",
    ['p', "You can build new components using other components as building blocks. Like this:"], "\n",
    [Example, 'simple-parent', 'simple-component'], "\n",
    ['p', "Data is passed to child components using plain old JS data types. Like this:"], "\n",
    [Example, 'say-hello'], "\n",
    ['p',
      ['strong', "Note:"], " In the example above, ", ['code', "helloComponent"], " might just as well have been called as a normal JS function instead of as a Reagent component.\n",
      "The only difference would have been performance, since ”real” Reagent components are only re-rendered when their data have changed.\n",
      "More advanced components though (see below) must be called with square brackets."], "\n",
    ['p', "Here is another example that shows items in a list:"], "\n",
    [Example, 'lister-user'], "\n",
    ['p',
      ['strong', "Note:"], " The ", ['code', "r.with({key: item},"], " part above isn’t really necessary in this simple example,\n",
      " but attaching a unique key to every item in a dynamically generated list of components is good practice,\n",
      " and helps Mithril to improve performance for large lists. (Note: use it either for every list item, or for none.)\n",
      "The key can be given either (as in this example) as meta-data, or as a ", ['code', "key"], " value in the attributes of a tag.\n",
      "See Mithril ", [Href, "https://mithril.js.org/keys.html", "documentation"], " for more info."], "\n"];

let ManagingStateInReagent = () =>
  ['<>', "\n\n",
    ['h2', {id: 'managing-state-in-reagent'}, "Managing state in Reagent"], "\n",
    ['p',
      "The easiest way to manage state in Reagent is to use Reagent’s own version of\n",
      " ", [Href, `${REP}/docs/atom.md`, ['code', "atom"]], ". It works exactly like the basic one,\n",
      " except that it schedules a redraw every time it is changed. Any component that uses a ", ['code', "r.atom"], " is automagically re-rendered when its value changes."], "\n",
    ['p', "Let’s demonstrate that with a simple example:"], "\n",
    [Example, 'counting-component'], "\n",
    ['p', "Sometimes you may want to maintain state locally in a component. That is easy to do with a ", ['code', "r.atom"], " as well."], "\n",
    ['p', "Here is an example of that, where we call ", ['code', "setTimeout"], " every time the component is rendered to update a counter:"], "\n",
    [Example, 'timer-component'], "\n",
    ['p',
      "The previous example also uses another feature of Reagent: a component function can return another function,\n",
      " that is used to do the actual rendering. This function is called with the same arguments as the first one."], "\n",
    ['p', "This allows you to perform some setup of newly created components without resorting to Mithril lifecycle events."], "\n",
    ['p', "By simply passing a ", ['code', "r.atom"], " around you can share state management between components, like this:"], "\n",
    [Example, 'shared-state'], "\n"];

let EssentialApi = () =>
  ['<>', "\n\n",
    ['h2', {id: 'essential-api'}, "Essential API"], "\n",
    ['p', "Reagent supports most of Mithril API, but there is really only one entry-point that is necessary for most applications: ", ['code', "r.render"], "."], "\n",
    ['p', "It takes two arguments: a component, and a DOM node. For example, splashing the very first example all over the page would look like this:"], "\n",
    [Example, '_render'], "\n"];

let PuttingItAllTogether = () =>
  ['<>', "\n\n",
    ['h2', {id: 'putting-it-all-together'}, "Putting it all together"], "\n",
    ['p', "Here is a slightly less contrived example: a simple BMI calculator."], "\n",
    ['p', "Data is kept in a single ", ['code', "r.atom"], ": a dict with height, weight and BMI as keys."], "\n",
    [Example, 'bmi-component'], "\n"];

let Performance = () =>
  ['<>', "\n\n",
    ['h2', {id: 'performance'}, "Performance"], "\n",
    ['p',
      "Mithril itself is very fast, and so is Reagent. In fact, Reagent will be even faster than plain Mithril a lot of the time,\n",
      " as it automatically prevents rerendering of unchanged components (which are normally the majority)."], "\n",
    ['p',
      "Mounted components are only re-rendered when their parameters have changed.\n",
      "The change could come from a deref’ed ", ['code', "r.atom"], ", the arguments passed to the component or component ", ['code', "r.state"], "."], "\n",
    ['p',
      "All of these are checked for changes with ", ['code', "identical"], " which is basically only a pointer comparison, so the overhead is very low.\n",
      "Dicts passed as arguments to components are compared the same way: they are considered equal if all their entries are identical."], "\n",
    ['p', "All this means that you simply won’t have to care about performance most of the time. Just define your UI however you like – it will be fast enough."], "\n",
    ['p',
      "There are a couple of situations that you might have to care about, though. If you give Reagent a big list of components to render,\n",
      " you might have to supply all of them with a unique ", ['code', "key"], " attribute to speed up rendering (see above).\n",
      "Also note that anonymous functions are not, in general, equal to each other even if they represent the same code and closure."], "\n",
    ['p',
      "But again, in general you should just trust that Mithril and Reagent will be fast enough.\n",
      "This very page is composed of a single Reagent component with thousands of child components\n",
      " (every single parenthesis etc in the code examples is a separate vnode)\n",
      " and yet the page can be updated many times every second without taxing the browser the slightest."], "\n",
    ['p',
      "Incidentally, this page also uses another Mithril trick: the entire page is pre-rendered using Node, and ", ['code', "mithril-node-renderer"], ".\n",
      "When it is loaded into the browser, Mithril automatically attaches event-handlers to the already present DOM tree."], "\n",
    ['p',
      ['strong', "Note:"], " Comparing with Mithril perftests (which are mostly testing raw rendering speed),\n",
      " mreframe shows a relative slowdown in the direct performance (by up to 4 times);\n",
      " however, performance of tests involving re-rendering of unchanged components is improved\n",
      " by anywhere from a few to a few dozen times or so depending on the test, due to these components not being recalculated in the first place."], "\n"];

let CompleteDemo = () =>
  ['<>', "\n\n",
    ['h2', {id: 'complete-demo'}, "Complete demo"], "\n",
    [Example, 'simple-example'], "\n"];

let Todomvc = () =>
  ['<>', "\n\n",
    ['h2', {id: 'todomvc'}, "Todomvc"], "\n",
    ['p', "The obligatory todo list looks roughly like this in Reagent (cheating a little bit by skipping routing and persistence):"], "\n",
    [Example, 'todo-app'], "\n"];


let App = () =>
  ['<>',
    [Nav], "\n\n",
    ['main', "\n\n",
      [Header],
      [IntroductionToReagent],
      [ManagingStateInReagent],
      [EssentialApi],
      [PuttingItAllTogether],
      [Performance],
      [CompleteDemo],
      [Todomvc]]];


if (browser)
  window.onload = () => r.render([App], document.body);
else {  // node
  let [fs, render] = ['fs', 'mithril-node-render'].map(require);
  r._init({redraw: identity});
  Webpage = () =>
    ['<>',
      m.trust("<!DOCTYPE html>\n"),
      ['html',
        ['head', "\n  ",
          ['meta', {charset: 'UTF-8'}], "\n  ",
          ['title', "mreframe/reagent: Minimalistic Mithril for JavaScript"], "\n  ",
          ['link', {rel: 'stylesheet', href: "tutorial/style.css"}], "\n  ",
          ['script', {src: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"}], m.trust(" <!-- used in some examples -->\n  "),
          ['script', {src: "dist/mreframe.js"}], "\n  ",
          ['script', {src: "tutorial/reagent.examples.js"}], m.trust(" <!-- example sources & pre-generated code highlights -->\n  "),
          ['script', {src: "tutorial/reagent.js"}], m.trust(" <!-- SPA script -->\n")],
        ['body', "\n",
          [App], "\n"]], "\n"];
  render(r.asElement([Webpage]), {strict: true}).then(html =>
    fs.writeFileSync("reagent.html", html));
}
