[fs, {dirname}, CoffeeScript] = ['fs', 'path', 'coffeescript'].map require

modules = ['util', 'atom', 'reagent', 're-frame']
deps = "mithril/mount,mithril/render,mithril/redraw,mithril/hyperscript"

option '-o', '--outfile [FILE]', "output filename ('.min' is added automatically when minifying)"
option '-m', '--minify', "minify the bundle"
option '-s', '--source', "source index file"
#option '-x', '--exclude [PACKAGES]', "list of packages to exclude (comma-separated)"
option '-x', '--expose [PACKAGES]', "list of packages to expose (comma-separated)"

build = (options) ->
  outfile = options.outfile or "dist/mreframe.js"
  outfile = outfile.replace(/\.js$/, ".min.js") if options.minify
  source = options.source or "."
  console.log outfile
  fs.mkdirSync dirname(outfile), recursive: on
  bundler = require('browserify')().require source, expose: 'mreframe'
  bundler.require "#{source}/#{s}", expose: "mreframe/#{s}" for s in (options.modules or [])
  bundler.require s, expose: s for s in options.expose?.split(',') or [] when s
  #bundler.external s for s in options.exclude?.split(',') or [] when s
  bundler.plugin 'tinyify' if options.minify
  bundler.bundle().on('error', console.error).pipe fs.createWriteStream outfile
  @

buildNodeps = (options) ->
  build {source: "./src", outfile: "dist/mreframe-nodeps.js", modules, ...options}

buildStandalone = (options) ->
  build {outfile: "dist/mreframe.js", modules, expose: deps, ...options}

task 'transpile', "transpile coffeescript files", ->
  for dir in ['.', './src', './examples']
    for s in fs.readdirSync(dir) when s.match /\.coffee$/
      src = "#{dir}/#{s}"
      console.log src
      code = fs.readFileSync src, 'utf-8'
      fs.writeFileSync src.replace(/\.coffee$/, ".js"), CoffeeScript.compile code
  @

task 'build', "build a standalone bundle", buildStandalone
task 'build:nodeps', "build without including mithril dependencies", buildNodeps
task 'build:all', "build all bundles (regular and minified)", ->
  for f in [buildStandalone, buildNodeps]
    f {}
    f minify: on

task 'clean', "clean build/transpilation output", ->
  require('rimraf').sync s for s in ["*.js", "src/*.js", "examples/*.js", "dist/"]
