Package.describe({
  name: 'nathantreid:caching-html-compiler',
  version: '0.0.6',
  // last MDG version: '1.0.6',
  // Brief, one-line summary of the package.
  summary: 'Pluggable class for compiling HTML into templates',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  git:'https://github.com/nathantreid/blaze-modules'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3.1');
  api.use([
    'underscore@1.0.9',
    'caching-compiler@1.0.5',
    'nathantreid:templating-tools@0.0.4',
    'ecmascript@0.4.5',
    'babel-compiler@6.8.2',

  ]);

  api.addFiles('caching-html-compiler.js', 'server');

  api.export("CachingHtmlCompiler", 'server');
});
