mount = require 'mithril/mount'
redraw = require 'mithril/redraw'
hyperscript = require 'mithril/hyperscript'
util = require './util'
atom = require './atom'
reagent = require './reagent'
{_init, inNamespace: ns} = reFrame = require './re-frame'

exports = {
  util, atom, reagent, reFrame, _init
  inNamespace: (namespace) => {util, atom, reagent, _init, reFrame: ns namespace}
}
module.exports = exports # preventing removal by tree-shaking
