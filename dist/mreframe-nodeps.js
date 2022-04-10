require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"mreframe/atom":[function(require,module,exports){
(function() {
  var Atom, compareAndSet, deref, multi, reset, resetVals, swap, swapVals, type;

  ({multi, type} = require('./util'));

  exports.deref = deref = multi(type);

  // these default definitions are clearly non-atomic but JS is single-threaded anyway
  exports.resetVals = resetVals = (multi(type)).default((self, value) => {
    return [deref(self), reset(self, value)];
  });

  exports.reset = reset = (multi(type)).default((self, value) => {
    return swap(self, () => {
      return value;
    });
  });

  exports.swapVals = swapVals = (multi(type)).default((self, f, ...args) => {
    return resetVals(self, f(deref(self), ...args));
  });

  exports.swap = swap = (multi(type)).default((...args) => {
    return (swapVals(...args))[1];
  });

  exports.compareAndSet = compareAndSet = multi(type).default((self, oldval, newval) => {
    return (oldval === deref(self)) && (reset(self, newval), true);
  });

  Atom = function(x1) {
    this.x = x1;
  };

  deref.when(Atom, (self) => {
    return self.x;
  });

  reset.when(Atom, (self, value) => {
    return self.x = value;
  });

  exports.atom = (x) => {
    return new Atom(x);
  };

}).call(this);

},{"./util":"mreframe/util"}],"mreframe/re-frame":[function(require,module,exports){
(function() {

  /*
    Context structure:
    {:coeffects {:event [:some-id :some-param]
                 :db    "original contents of app-db"}
     :effects   {:db    "new value for app-db>"
                 :dispatch  [:an-event-id :param1]}
     :queue     "a collection of further interceptors"
     :stack     "a collection of interceptors already walked"}
  */
  var _calcSignals, _calcSub, _clear, _ctxEvt, _dispatch, _effects, _eq_, _eventQueue, _fx, _getDb, _getX, _initReagent, _intercept, _invalidSignals, _pathKey, _replaceEvent, _restoreEvent, _signals, _subscriptionCache, appDb, assoc, assocCoeffect, assocEffect, assocIn, chain, chunks, clearEvent, coeffects, cursor, deref, dict, dispatch, dispatchSync, dissoc, effects, entries, eq, events, flatten, getCoeffect, getEffect, getIn, identity, isArray, isDict, isFn, keys, merge, ratom, regEventCtx, regEventFx, repr, reset, subscribe, subscriptions, swap, toInterceptor, update,
    splice = [].splice;

  ({eq, keys, dict, entries, isArray, isDict, isFn, getIn, merge, assoc, assocIn, dissoc, update, repr, identity, chunks, flatten, chain} = require('./util'));

  ({deref, reset, swap} = require('./atom'));

  ({
    _init: _initReagent,
    atom: ratom,
    cursor
  } = require('./reagent'));

  _eq_ = eq;

  exports._init = (opts) => {
    _initReagent(opts);
    _eq_ = (opts != null ? opts.eq : void 0) || _eq_;
    return void 0;
  };

  /* Application state atom */
  exports.appDb = appDb = ratom({});

  events = ratom({});

  effects = ratom({});

  coeffects = ratom({});

  subscriptions = ratom({});

  _subscriptionCache = new Map();

  /* Removes cached subscriptions (forcing to recalculate) */
  exports.clearSubscriptionCache = () => {
    return _subscriptionCache.clear();
  };

  _eventQueue = new Set();

  /* Cancels all scheduled events */
  exports.purgeEventQueue = () => {
    _eventQueue.forEach(clearTimeout);
    return _eventQueue.clear();
  };

  _clear = (atom) => {
    return (id) => {
      if (id) {
        swap(atom, dissoc, id);
      } else {
        reset(atom, {});
      }
      return void 0;
    };
  };

  _invalidSignals = () => {
    throw SyntaxError("Invalid subscription signals");
  };

  _signals = (signals) => {
    var queries;
    if (!signals.every(([k, q]) => {
      return (k === '<-') && isArray(q);
    })) {
      _invalidSignals();
    }
    queries = signals.map((kq) => {
      return kq[1];
    });
    if (queries.length === 1) {
      return () => {
        return subscribe(queries[0]);
      };
    } else {
      return () => {
        return queries.map(subscribe);
      };
    }
  };

  _calcSignals = (signals) => {
    if (isArray(signals)) {
      return signals.map(deref);
    } else if (!isDict(signals)) {
      return deref(signals);
    } else {
      return dict(entries(signals).map(([k, v]) => {
        return [k, deref(v)];
      }));
    }
  };

  /* Registers a subscription function to compute view data */
  exports.regSub = (id, ...signals) => {
    var computation, ref;
    ref = signals, [...signals] = ref, [computation] = splice.call(signals, -1);
    signals = signals.length === 0 ? () => {
      return appDb;
    } : signals.length !== 1 ? _signals(chunks(signals, 2)) : isFn(signals[0]) ? signals[0] : _invalidSignals();
    swap(subscriptions, assoc, id, [signals, computation]);
    return void 0;
  };

  _calcSub = (signals, computation) => {
    return (query) => {
      var input, input_, key, output, x;
      key = repr(query);
      input = _calcSignals(signals(query));
      if (_subscriptionCache.has(key)) {
        [input_, output] = _subscriptionCache.get(key);
        if (_eq_(input, input_)) {
          return output;
        }
      }
      x = computation(input, query);
      _subscriptionCache.set(key, [input, x]);
      return x;
    };
  };

  /* Returns an RCursor that derefs to subscription result (or cached value) */
  exports.subscribe = subscribe = (query) => {
    return cursor(_calcSub(...deref(subscriptions)[query[0]]), query);
  };

  /* Unregisters one or all subscription functions */
  exports.clearSub = _clear(subscriptions);

  /*
    Produces an interceptor (changed from varargs to options object).

    Interceptor structure:
    {:id      :something             ;; decorative only - can be ignored
     :before  (fn [context] ...)     ;; returns a possibly modified `context`
     :after   (fn [context] ...)}    ;; returns a possibly modified `context`
  */
  exports.toInterceptor = toInterceptor = (args) => {
    return {
      id: args != null ? args.id : void 0,
      before: (args != null ? args.before : void 0) || identity,
      after: (args != null ? args.after : void 0) || identity
    };
  };

  _getX = (x, key, notFound) => {
    if (!key) {
      return x;
    } else if (key in (x || {})) {
      return x[key];
    } else {
      return notFound;
    }
  };

  /* Returns context coeffects or specified coeffect */
  exports.getCoeffect = getCoeffect = (context, key, notFound) => {
    return _getX(context.coeffects, key, notFound);
  };

  /* Returns context effects or specified effect */
  exports.getEffect = getEffect = (context, key, notFound) => {
    return _getX(context.effects, key, notFound);
  };

  /* Produces a copy of the context with added coeffect */
  exports.assocCoeffect = assocCoeffect = (context, key, value) => {
    return assocIn(context, ['coeffects', key], value);
  };

  /* Produces a copy of the context with added effect */
  exports.assocEffect = assocEffect = (context, key, value) => {
    return assocIn(context, ['effects', key], value);
  };

  /* Produces a copy of the context with interceptors added to the queue */
  exports.enqueue = (context, interceptors) => {
    return update(context, 'queue', (xs) => {
      return [...xs, ...interceptors];
    });
  };

  _getDb = (context) => {
    return getEffect(context, 'db', getCoeffect(context, 'db'));
  };

  _pathKey = 're-frame-path/db-store';

  /* Produces an interceptor which switches out db for its subpath */
  exports.path = (...path) => {
    return toInterceptor({
      id: 'path',
      before: (context) => {
        var db, dbs;
        db = getCoeffect(context, 'db');
        dbs = [...(context[_pathKey] || []), db];
        return chain(context, [assoc, _pathKey, dbs], [assocCoeffect, 'db', getIn(db, flatten(path))]);
      },
      after: (context) => {
        var db, dbs, ref;
        ref = context[_pathKey], [...dbs] = ref, [db] = splice.call(dbs, -1);
        return chain(context, [assoc, _pathKey, dbs], [assocEffect, 'db', assocIn(db, flatten(path), _getDb(context))], [assocCoeffect, 'db', db]);
      }
    });
  };

  /* Produces an interceptor which updates db effect after the event handler */
  exports.enrich = (f) => {
    return toInterceptor({
      id: 'enrich',
      after: (context) => {
        return assocEffect(context, 'db', f(_getDb(context), getCoeffect(context, 'event')));
      }
    });
  };

  _replaceEvent = (f) => {
    return (context) => {
      var event;
      event = getCoeffect(context, 'event');
      return chain(context, [assocCoeffect, 'originalEvent', event], [assocCoeffect, 'event', f(event)]);
    };
  };

  _restoreEvent = (context) => {
    return assocCoeffect(context, 'event', getCoeffect(context, 'originalEvent'));
  };

  /* An interceptor switches out event for its 1st parameter */
  exports.unwrap = toInterceptor({
    id: 'unwrap',
    after: _restoreEvent,
    before: _replaceEvent((event) => {
      return event[1];
    })
  });

  /* An interceptor switches out event for its parameters */
  exports.trimV = toInterceptor({
    id: 'trim-v',
    after: _restoreEvent,
    before: _replaceEvent((event) => {
      return event.slice(1);
    })
  });

  /* Produces an interceptor which updates runs an action on db/event after the event handler */
  exports.after = (f) => {
    return toInterceptor({
      id: 'after',
      after: (context) => {
        f(_getDb(context), getCoeffect(context, 'event'));
        return context;
      }
    });
  };

  /* Produces an interceptor which recalculates db subpath if input subpaths changed */
  exports.onChanges = (f, outPath, ...inPaths) => {
    return toInterceptor({
      id: 'on-changes',
      after: (context) => {
        var db0, db1, ins, outs;
        db0 = getCoeffect(context, 'db');
        db1 = _getDb(context);
        [ins, outs] = [db0, db1].map((db) => {
          return inPaths.map((path) => {
            return getIn(db, path);
          });
        });
        if (!(outs.some((x, i) => {
          return x !== ins[i];
        }))) {
          return context;
        } else {
          return assocEffect(context, 'db', assocIn(db1, outPath, f(...outs)));
        }
      }
    });
  };

  /* Registers a coeffect handler (for use as an interceptor) */
  exports.regCofx = (id, handler) => {
    swap(coeffects, assoc, id, handler);
    return void 0;
  };

  /* Produces an interceptor which applies a coeffect handler before the event handler */
  exports.injectCofx = (key, arg) => {
    return toInterceptor({
      id: key,
      before: (context) => {
        return update(context, 'coeffects', (deref(coeffects))[key], arg);
      }
    });
  };

  /* Unregisters one or all coeffect handlers */
  exports.clearCofx = _clear(coeffects);

  /* Registers an event handler which calculates new application state from the old one */
  exports.regEventDb = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    return regEventFx(id, interceptors, (cofx, query) => {
      return {
        db: handler(cofx.db, query)
      };
    });
  };

  _ctxEvt = (handler) => {
    return (context) => {
      return merge(context, {
        effects: handler(getCoeffect(context), getCoeffect(context, 'event'))
      });
    };
  };

  /* Registers an event handler which calculates effects from coeffects */
  exports.regEventFx = regEventFx = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    return regEventCtx(id, interceptors, _ctxEvt(handler));
  };

  /* Registers an event handler which arbitrarily updates the context */
  exports.regEventCtx = regEventCtx = (id, interceptors, handler) => {
    if (!handler) {
      [interceptors, handler] = [[], interceptors];
    }
    swap(events, assoc, id, [flatten(interceptors.filter(identity)), handler]);
    return void 0;
  };

  /* Unregisters one or all event handlers */
  exports.clearEvent = clearEvent = _clear(events);

  _intercept = (context, hook) => { // every step is dynamic so no chains, folds or for-loops
    var x, xs;
    context = merge(context, {
      stack: [],
      queue: context.stack
    });
    while (context.queue.length > 0) {
      [x, ...xs] = context.queue;
      context = x[hook](merge(context, {
        queue: xs
      }));
      context = merge(context, {
        stack: [x, ...context.stack]
      });
    }
    return context;
  };

  /* Dispatches an event (running back and forth through interceptor chain & handler then actions effects) */
  exports.dispatchSync = dispatchSync = (event) => {
    var context, handler, stack;
    [stack, handler] = deref(events)[event[0]];
    context = {
      stack,
      coeffects: {
        event,
        db: deref(appDb)
      }
    };
    return chain(context, [_intercept, 'before'], handler, [_intercept, 'after'], getEffect, entries, _fx);
  };

  _dispatch = ({ms, dispatch}) => {
    var id;
    _eventQueue.add(id = setTimeout((() => {
      _eventQueue.delete(id);
      return dispatchSync(dispatch);
    }), ms));
    return id;
  };

  /* Schedules dispatching of an event */
  exports.dispatch = dispatch = (dispatch) => {
    return _dispatch({dispatch});
  };

  _fx = (fxs, fx = deref(effects)) => {
    return fxs.filter(identity).forEach(([k, v]) => {
      return (fx[k] || _effects[k])(v);
    });
  };

  _effects = { // builtin effects
    db: (value) => {
      return reset(appDb, value);
    },
    fx: _fx,
    dispatchLater: _dispatch,
    dispatch: (dispatch) => {
      return _dispatch({dispatch});
    }
  };

  /* Registers an effect handler (implementation of a side-effect) */
  exports.regFx = (id, handler) => {
    swap(effects, assoc, id, handler);
    return void 0;
  };

  /* Unregisters one or all effect handlers (excepting builtin ones) */
  exports.clearFx = _clear(effects);

  /* Convenience function (for JS); returns deref'ed result of a subscription */
  exports.dsub = (query) => {
    return deref(subscribe(query));
  };

  /* Convenience function (for fx); schedules dispatching an event (if present) with additional parameters */
  exports.disp = (evt, ...args) => {
    return evt && dispatch([...evt, ...args]);
  };

}).call(this);

},{"./atom":"mreframe/atom","./reagent":"mreframe/reagent","./util":"mreframe/util"}],"mreframe/reagent":[function(require,module,exports){
(function() {
  var None, RAtom, RCursor, _cursor, _eq_, _fnElement, _fragment_, _meta, _mithril_, _mount_, _redraw_, _renderCache, _vnode, argv, asElement, assoc, assocIn, atom, calcCssClass, children, classNames, createElement, deref, eq, getIn, identity, isArray, isDict, isFn, keys, merge, props, ratom, reset, second, stateAtom, swap, type;

  ({eq, type, isArray, isDict, isFn, keys, getIn, merge, assoc, assocIn, identity} = require('./util'));

  ({atom, deref, reset, swap} = require('./atom'));

  _mount_ = _redraw_ = _mithril_ = identity;

  _fragment_ = second = (a, b) => {
    return b;
  };

  _eq_ = eq;

  exports._init = (opts) => {
    _mithril_ = (opts != null ? opts.hyperscript : void 0) || _mithril_;
    _fragment_ = _mithril_.fragment || second;
    _redraw_ = (opts != null ? opts.redraw : void 0) || _redraw_;
    _mount_ = (opts != null ? opts.mount : void 0) || _mount_;
    _eq_ = (opts != null ? opts.eq : void 0) || _eq_;
    return void 0;
  };

  _vnode = atom(); // contains vnode of most recent component

  _renderCache = new Map();

  /* Reset function components cache. */
  exports.resetCache = () => {
    return _renderCache.clear();
  };

  _fnElement = (fcomponent) => {
    var component;
    if (!_renderCache.has(fcomponent)) {
      component = {
        oninit: (vnode) => {
          vnode.state._comp = component;
          vnode.state._atom = ratom();
          return void 0;
        },
        view: (vnode) => {
          var args, x;
          reset(_vnode, vnode);
          args = (argv(vnode)).slice(1);
          x = (vnode.state._view || fcomponent)(...args);
          return asElement(!isFn(x) ? x : (vnode.state._view = x, x(...args)));
        }
      };
      _renderCache.set(fcomponent, component);
    }
    return _renderCache.get(fcomponent);
  };

  _meta = (meta, args) => {
    if (isDict(args[0])) {
      return [merge(args[0], meta), ...args.slice(1)];
    } else {
      return [meta, ...args];
    }
  };

  /* Converts Hiccup forms into Mithril vnodes */
  exports.asElement = asElement = (form) => {
    var head, meta, tail;
    if (!isArray(form)) {
      return form;
    } else {
      [head, ...tail] = form;
      meta = form._meta || {};
      if (head === '>') {
        return createElement(tail[0], ...(_meta(meta, tail.slice(1))).map(asElement));
      } else if (head === '<>') {
        return _fragment_(meta, tail.map(asElement));
      } else if (type(head) === String) {
        return createElement(head, ...(_meta(meta, tail)).map(asElement));
      } else if (isFn(head)) {
        return createElement(_fnElement(head), merge(meta, {
          argv: form
        }));
      } else {
        return createElement(head, merge(meta, {
          argv: form
        }));
      }
    }
  };

  /* Mounts a Hiccup form to a DOM element */
  exports.render = (comp, container) => {
    return _mount_(container, {
      view: () => {
        return asElement(comp);
      }
    });
  };

  /* Adds metadata to the Hiccup form of a Reagent component or a fragment */
  exports.with = (meta, form) => {
    form = form.slice(0);
    form._meta = meta;
    return form;
  };

  /*
    Creates a class component based on the spec. (It's a valid Mithril component.)
    Only a subset of the original reagent functons is supported (mostly based on Mithril hooks):
    constructor, getInitialState, componentDidMount, componentDidUpdate,
    componentWillUnmount, shouldComponentUpdate, render, reagentRender (use symbols in Wisp).
    Also, beforeComponentUnmounts was added (see 'onbeforeremove' in Mithril).
    Instead of 'this', vnode is passed in calls.
  */
  exports.createClass = (spec) => {
    var call, component;
    call = (k, vnode, args) => {
      if (spec[k]) {
        reset(_vnode, vnode);
        return spec[k].apply(vnode, args || [vnode]);
      }
    };
    return component = {
      oninit: (vnode) => {
        vnode.state._comp = component;
        vnode.state._atom = ratom(call('getInitialState', vnode));
        return call('constructor', vnode, [vnode, props(vnode)]);
      },
      oncreate: (vnode) => {
        return call('componentDidMount', vnode);
      },
      onupdate: (vnode) => {
        return call('componentDidUpdate', vnode);
      },
      onremove: (vnode) => {
        return call('componentWillUnmount', vnode);
      },
      onbeforeupdate: (vnode) => {
        return call('shouldComponentUpdate', vnode);
      },
      onbeforeremove: (vnode) => {
        return call('beforeComponentUnmounts', vnode);
      },
      view: (vnode) => {
        if (spec.render) {
          return call('render', vnode);
        } else {
          return asElement(call('reagentRender', vnode, (argv(vnode)).slice(1)));
        }
      }
    };
  };

  RAtom = function(x1) {
    this.x = x1;
  };

  deref.when(RAtom, (self) => {
    return self.x;
  });

  reset.when(RAtom, (self, value) => {
    if (_eq_(value, self.x)) {
      return self.x;
    } else {
      self.x = value;
      _redraw_();
      return value;
    }
  });

  /* Produces an atom which causes redraws on update */
  exports.atom = ratom = (x) => {
    return new RAtom(x);
  };

  None = {};

  _cursor = (ratom) => {
    return (path, value = None) => {
      if (value === None) {
        return getIn(deref(ratom), path);
      } else {
        return swap(ratom, assocIn, path, value);
      }
    };
  };

  RCursor = function(src1, path1) {
    this.src = src1;
    this.path = path1;
  };

  deref.when(RCursor, (self) => {
    return self.src(self.path);
  });

  reset.when(RCursor, (self, value) => {
    var x;
    if (_eq_(value, (x = deref(self)))) {
      return x;
    } else {
      self.src(self.path, value);
      _redraw_();
      return value;
    }
  });

  /* Produces a cursor (sub-state atom) from a path and either an atom or a getter/setter function */
  exports.cursor = (src, path) => {
    return new RCursor((isFn(src) ? src : _cursor(src)), path);
  };

  /* Converts a Mithril component into a Reagent component */
  exports.adaptComponent = (c) => {
    return (...args) => {
      return ['>', c, ...args];
    };
  };

  /* Merges provided class definitions into a string (definitions can be strings, lists or dicts) */
  exports.classNames = classNames = (...classes) => {
    var cls;
    cls = classes.reduce(((o, x) => {
      if (!(isArray(x) || isDict(x))) {
        x = `${x}`.split(' ');
      }
      return merge(o, (isDict(x) ? x : merge(...x.map((k) => {
        return k && {
          [k]: k
        };
      }))));
    }), {});
    return (keys(cls)).map((k) => {
      return cls[k] && k;
    }).filter(identity).join(' ');
  };

  calcCssClass = (props) => {
    return ['class', 'className', 'classList'].reduce(((o, k) => {
      return assoc(o, k, o[k] && classNames(o[k]));
    }), props);
  };

  /* Invokes Mithril directly to produce a vnode (props are optional) */
  exports.createElement = createElement = (type, ...children) => {
    var props;
    [props, ...children] = isDict(children[0]) ? children : [{}, ...children];
    return _mithril_(type, calcCssClass(props), ...children);
  };

  /* Produces the vnode of current (most recent?) component */
  exports.currentComponent = () => {
    return deref(_vnode);
  };

  /* Returns children of the Mithril vnode */
  exports.children = children = (vnode) => {
    return vnode.children;
  };

  /* Returns props of the Mithril vnode */
  exports.props = props = (vnode) => {
    return vnode.attrs;
  };

  /* Produces the Hiccup form of the Reagent component from vnode */
  exports.argv = argv = (vnode) => {
    return (props(vnode)).argv;
  };

  /* Returns RAtom containing state of a Reagent component (from vnode) */
  exports.stateAtom = stateAtom = (vnode) => {
    return vnode.state._atom;
  };

  /* Returns state of a Reagent component (from vnode) */
  exports.state = (vnode) => {
    return deref(stateAtom(vnode));
  };

  /* Replaces state of a Reagent component (from vnode) */
  exports.replaceState = (vnode, newState) => {
    return reset(stateAtom(vnode), newState);
  };

  /* Partially updates state of a Reagent component (from vnode) */
  exports.setState = (vnode, newState) => {
    return swap(stateAtom(vnode), merge, newState);
  };

}).call(this);

},{"./atom":"mreframe/atom","./util":"mreframe/util"}],"mreframe/util":[function(require,module,exports){
(function() {
  var _dict, _entries, assoc, assocIn, entries, eq, eqArr, eqObj, flatten, getIn, identity, isArray, isDict, keys, merge, replacer, sorter, type, update, vals;

  exports.identity = identity = (x) => {
    return x;
  };

  exports.type = type = (x) => {
    if (x == null) {
      return x;
    } else {
      return x.__proto__.constructor;
    }
  };

  exports.keys = keys = (x) => {
    return Object.keys(x || {});
  };

  exports.vals = vals = (x) => {
    return Object.values(x || {});
  };

  _entries = Object.entries || ((o) => {
    return keys(o).map((k) => {
      return [k, o[k]];
    });
  });

  exports.entries = entries = (o) => {
    return _entries(o || {});
  };

  _dict = Object.fromEntries || ((kvs) => {
    return merge(...kvs.map(([k, v]) => {
      return {
        [k]: v
      };
    }));
  });

  exports.dict = (x) => {
    return _dict(x || []);
  };

  exports.isArray = isArray = Array.isArray;

  exports.isDict = isDict = (x) => {
    return (type(x)) === Object;
  };

  exports.isFn = (x) => {
    return (type(x)) === Function;
  };

  exports.merge = merge = (...os) => {
    return Object.assign({}, ...os);
  };

  exports.assoc = assoc = (o, k, v) => {
    return merge(o, {
      [k]: v
    });
  };

  exports.dissoc = (o, ...ks) => {
    o = merge(o);
    ks.forEach((k) => {
      return delete o[k];
    });
    return o;
  };

  exports.update = update = (o, k, f, ...args) => {
    return assoc(o, k, f(o != null ? o[k] : void 0, ...args));
  };

  exports.getIn = getIn = (o, path) => {
    return path.reduce(((x, k) => {
      return x != null ? x[k] : void 0;
    }), o);
  };

  exports.assocIn = assocIn = (o, path, v) => {
    if (path.length < 2) {
      return assoc(o, path[0], v);
    } else {
      return update(o, path[0], assocIn, path.slice(1), v);
    }
  };

  exports.updateIn = (o, path, f, ...args) => {
    return assocIn(o, path, f(getIn(o, path), ...args));
  };

  // dissocIn = (o, path, ...ks) => updateIn o, path, dissoc, ...ks
  exports.chunks = (xs, n) => {
    return Array.from({
      length: Math.ceil(xs.length / n)
    }, (_, i) => {
      return xs.slice(n * i, n * (i + 1));
    });
  };

  exports.flatten = flatten = (xs) => {
    if (!isArray(xs)) {
      return xs;
    } else {
      return xs.flatMap(flatten);
    }
  };

  exports.repr = (x) => {
    return JSON.stringify(x, replacer);
  };

  exports.eq = eq = (a, b) => {
    return a === b || (a !== a ? b !== b : isArray(a) ? (isArray(b)) && eqArr(a, b) : (isDict(a)) && (isDict(b)) && eqObj(a, b));
  };

  sorter = (o) => {
    return _dict((entries(o)).sort());
  };

  replacer = (_, v) => {
    if (type(v) === RegExp) {
      return `${v}`;
    } else if (!isDict(v)) {
      return v;
    } else {
      return sorter(v);
    }
  };

  eqArr = (xs, ys) => {
    return xs.length === ys.length && xs.every((x, i) => {
      return eq(x, ys[i]);
    });
  };

  eqObj = (a, b, aks = keys(a), bks = new Set(keys(b))) => {
    return aks.length === bks.size && aks.every((k) => {
      return bks.has(k);
    }) && aks.every((k) => {
      return eq(a[k], b[k]);
    });
  };

  exports.chain = (x, ...fs) => {
    return fs.map((f) => {
      if (isArray(f)) {
        return f;
      } else {
        return [f];
      }
    }).reduce(((x, f) => {
      return f[0](x, ...f.slice(1));
    }), x);
  };

  exports.multi = (dispatch = identity) => {
    var _default, _methods, self;
    _methods = new Map();
    _default = () => {
      throw TypeError("Invalid arguments");
    };
    return self = Object.assign(((...args) => {
      return ((_methods.get(dispatch(...args))) || _default)(...args);
    }), {
      when: (k, f) => {
        _methods.set(k, f);
        return self;
      },
      default: (f) => {
        _default = f;
        return self;
      }
    });
  };

}).call(this);

},{}],"mreframe":[function(require,module,exports){
(function() {
  var _init, atom, exports, reFrame, reagent, util;

  util = require('./util');

  atom = require('./atom');

  reagent = require('./reagent');

  ({_init} = reFrame = require('./re-frame'));

  exports = {util, atom, reagent, reFrame, _init};

  module.exports = exports; // preventing removal by tree-shaking

}).call(this);

},{"./atom":"mreframe/atom","./re-frame":"mreframe/re-frame","./reagent":"mreframe/reagent","./util":"mreframe/util"}]},{},[]);
