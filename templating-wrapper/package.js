Package.describe({
  name: 'nathantreid:templating-wrapper',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'Wrapper package to bring in Template stuff without build plugin conflicts',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/nathantreid/blaze-modules',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.1');
  api.use('templating@1.3.2');
});
