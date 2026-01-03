const fs = require("fs");
const path = require("path");
const Markdoc = require("@markdoc/markdoc");

function renderMarkdoc(fileName) {
  const filePath = path.join(process.cwd(), "content", fileName);
  const source = fs.readFileSync(filePath, "utf-8");

  const ast = Markdoc.parse(source);
  const content = Markdoc.transform(ast);

  return Markdoc.renderers.html(content);
}

module.exports = { renderMarkdoc };
