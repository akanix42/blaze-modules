Package.describe({
  name: 'nathantreid:caching-html-compiler',
  version: '0.0.1',
  // last MDG version: '1.0.4-rc.12',
  // Brief, one-line summary of the package.
  summary: 'Pluggable class for compiling HTML into templates',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  git:'https://github.com/nathantreid/blaze-modules'
});

Package.onUse(function(api) {
  api.use([
    'underscore@1.0.6-rc.12',
    'caching-compiler@1.0.2-rc.12',
    'nathantreid:templating-tools@0.0.1',
    'ecmascript@0.4.1-rc.12',
    'babel-compiler@6.5.2-rc.7',

  ]);

  api.addFiles('caching-html-compiler.js', 'server');

  api.export("CachingHtmlCompiler", 'server');
});
