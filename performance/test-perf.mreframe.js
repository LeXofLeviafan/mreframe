"use strict"

/* Based off of preact's perf tests, so including their MIT license */
/*
The MIT License (MIT)

Copyright (c) 2017 Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Note: this tests against the generated bundle in browsers, but it tests
// against `index.js` in Node. Please do keep that in mind while testing.
//
// Mithril.js and Benchmark.js are loaded globally via bundle in the browser, so
// this doesn't require a CommonJS sham polyfill.

// I add it globally just so it's visible in the tests.
/* global m, rootElem: true */

// set up browser env on before running tests
var isDOM = typeof window !== "undefined"
var Benchmark

if (isDOM) {
	Benchmark = window.Benchmark
	window.rootElem = null
	window.r = require('mreframe/reagent');
	r._init({...m, hyperscript: m});
} else {
	/* eslint-disable global-require */
	global.window = require('../node_modules/mithril/test-utils/browserMock')()
	global.document = window.document
	// We're benchmarking renders, not our throttling.
	global.requestAnimationFrame = function () {
		throw new Error("This should never be called.")
	}
	global.m = require('../node_modules/mithril/index.js')
	global.rootElem = null
	Benchmark = require('benchmark')
	global.r = require('../reagent');
	/* eslint-enable global-require */
}

function cycleRoot() {
	if (rootElem) document.body.removeChild(rootElem)
	document.body.appendChild(rootElem = document.createElement("div"))
}

// Initialize benchmark suite
Benchmark.options.async = true
Benchmark.options.initCount = 10
Benchmark.options.minSamples = 40

if (isDOM) {
	// Wait long enough for the browser to actually commit the DOM changes to
	// the screen before moving on to the next cycle, so things are at least
	// reasonably fresh each cycle.
	Benchmark.options.delay = 1 / 30 /* frames per second */
}

var suite = new Benchmark.Suite("Mithril.js perf", {
	onStart: function () {
		this.start = Date.now()
	},

	onCycle: function (e) {
		console.log(e.target.toString())
		cycleRoot()
	},

	onComplete: function () {
		console.log("Completed perf tests in " + (Date.now() - this.start) + "ms")
	},

	onError: function (e) {
		console.error(e)
	},
})
// eslint-disable-next-line no-unused-vars
var xsuite = {add: function(name) { console.log("skipping " + name) }}

suite.add("construct large vnode tree", {
  setup () {
    this.fields = []

    for (let i = 100;  i--;) {
      this.fields.push((i * 999).toString(36))
    }
  },

  fn () {
    r.asElement(['.foo.bar[data-foo=bar]', {p: 2},
                  ['header',
                    ['h1.asdf', "a ", "b", " c ", 0, " d"],
                    ['nav',
                      ['a[href=/foo]', "Foo"],
                      ['a[href=/bar]', "Bar"]]],
                  ['main',
                    ['form', {onSubmit () {}},
                      ['input[type=checkbox][checked]'],
                      ['input[type=checkbox]'],
                      ['fieldset',
                        ['<>', ...this.fields.map(field =>
                          ['label',
                            field, ":",
                            ['input', {placeholder: field}]])]],
                      ['button-bar',
                        ['button', {style: "width:10px; height:10px; border:1px solid #FFF;"},
                          "Normal CSS"],
                        ['button', {style: "top:0 ; right: 20"},
                          "Poor CSS"],
                        ['button', {style: "invalid-prop:1;padding:1px;font:12px/1.1 arial,sans-serif;", icon: true},
                          "Poorer CSS"],
                        ['button', {style: {margin: 0, padding: "10px", overflow: 'visible'}},
                          "Object CSS"]]]]]);
  },
});

