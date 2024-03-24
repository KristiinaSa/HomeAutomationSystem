const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const loadTemplate = (templateName, data) => {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    `${templateName}.html`
  );
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);
  return template(data);
};

module.exports = loadTemplate;
