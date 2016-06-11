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

component1.helpers({ component2 });
```

## Multiple components in one file

The first component in the file is exported as the default as well as by name; all other components and templates are exported by name:

components.html
``` handlebars
<component name="a_component">
1 2 3.
</component>

<component name="another_component">
1 2 3.
</component>
```

components.js
``` js
import theFirstComponent, { a_component, another_component }_ from './components.html';
// theFirstComponent === a_component // is true
```

All components below a given template or component in the same file are automatically added as helpers to that template:
components.html
``` handlebars
<component name="a_component">
 {{>another_component}}_
</component>

<component name="another_component">
1 2 3.
</component>
```

components.js
``` js
import a_component from './components.js';

// no helpers statement or import of the second component necessary, this code is automatically added by the compiler:
/*
a_component.helpers({ another_component });
*/
```
