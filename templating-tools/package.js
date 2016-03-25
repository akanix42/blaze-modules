Package.describe({
  name: 'nathantreid:templating-tools',
  version: '0.0.1',
  // last MDG version: '1.0.2-rc.12',
  summary: 'Tools to scan HTML and compile tags when building a templating package',
  git:'https://github.com/nathantreid/blaze-modules',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use([
    'underscore@1.0.6-rc.12',
    'ecmascript@0.4.1-rc.12',
    'spacebars-compiler@1.0.9-rc.12',

    // minifier-js is a weak dependency of spacebars-compiler; adding it here
    // ensures that the output is minified.  (Having it as a weak dependency means
    // that we don't ship uglify etc with built apps just because
    // boilerplate-generator uses spacebars-compiler.)
    // XXX maybe uglify should be applied by this plugin instead of via magic
    // weak dependency.
    'minifier-js@1.1.9-rc.12'
  ]);

  api.addFiles([
    'templating-tools.js',
    'html-scanner.js',
    'compile-tags-with-spacebars.js',
    'throw-compile-error.js',
    'code-generation.js'
  ]);

  api.export('TemplatingTools');
});

Package.onTest(function(api) {
  api.use([
    'tinytest',
    'nathantreid:templating-tools',
    'ecmascript@0.4.1-rc.12'
  ]);

  api.addFiles('html-scanner-tests.js', 'server');
});
