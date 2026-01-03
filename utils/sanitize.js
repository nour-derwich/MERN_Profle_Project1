const createDOMPurify = require("isomorphic-dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

function sanitize(html) {
  return DOMPurify.sanitize(html);
}

module.exports = sanitize;