/*suite.add("construct large nested tree", {
  setup () {
    let fields = [];

    for (let i = 100;  i--;)
      fields.push((i * 999).toString(36));

    let NestedButton = (attrs, ...children) =>
      ['button', attrs, ['<>', ...children]]; //m.censor(attrs)

    let NestedButtonBar = () =>
      ['.button-bar',
        [NestedButton, {style: "width:10px; height:10px; border:1px solid #FFF;"},
          "Normal CSS"],
        [NestedButton, {style: "top:0 ; right: 20"},
          "Poor CSS"],
        [NestedButton, {style: "invalid-prop:1;padding:1px;font:12px/1.1 arial,sans-serif;", icon: true},
          "Poorer CSS"],
        [NestedButton, {style: {margin: 0, padding: "10px", overflow: "visible"}},
          "Object CSS"]];

    let NestedForm = () =>
      ['form', {onSubmit () {}},
        ['input[type=checkbox][checked]'],
        ['input[type=checkbox]', {checked: false}],
        ['fieldset',
          ['label',
            ['input[type=radio][checked]']],
          ['label',
            ['input[type=radio]']]],
        ['fieldset',
          ...fields.map(field =>
            ['label',
              field, ":",
              ['input', {placeholder: field}]])],
        [NestedButtonBar]];

    let NestedMain = () => [NestedForm];

    let NestedHeader = () =>
      ['header',
        ['h1.asdf', "a ", "b", " c ", 0, " d"],
        ['nav', {class: ['foo', 'bar', 0 && 'baz']},
          ['a', {href: '/foo'}, "Foo"],
          ['a', {href: '/bar'}, "Bar"]]];

    this.NestedRoot = () =>
      ['div.foo.bar[data-foo=bar]', {p: 2},
        [NestedHeader],
        [NestedMain]];
  },

  fn () {
    r.asElement([this.NestedRoot]);
  },
});

suite.add("construct large nested tree (classes)", {
  setup () {
    let fields = [];

    for (let i = 100;  i--;)
      fields.push((i * 999).toString(36));

    let NestedButton = r.createClass({
      reagentRender: (attrs, ...children) =>
        ['button', attrs, ['<>', ...children]], //m.censor(attrs)
    });

    let NestedButtonBar = r.createClass({
      reagentRender: () =>
        ['.button-bar',
          [NestedButton, {style: "width:10px; height:10px; border:1px solid #FFF;"},
            "Normal CSS"],
          [NestedButton, {style: "top:0 ; right: 20"},
            "Poor CSS"],
          [NestedButton, {style: "invalid-prop:1;padding:1px;font:12px/1.1 arial,sans-serif;", icon: true},
            "Poorer CSS"],
          [NestedButton, {style: {margin: 0, padding: "10px", overflow: "visible"}},
            "Object CSS"]],
    });

    let NestedForm = r.createClass({
      reagentRender: () =>
        ['form', {onSubmit () {}},
          ['input[type=checkbox][checked]'],
          ['input[type=checkbox]', {checked: false}],
          ['fieldset',
            ['label',
              ['input[type=radio][checked]']],
            ['label',
              ['input[type=radio]']]],
          ['fieldset',
            ...fields.map(field =>
              ['label',
                field, ":",
                ['input', {placeholder: field}]])],
          [NestedButtonBar]],
    });

    let NestedMain = r.createClass({reagentRender: () => [NestedForm]});

    let NestedHeader = r.createClass({
      reagentRender: () =>
        ['header',
          ['h1.asdf', "a ", "b", " c ", 0, " d"],
          ['nav', {class: ['foo', 'bar', 0 && 'baz']},
            ['a', {href: '/foo'}, "Foo"],
            ['a', {href: '/bar'}, "Bar"]]],
    });

    this.NestedRoot = r.createClass({
      reagentRender: () =>
        ['div.foo.bar[data-foo=bar]', {p: 2},
          [NestedHeader],
          [NestedMain]],
    });
  },

  fn () {
    r.asElement([this.NestedRoot]);
  },
});*/

suite.add("rerender identical vnode", {
  setup () {
    this.cached = r.asElement(['.foo.bar[data-foo=bar]', {p: 2},
                                ['header',
                                  ['h1.asdf', "a ", "b", " c ", 0, " d"],
                                  ['nav',
                                    ['a', {href: '/foo'}, "Foo"],
                                    ['a', {href: '/bar'}, "Bar"]]],
                                ['main',
                                  ['form', {onSubmit () {}},
                                    ['input', {type: 'checkbox', checked: true}],
                                    ['input', {type: 'checkbox', checked: false}],
                                  ['fieldset',
                                    ['label',
                                      ['input', {type: 'radio', checked: true}]],
                                    ['label',
                                      ['input', {type: 'radio'}]]],
                                  ['button-bar',
                                    ['button', {style: "width:10px; height:10px; border:1px solid #FFF;"},
                                      "Normal CSS"],
                                    ['button', {style: "top:0 ; right: 20"},
                                      "Poor CSS"],
                                    ['button', {style: "invalid-prop:1;padding:1px;font:12px/1.1 arial,sans-serif;", icon: true},
                                      "Poorer CSS"],
                                    ['button', {style: {margin: 0, padding: "10px", overflow: 'visible'}},
                                      "Object CSS"]]]]]);
  },

  fn () {
    m.render(rootElem, this.cached);
  },
});

