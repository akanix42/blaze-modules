TemplatingTools.generateTemplateJS =
function generateTemplateJS(name, renderFuncCode) {
  const nameLiteral = JSON.stringify(name);
  const templateDotNameLiteral = JSON.stringify(`Template.${name}`);

  let code = `
Template.__checkName(${nameLiteral});
Template[${nameLiteral}] = new Template(${templateDotNameLiteral}, ${renderFuncCode});
`;
  if (! name.match(/^[^a-zA-Z_$]|[^0-9a-zA-Z_$]/))
    code += `
const ${name} = Template[${nameLiteral}];
export { ${name} };
`;
  else if (process.env.BLAZE_DEBUG === '1')
    console.warn('Template ${name} cannot be exported because it is not a valid JavaScript variable name.');

  return code;
}

TemplatingTools.generateComponentJS =
function generateComponentJS(name, renderFuncCode) {
  const nameLiteral = JSON.stringify(name);
  const templateDotNameLiteral = JSON.stringify(`Template.${name}`);

  return `
Template.__checkComponentName(${nameLiteral});
const ${name} = new Template(${templateDotNameLiteral}, ${renderFuncCode});
export { ${name} };
`;
}

TemplatingTools.generateBodyJS =
function generateBodyJS(renderFuncCode) {
  return `
Template.body.addContent(${renderFuncCode});
Meteor.startup(Template.body.renderToDocument);
`;
}
