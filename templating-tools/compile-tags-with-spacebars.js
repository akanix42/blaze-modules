TemplatingTools.compileTagsWithSpacebars = function compileTagsWithSpacebars(tags) {
  var handler = new SpacebarsTagCompiler();

  tags.forEach((tag) => {
    handler.addTagToResults(tag);
  });

  handler.addDefaultExport();
  handler.addComponentHelpers();
  return handler.getResults();
};

class SpacebarsTagCompiler {
  constructor() {
    this.results = {
      head: '',
      body: '',
      js: '',
      bodyAttrs: {}
    };
    this.tagsInOrder = [];
    this.componentsBelowTagMap = {};
    this.hasComponents = false;
    this.firstComponentName = null;
    this.templatesByName = {};
    this.componentsByName = {};
  }

  getResults() {
    return this.results;
  }

  recordTag(name) {
    this.tagsInOrder.push(name);
    this.componentsBelowTagMap[name] = [];
  }

  recordTemplate(name) {
    this.templatesByName[name] = 1;
    this.recordTag(name);
  }

  recordComponentBelow(name) {
    this.componentsByName[name] = 1;
    this.recordTag(name);
    if (!this.firstComponentName)
      this.firstComponentName = name;

    for (let i = 0; i < this.tagsInOrder.length - 1; i++)
      this.componentsBelowTagMap[this.tagsInOrder[i]].push(name);
  }

  addTagToResults(tag) {
    this.tag = tag;

    // do we have 1 or more attributes?
    const hasAttribs = ! _.isEmpty(this.tag.attribs);

    if (this.tag.tagName === "head") {
      if (hasAttribs) {
        this.throwCompileError("Attributes on <head> not supported");
      }

      this.results.head += this.tag.contents;
      return;
    }


    // <body> or <template>

    try {
      if (this.tag.tagName === "template") {
        const name = this.tag.attribs.name;

        if (! name) {
          this.throwCompileError("Template has no 'name' attribute");
        }

        if (SpacebarsCompiler.isReservedName(name)) {
          this.throwCompileError(`Template can't be named "${name}"`);
        }

        const renderFuncCode = SpacebarsCompiler.compile(this.tag.contents, {
          isTemplate: true,
          sourceName: `Template "${name}"`
        });

        this.results.js += TemplatingTools.generateTemplateJS(
          name, renderFuncCode);
        this.recordTemplate(name);
      } else if (this.tag.tagName === "component") {
        this.processComponent();
      } else if (this.tag.tagName === "body") {
        this.addBodyAttrs(this.tag.attribs);

        const renderFuncCode = SpacebarsCompiler.compile(this.tag.contents, {
          isBody: true,
          sourceName: "<body>"
        });

        // We may be one of many `<body>` tags.
        this.results.js += TemplatingTools.generateBodyJS(renderFuncCode);
      } else if (this.tag.tagName === "script") {
        this.results.js += `\n${this.tag.contents}\n`;
      } else {
        this.throwCompileError("Expected <template>, <component>, <script>, <head>, or <body> tag in template file", tagStartIndex);
      }
    } catch (e) {
      if (e.scanner) {
        // The error came from Spacebars
        this.throwCompileError(e.message, this.tag.contentsStartIndex + e.offset);
      } else {
        throw e;
      }
    }
  }

  processComponent(filePath) {
    const name = this.tag.attribs.name;

    if (!name) {
      this.throwCompileError("Component has no 'name' attribute");
    }

    if (SpacebarsCompiler.isReservedName(name)) {
      this.throwCompileError(`Component can't be named "${name}"`);
    }

    if (name in this.templatesByName) {
      this.throwCompileError(`A template named ("${name}") already exists in this file`);
    }

    if (name in this.componentsByName) {
      this.throwCompileError(`A component named ("${name}") already exists in this file`);
    }

    if (name.match(/^[^a-zA-Z_$]|[^0-9a-zA-Z_$]/)) {
      this.throwCompileError(`Component name "${name}" is not a valid JavaScript variable name.`);
    }

    const renderFuncCode = SpacebarsCompiler.compile(this.tag.contents, {
      isTemplate: true,
      sourceName: `Component "${name}"`
    });

    this.results.js += TemplatingTools.generateComponentJS(
      name, renderFuncCode);

    this.recordComponentBelow(name);
    this.hasComponents = true;
  }

  addBodyAttrs(attrs) {
    Object.keys(attrs).forEach((attr) => {
      const val = attrs[attr];

      // This check is for conflicting body attributes in the same file;
      // we check across multiple files in caching-html-compiler using the
      // attributes on results.bodyAttrs
      if (this.results.bodyAttrs.hasOwnProperty(attr) && this.results.bodyAttrs[attr] !== val) {
        this.throwCompileError(
          `<body> declarations have conflicting values for the '${attr}' attribute.`);
      }

      this.results.bodyAttrs[attr] = val;
    });
  }

  throwCompileError(message, overrideIndex) {
    TemplatingTools.throwCompileError(this.tag, message, overrideIndex);
  }

  addDefaultExport() {
    if (this.tagsInOrder.length) {
      this.results.js += `export default ${this.getTemplateOrComponentReference(this.tagsInOrder[0])};\n`;
    }
  }

  addComponentHelpers() {
    if (this.hasComponents) {
      const helpers = this.tagsInOrder
          .map((tagName)=>this.componentsBelowTagMap[tagName].length ?
            `${this.getTemplateOrComponentReference(tagName)}.helpers({ ${this.componentsBelowTagMap[tagName].join(',')} });`
            : '')
          .join('\n');
      if (helpers)
        this.results.js += `\n${helpers}\n`;
    }
  }

  getTemplateOrComponentReference(name) {
    return name in this.templatesByName ? `Template[${JSON.stringify(name)}]` : name;
  }
}
