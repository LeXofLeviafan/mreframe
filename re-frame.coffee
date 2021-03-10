mount = require 'mithril/mount'
redraw = require 'mithril/redraw'
hyperscript = require 'mithril/hyperscript'

module.exports = reFrame = require './src/re-frame'

reFrame._init {redraw, hyperscript, mount}
