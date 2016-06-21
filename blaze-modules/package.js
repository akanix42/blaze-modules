Package.describe({
  name: 'nathantreid:blaze-modules',
  version: '0.0.4',
  // last MDG version: '1.0.2-rc.12',
  summary: 'Blaze Templates and Components - Compile HTML templates into reactive UI with Meteor Blaze',
  documentation: 'README.md',
  git:'https://github.com/nathantreid/blaze-modules'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3.1');

  api.imply([
    // A library for reactive user interfaces
    'blaze@2.1.8',

    // The following packages are basically empty shells that just exist to
    // satisfy code checking for the existence of a package. Rest assured that
    // they are not adding any bloat to your bundle.
    'spacebars@1.0.12', // XXX COMPAT WITH PACKAGES BUILT FOR 0.9.0

    // Compile .html files into Blaze reactive views
    'nathantreid:templating-components@0.0.4'
  ]);
});
