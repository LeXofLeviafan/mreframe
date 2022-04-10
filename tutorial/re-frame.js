var browser = typeof window !== 'undefined';
if (!browser) {  // node
  global.window = global.document = global.requestAnimationFrame = void 0;
  var m = require('mithril');
}

var mreframe = require(browser ? 'mreframe' : '..'),
    {reagent: r, atom: {deref, reset}, util: {identity, dict, entries}} = mreframe;
if (typeof EXAMPLES === 'undefined')
  var {EXAMPLES} = require('./re-frame.examples');

const NBSP = "\u202F";
const REP = "https://github.com/LeXofLeviafan/mreframe/blob/main";
const MODES = {
  js:     "JS",
  coffee: "Coffee",
  wisp:   "Wisp",
};


let kebabToCamel = s => s.replace(/[a-z]-[a-z]/g, z => z[0] + z[2].toUpperCase());

let exampleComponent = (name, ...deps) => (exampleComponent[name] = exampleComponent[name] ||
  EXAMPLES[name].eval?.call({mreframe, examples: dict( deps.map(it => [it, exampleComponent(it)]))}));

var mode = r.atom('js'); // 'js' | 'coffee' | 'wisp'


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
    let code = (browser && example[lang+'_']) || example[lang];
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
      ['li', [Href, "https://www.npmjs.com/package/mreframe", "mreframe", "mreframe (\"Mithril + re-frame\")"]], "\n",
      ['li', [Href, "reagent.html", "Reagent", "Reagent"]], "\n",
      ['li', [Href, "https://day8.github.io/re-frame", "[re-frame]", "re-frame (CLJS)"]], "\n",
      ['li.separator'], "\n",
      ...entries(MODES).flatMap(([k, s]) =>
        [['li', {class: {brand: deref(mode) === k}}, ['a', {title: `Display ${s} code examples`, onclick: () => reset(mode, k)}, s]], "\n"])]];

let Header = () =>
  ['<>',
    ['h1', ['code', "mreframe/re-frame"], ": Build web apps, in ", ['del', "ClojureScript"], " JavaScript, leveraging ", ['del', "React"], " Mithril."], "\n  ",
    ['strong', "Note: This is a small introduction to ", ['code', "mreframe/re-frame"], ", partially based on the ",
            [Href, "https://day8.github.io/re-frame/re-frame", "original tutorial for re-frame (a React/ClojureScript library)"]], "\n",
    ['p',
      "McCoy might report “It's MVC, Jim, but not as we know it”.\n",
      "And you would respond “McCoy, you trouble maker, why even mention an OO pattern? re-frame is a ", ['strong', "functional framework"], ".”"], "\n",
    ['p',
      "So, it is about ", ['code', "data"], ", and the ", ['code', "functions"], " which transform that data.\n",
      "And, because it is a ", ['strong', "reactive framework"], ", ", ['code', "data"], " coordinates ", ['code', "functions"], ", not the other way around."], "\n"];

let TheDataLoop = () =>
  ['<>', "\n\n",
    ['h2', {id: 'the-data-loop'}, "The Data Loop"], "\n",
    ['p',
      "The original ", [Href, "https://day8.github.io/re-frame", "re-frame"], " framework is a ", [Href, "https://clojure.org", "Clojure"], " library, and Clojure is a LISP.\n",
      "The reason this is important is because a (defining) property of a LISP is that any program in it is also valid LISP data.\n",
      "It may not seem obvious at the first glance, but it defines the very experience of programming in Clojure at a profound level.\n",
      "You are ", ['em', "programming in data"], "."], "\n",
    ['p',
      "So, it will come as no surprise, then, to find that re-frame has a data-oriented design.\n",
      "Events are data. Effects are data. DOM is data. The functions which transform data are registered and looked up via data.\n",
      "Interceptors (data) are preferred to middleware (higher order functions). Etc."], "\n",
    ['p',
      "And re-frame apps are reactive which further elevates data because in reactive systems,\n",
      " it is the arrival of data which coordinates the calling of functions, not the other way around."], "\n",
    ['hr'], "\n",
    ['p', "Architecturally, re-frame implements “a perpetual loop”."], "\n",
    ['p',
      "To build an app, you hang pure functions on certain parts of this loop, and re-frame looks after the ", ['strong', "conveyance of data"], " around the loop,\n",
      " into and out of the transforming functions you provide. The tag line for re-frame is “derived values, flowing”."], "\n",
    ['p',
      "re-frame provides the conveyance of the data around the loop. You design what's flowing,\n",
      " and then you hang functions on the loop at various points to compute the data's phase changes."], "\n",
    ['hr'], "\n",
    ['p', "Each iteration of the re-frame loop has 6 stages, happening one after the other:"], "\n",
    ['ol',
      ['li', "Event dispatch"], "\n",
      ['li', "Event handling"], "\n",
      ['li', "Effect handling"], "\n",
      ['li', "Query"], "\n",
      ['li', "View (handled by Reagent)"], "\n",
      ['li', "DOM (handled by Mithril)"]], "\n",
    ['hr'], "\n",
    ['p',
      "An ", ['em', "event"], " is sent when something happens - the user clicks a button, or a websocket receives a new message.\n",
      "(Similarly to a Reagent component, it's an array containing the ID – a function in case of Reagent – followed by arguments, if needed.)"], "\n",
    ['p',
      "Then, a ", ['em', "context"], " dict is created; it's directed through a chain of ", ['em', "interceptors"], ", at the end of which an ", ['em', "event handler"], " is placed;\n",
      " then the chain is followed backwards, ending up with a final version of the event context."], "\n",
    ['p', "The true result of handling an event is an ", ['em', "effects"], " dict residing within the context; it contains the set of effects that need to be evoked as the consequence."], "\n",
    ['p',
      "After this, a Mithril redraw is typically triggered; Reagent recalculates its components, which query ", ['em', "subscriptions"], " – Reagent atoms (or cursors, more specifically),\n",
      " that are calculated from the current app state: the ", ['code', 'rf.appDb'], " RAtom value (either directly or via other subscriptions).\n",
      "Same as for the effects, a subscription is an array containing its ID followed by arguments, if needed."], "\n",
    ['p', "Finally, the values are provided to views (Reagent components), which – in case these values changed – get recalculated, and Mithril propagates these changes to the DOM."], "\n",
    ['p', "As per the famous React formula, ", ['code', "v = f(s)"], ": view is a function of the app state."], "\n",
    ['p', "(", ['strong', "Note:"], " all of these parts are only connected at runtime by the framework, allowing you to define, use and test them independently of each other)"], "\n"];