suite.add("rerender same tree", {
  setup () {
    this.app = () =>
      ['.foo.bar[data-foo=bar]', {p: 2},
        ['header',
          ['h1.asdf', "a ", "b", " c ", 0, " d"],
          ['nav',
            ['a', {href: "/foo"}, "Foo"],
            ['a', {href: "/bar"}, "Bar"]]],
        ['main',
          ['form', {onSubmit () {}},
            ['input', {type: 'checkbox', checked: true}],
            ['input', {type: 'checkbox', checked: false}],
            ['fieldset',
              ['label',
                ['input', {type: 'radio', checked: true}]],
              ['label',
                ['input', {type: 'radio'}]]],
            ['button-bar',
              ['button', {style: "width:10px; height:10px; border:1px solid #FFF;"},
                "Normal CSS"],
              ['button', {style: "top:0 ; right: 20"},
                "Poor CSS"],
              ['button', {style: "invalid-prop:1;padding:1px;font:12px/1.1 arial,sans-serif;", icon: true},
                "Poorer CSS"],
              ['button', {style: {margin: 0, padding: "10px", overflow: "visible"}},
                "Object CSS"]]]]]
  },

  fn () {
    m.render(rootElem, r.asElement([this.app]));
  },
});

suite.add("add large nested tree", {
  setup () {
    let fields = [];

    for (let i = 100;  i--;)
      fields.push((i * 999).toString(36))

    let NestedButton = (attrs, ...children) =>
      ['button', attrs, ['<>', ...children]]; // m.censor(attrs)

    let NestedButtonBar = () =>
      ['.button-bar',
        [NestedButton, {style: "width:10px; height:10px; border:1px solid #FFF;"},
          "Normal CSS"],
        [NestedButton, {style: "top:0 ; right: 20"},
          "Poor CSS"],
        [NestedButton, {style: "invalid-prop:1;padding:1px;font:12px/1.1 arial,sans-serif;", icon: true},
          "Poorer CSS"],
        [NestedButton, {style: {margin: 0, padding: "10px", overflow: "visible"}},
          "Object CSS"]];

    let NestedForm = () =>
      ['form', {onSubmit () {}},
        ['input[type=checkbox][checked]'],
        ['input[type=checkbox]', {checked: false}],
        ['fieldset',
          ['label',
            ['input[type=radio][checked]']],
          ['label',
            ['input[type=radio]']]],
        ['fieldset',
          ...fields.map(field =>
            ['label',
              field, ":",
              ['input', {placeholder: field}]])],
        [NestedButtonBar]];

    let NestedMain = () => [NestedForm];

    let NestedHeader = () =>
      ['header',
        ['h1.asdf', "a ", "b", " c ", 0, " d"],
        ['nav',
          ['a', {href: '/foo'}, "Foo"],
          ['a', {href: '/bar'}, "Bar"]]];

    this.NestedRoot = () =>
      ['div.foo.bar[data-foo=bar]', {p: 2},
        [NestedHeader],
        [NestedMain]];
  },

  fn () {
    m.render(rootElem, r.asElement([this.NestedRoot]));
  },
});

suite.add("add large nested tree [changes on redraw]", {
  setup () {
    let fields = [];

    for (let i = 100;  i--;)
      fields.push((i * 999).toString(36))

    let NestedButton = (attrs, ...children) =>
      ['button', attrs, ['<>', ...children]]; // m.censor(attrs)

    let NestedButtonBar = objectCss =>
      ['.button-bar',
        [NestedButton, {style: "width:10px; height:10px; border:1px solid #FFF;"},
          "Normal CSS"],
        [NestedButton, {style: "top:0 ; right: 20"},
          "Poor CSS"],
        [NestedButton, {style: "invalid-prop:1;padding:1px;font:12px/1.1 arial,sans-serif;", icon: true},
          "Poorer CSS"],
        [NestedButton, {style: objectCss},
          "Object CSS"]];

    let NestedField = (field, disabled) =>
      ['label',
        field, ":",
        ['input', {placeholder: field, disabled}]];

    let NestedForm = n =>
      ['form', {onSubmit () {}},
        ['input[type=checkbox][checked]'],
        ['input[type=checkbox]', {checked: false}],
        ['fieldset',
          ['label',
            ['input[type=radio][checked]']],
          ['label',
            ['input[type=radio]']]],
        ['fieldset', ...fields.map((field, i) =>
          r.with({key: i}, [NestedField, field, (n % fields.length === i)]))],
        [NestedButtonBar, {margin: 0, padding: "10px", overflow: "visible"}]];

    let NestedMain = n => [NestedForm, n];

    let NestedHeader = () =>
      ['header',
        ['h1.asdf', "a ", "b", " c ", 0, " d"],
        ['nav',
          ['a', {href: '/foo'}, "Foo"],
          ['a', {href: '/bar'}, "Bar"]]];

    this.counter = 0;
    this.NestedRoot = n =>
      ['div.foo.bar[data-foo=bar]', {p: 2},
        [NestedHeader, n],
        [NestedMain]];
  },

  fn () {
    m.render(rootElem, r.asElement([this.NestedRoot, this.counter]));
    this.counter++;
  },
});

