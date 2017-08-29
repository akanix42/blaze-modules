Package.describe({
  name: 'nathantreid:caching-html-compiler',
  version: '0.0.7',
  // last MDG version: '1.0.6',
  // Brief, one-line summary of the package.
  summary: 'Pluggable class for compiling HTML into templates',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  git:'https://github.com/nathantreid/blaze-modules'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.1');
  api.use([
    'underscore@1.0.10',
    'caching-compiler@1.1.9',
    'nathantreid:templating-tools@0.0.5',
    'ecmascript@0.8.1',
    'babel-compiler@6.19.4',

  ]);

  api.addFiles('caching-html-compiler.js', 'server');

  api.export("CachingHtmlCompiler", 'server');
});
