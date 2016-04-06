# blaze-modules

Enables ES 2015 imports for Blaze templates using the `<component>` tag.
Normal Blaze template are unaffected (you can use both in the same project).

## Installation
`meteor remove blaze-html-templates`
`meteor add nathantreid:blaze-modules`

## Example usage:

component1.html
``` handlebars
<component name="component1">
Testing {{> component2}}
</component>
```

component2.html
``` handlebars
<component name="component2">
1 2 3.
</component>
```

component1.js
``` js
import component1 from './component1.html';
import component2 from './component2.html';

component1.helpers{{ component2 });
```
