Package.describe({
  name: 'nathantreid:blaze-modules',
  version: '0.0.2',
  // last MDG version: '1.0.2-rc.12',
  summary: 'Blaze Templates and Components - Compile HTML templates into reactive UI with Meteor Blaze',
  documentation: 'README.md',
  git:'https://github.com/nathantreid/blaze-modules'
});

Package.onUse(function(api) {
  api.imply([
    // A library for reactive user interfaces
    'blaze@2.1.5-rc.12',

    // The following packages are basically empty shells that just exist to
    // satisfy code checking for the existence of a package. Rest assured that
    // they are not adding any bloat to your bundle.
    'ui@1.0.9-rc.12', // XXX COMPAT WITH PACKAGES BUILT FOR 0.9.0.
    'spacebars@1.0.9-rc.12', // XXX COMPAT WITH PACKAGES BUILT FOR 0.9.0

    // Compile .html files into Blaze reactive views
    'nathantreid:templating-components@0.0.2'
  ]);
});
