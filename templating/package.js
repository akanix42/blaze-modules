Package.describe({
  summary: "Allows templates to be defined in .html files",
  name: 'nathantreid:templating',
  version: '0.0.1'
  // last MDG version: '1.1.7-rc.12'
});

// Today, this package is closely intertwined with Handlebars, meaning
// that other templating systems will need to duplicate this logic. In
// the future, perhaps we should have the concept of a template system
// registry and a default templating system, ideally per-package.

Package.registerBuildPlugin({
  name: "compileTemplatesBatch",
  // minifier-js is a weak dependency of spacebars-compiler; adding it here
  // ensures that the output is minified.  (Having it as a weak dependency means
  // that we don't ship uglify etc with built apps just because
  // boilerplate-generator uses spacebars-compiler.)
  // XXX maybe uglify should be applied by this plugin instead of via magic
  // weak dependency.
  use: [
    'ecmascript',
    'nathantreid:caching-html-compiler@0.0.1',
    'nathantreid:templating-tools@0.0.1'
  ],
  sources: [
    'plugin/compile-templates.js'
  ]
});

// This onUse describes the *runtime* implications of using this package.
Package.onUse(function (api) {
  // XXX would like to do the following only when the first html file
  // is encountered

  api.addFiles('templating.js', 'client');
  api.export('Template', 'client');

  api.use('underscore'); // only the subset in packages/blaze/microscore.js

  api.use('isobuild:compiler-plugin@1.0.0');

  // html_scanner.js emits client code that calls Meteor.startup and
  // Blaze, so anybody using templating (eg apps) need to implicitly use
  // 'meteor' and 'blaze'.
  api.use(['blaze', 'spacebars']);
  api.imply(['meteor', 'blaze', 'spacebars'], 'client');

  api.addFiles(['dynamic.html', 'dynamic.js'], 'client');
});