suite.add("mutate styles/properties", {
  setup () {
    let get = (obj, i) => obj[i % obj.length];
    let classes = ["foo", "foo bar", "", "baz-bat", null, "fooga", null, null, undefined];
    let styles = [];
    let multivalue = ["0 1px", "0 0 1px 0", "0", "1px", "20px 10px", "7em 5px", "1px 0 5em 2px"];
    let stylekeys = [
      ['left',     c => (c % 3 === 0 ? c : c + "px")],
      ['top',      c => (c % 2 === 0 ? c : c + "px")],
      ['margin',   c => get(multivalue, c).replace("1px", c + "px")],
      ['padding',  c => get(multivalue, c)],
      ['position', c => (c % 5 === 0 ? null : c % 2 === 0 ? 'relative' : 'absolute')],
      ['display',  c => (c % 10 === 0 ? 'none' : c % 2 === 0 ? 'inline' : 'block')],
      ['color',    c => ("rgba(" + (c % 255) + ", " + (255 - c % 255) + ", " + (50 + c % 150) + ", " + (c % 50 / 50) + ")")],
      ['border',   c => (c % 5 === 0 ? "" : (c % 10) + "px " + (c % 2 === 0 ? 'dotted' : 'solid') + " " + stylekeys[6][1](c))],
    ];
    let i, j, style, conf;

    let counter = 0;
    for (let i = 0;  i < 1000;  i++) {
      let style = {};
      for (let j = 0;  j < i % 10;  j++) {
        let conf = get(stylekeys, ++counter);
        style[ conf[0] ] = conf[1](counter);
      }
      styles[i] = style;
    }

    this.count = 0;
    this.app = () => {
      let elems = ['<>'];
      for (let index = ++this.count, last = index + 300;  index < last;  index++)
        elems.push(['div.booga', {class: get(classes, index),  'data-index': index,  title: index.toString(36)},
                     ['input.dooga', {type: 'checkbox', checked: index % 3 === 0}],
                     ['input', {value: "test " + Math.floor(index / 4),  disabled: (index % 10 ? null : true)}],
                     ['div', {class: get(classes, index * 11)},
                       ['p', {style: get(styles, index)}, "p1"],
                       ['p', {style: get(styles, index + 1)}, "p2"],
                       ['p', {style: get(styles, index * 2)}, "p3"],
                       ['p.zooga', {style: get(styles, index * 3 + 1),  className: get(classes, index * 7)}, "p4"]]])
      return elems;
    };
  },

  fn () {
    m.render(rootElem, r.asElement([this.app, this.count]));
  },
});

suite.add("repeated add/removal", {
  setup () {
    let RepeatedButton = (attrs, ...children) =>
      ['button', attrs, ...children];

    let RepeatedButtonBar = () =>
      ['.button-bar',
        [RepeatedButton, {style: "width:10px; height:10px; border:1px solid #FFF;"},
          "Normal CSS"],
        [RepeatedButton, {style: "top:0 ; right: 20"},
          "Poor CSS"],
        [RepeatedButton, {style: "invalid-prop:1;padding:1px;font:12px/1.1 arial,sans-serif;",  icon: true},
          "Poorer CSS"],
        [RepeatedButton, {style: {margin: 0, padding: "10px", overflow: 'visible'}},
          "Object CSS"]];

    let RepeatedForm = () =>
      ['form', {onSubmit () {}},
        ['input', {type: 'checkbox', checked: true}],
        ['input', {type: 'checkbox', checked: false}],
        ['fieldset',
          ['label',
            ['input', {type: 'radio', checked: true}]],
          ['label',
            ['input', {type: 'radio'}]]],
        [RepeatedButtonBar]];

    let RepeatedMain = () => [RepeatedForm];

    let RepeatedHeader = () =>
      ['header',
        ['h1.asdf', "a ", "b", " c ", 0, " d"],
        ['nav',
          ['a', {href: '/foo'}, "Foo"],
          ['a', {href: '/bar'}, "Bar"]]];

    this.RepeatedRoot = () =>
      ['div.foo.bar[data-foo=bar]', {p: 2},
        [RepeatedHeader],
        [RepeatedMain]];
  },

  fn () {
    m.render(rootElem, [r.asElement([this.RepeatedRoot])]);
    m.render(rootElem, []);
  },
});

if (isDOM) {
	window.onload = function () {
		cycleRoot()
		suite.run()
	}
} else {
	cycleRoot()
	suite.run()
}