let SubscriptionsAndDbEvents = () =>
  ['<>', "\n\n",
    ['h2', {id: 'subscriptions-and-db-events'}, "Subscriptions and DB events"], "\n",
    ['p', "The backbone of the data loop, as well as the most basic interaction, is handling of the app state (app-db); let's take a look at those."], "\n",
    ['p',
      "While you ", ['em', "can"], " work with the state RAtom directly, it's much better to use means of the framework itself: subscriptions and events.\n",
      "To register a data-changing event, use ", ['code', "rf.regEventDb()"], ":"], "\n",
    [Example, '_reg-event-db'], "\n",
    ['p',
      "As you can tell, it accepts two arguments: the event ID (used for dispatching handlers) and the handler function (which in turn accepts app-db and the event).\n",
      "(There's also a third, optional argument, but we can ignore it for the time being.)"], "\n"
    ['p', "Normally, events are invoked asynchronously, so using ", ['code', "rf.dispatchSync()"], " is done quite rarely (when you actually know that you need it)."], "\n",
    ['p', "(", ['strong', "Note:"], " do ", ['em', "not"], " mutate the DB dict or values within it; doing so ", ['em', "will"], " mess up change detection)"], "\n",
    ['hr'], "\n",
    ['p', "To query this app-db value, subscriptions are registered using ", ['code', "rf.regSub()"], ":"], "\n",
    [Example, '_reg-sub'], "\n",
    ['p', "The API is pretty much the same as for DB events: we pass query ID (used for dispatching), as well as the handler function (which accepts app-db and the query)."], "\n",
    ['p',
      "These are ", ['em', "extractors"], ": subscriptions which give direct access to values from app-db.\n",
      "It's often not even necessary to define query functions: just use ", ['code', "getIn"], " instead (it accepts the same arguments: dict followed by a path to follow)."], "\n",
    ['hr'], "\n",
    ['p',
      "Other than extractors, there's also ", ['em', "computation"], " subscriptions; they use other subscriptions as inputs, in place of app-db.\n",
      "To register such a subscription, you need to provide additional argument(s) to ", ['code', "rf.regSub()"], " ", ['em', "after the query ID"], ";\n",
      " it's either a function (accepting the query and returning a single subscription, or an array or dict thereof),\n",
      " or a sequence of ", ['code', "'<-'"], " keywords each followed by a query literal (which is equivalent to a single subscription or an array thereof):"], "\n",
    [Example, '_reg-sub2'], "\n",
    ['p', "Both events and subscriptions are pure functions (no side-effects, no external inputs) and exist independently of each other (except for dependency subscriptions)."], "\n",
    ['hr'], "\n",
    ['p', "With just this, you already have the minimum basis of using re-frame: use subscriptions to access app state (i.e. in a Reagent component), and invoke events to change it."], "\n"];

