# templating

Compiles Blaze templates and components defined in `.html` files. Also automatically includes Blaze on the client.

This build plugin parses all of the HTML files in your app and looks for four top-level tags:

- `<head>` - appended to the `head` section of your HTML
- `<body>` - appended to the `body` section of your HTML
- `<template name="templateName">` - compiled into a Blaze template, which can be included with `{{> templateName}}` or referenced in JS code with `Template.templateName`.
- `<component name="componentName">` - compiled into a Blaze template, which can be included with `{{> componentName}}` after being imported in JS code and passed into the current template or component via a helper. For example `import componentName from './componentName.html';` then `Template.templateName.helpers({ componentName });`

For more details, see the [Meteor docs about
templating](http://docs.meteor.com/#/full/livehtmltemplates) and the Blaze
[project page](https://www.meteor.com/blaze).
