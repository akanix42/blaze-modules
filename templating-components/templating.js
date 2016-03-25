
// Packages and apps add templates on to this object.

/**
 * @summary The class for defining templates
 * @class
 * @instanceName Template.myTemplate
 */
Template = Blaze.Template;

var RESERVED_TEMPLATE_NAMES = "__proto__ name".split(" ");

Template.__checkComponentName = function (name) {
  if (name === 'body' || _.contains(RESERVED_TEMPLATE_NAMES, name)) {
    throw new Error("This component name is reserved: " + name);
  }
};