let FxEventsAndEffects = () =>
  ['<>', "\n\n",
    ['h2', {id: 'fx-events-and-effects'}, "FX events and effects"], "\n",
    ['p',
      "Naturally, there's things your app may need to do beyond mere state manipulation; things such as sending network requests, using browser API, or scheduling actions.\n",
      "In other words, ", ['em', "invoking side-effects"], "."], "\n",
    ['p',
      "To register such an event, ", ['code', "rf.regEventFx()"], " can be used. It works similarly to ", ['code', "rf.regEventDb()"], ",\n",
      " except the handler function has a somewhat more complex API: instead of app-db, it accepts a dict of ", ['em', "coeffects"], ",\n",
      " and the returned value is similarly a dict of ", ['em', "effects"], " – each key matches an existing effect, and the corresponding value is an argument."], "\n",
    ['p',
      "Aside from effects defined by you, there's a few predefined ones; one of them is the ", ['code', "db"], " effect which accepts new app state as its value;\n",
      " similarly, the coeffects dict contains current app state in its ", ['code', "db"], " key.\n",
      "And yes, ", ['code', "rf.regEventDb()"], " is effectively a wrapper for ", ['code', "rf.regEventFx()"], " with simplified API."], "\n",
    [Example, '_reg-event-fx'], "\n",
    ['hr'], "\n",
    ['p', "As for the effects themselves, they're impure functions (with side-effects), which accept a single argument; they can be registered using ", ['code', "rf.regFx()"], ":"], "\n",
    [Example, '_reg-fx'], "\n",
    ['p', "(", ['strong', "Note:"], " other DB and FX events, there are CTX events which manipulate event context directly; they rarely come up in regular code, however.)"], "\n"];

let CoeffectsAndInterceptors = () =>
  ['<>', "\n\n",
    ['h2', {id: 'coeffects-and-interceptors'}, "Coeffects and interceptors"], "\n",
    ['p',
      "In the DB events section I've mentioned that ", ['code', "rf.regEvents*"], " API accepts an additional, optional argument.\n",
      "This argument (similarly to ", ['code', "rf.regSub()"], " placed ", ['em', "after the event ID"], ") is a list of ", ['em', "interceptors"], "."], "\n",
    ['p',
      "Interceptors are added to the event pre/post-processing chain, and their main purpose is operating the event context.\n",
      "For instance, they're used for populating the coeffects dict passed into FX event handlers;\n",
      " such interceptors are registered using ", ['code', "rf.regCofx()"], ", and injected using ", ['code', "rf.injectCofx()"], ":"], "\n",
    [Example, '_reg-cofx'], "\n",
    ['hr'], "\n",
    ['p',
      "An interceptor is a simple dict of three keys: ", ['code', "id"], " (used for debugging), ", ['code', "before"], " and ", ['code', "after"], ";\n",
      " the latter two are functions called on the context object before and after event handling (accepting and returning a context):"], "\n",
    [Example, '_to-interceptor'], "\n",
    ['p', "So, the event handling is done the following way:"], "\n",
    ['ol',
      ['li', "An initial context is formed; its coeffects dict contains app state and the event itself"], "\n",
      ['li', "The interceptors are walked ", ['em', "left-to-right"], ", each applying ", ['code', ".before()"], " to the context"], "\n",
      ['li', "The event handler is applied to the context, producing a new context (with effects)"], "\n",
      ['li', "The interceptors are walked ", ['em', "right-to-left"], ", each applying ", ['code', ".after()"], " to the context"], "\n",
      ['li', "The effects dict of resulting context is then used for effects handling"]], "\n",
    ['hr'], "\n",
    ['p', ['code', "mreframe/re-frame"], " includes a few builtin interceptors/interceptor generators which cover main patterns of their usage:"], "\n",
    [Example, '_interceptors'], "\n"];

let LiveDemo = () =>
  ['<>', "\n\n",
    ['h2', {id: 'live-demo'}, "Live demo"], "\n",
    ['p', "Here's a (slightly modified) version of the ", [Href, "https://github.com/day8/re-frame/blob/master/examples/simple/src/simple/core.cljs", "original live demo"]], "\n",
    [Example, 'demo'], "\n"];


let App = () =>
  ['<>',
    [Nav], "\n\n",
    ['main', "\n\n",
      [Header],
      [TheDataLoop],
      [SubscriptionsAndDbEvents],
      [FxEventsAndEffects],
      [CoeffectsAndInterceptors],
      [LiveDemo]]];


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
          ['title', "mreframe/re-frame: Build web apps, in JavaScript, leveraging Mithril."], "\n  ",
          ['link', {rel: 'stylesheet', href: "tutorial/style.css"}], "\n  ",
          ['script', {src: "dist/mreframe.js"}], "\n  ",
          ['script', {src: "tutorial/re-frame.examples.js"}], m.trust(" <!-- example sources & pre-generated code highlights -->\n  "),
          ['script', {src: "tutorial/re-frame.js"}], m.trust(" <!-- SPA script -->\n")],
        ['body', "\n",
          [App], "\n"]], "\n"];
  render(r.asElement([Webpage]), {strict: true}).then(html =>
    fs.writeFileSync("re-frame.html", html));
}
