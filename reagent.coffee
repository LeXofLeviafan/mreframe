mount = require 'mithril/mount'
redraw = require 'mithril/redraw'
hyperscript = require 'mithril/hyperscript'

module.exports = reagent = require './src/reagent'

reagent._init {redraw, hyperscript, mount}
