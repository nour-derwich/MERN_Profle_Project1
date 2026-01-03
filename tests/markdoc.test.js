const { renderMarkdoc } = require("../utils/markdoc");
const fs = require("fs");
const path = require("path");

describe("Markdoc Utility", () => {
  it("should render HTML from Markdown", () => {
    const testFile = path.join(process.cwd(), "content", "about.md");

    // Make sure test content exists
    if (!fs.existsSync(testFile)) {
      fs.writeFileSync(testFile, "# Test Heading\nHello World!");
    }

    const html = renderMarkdoc("about.md");

    expect(html).toContain("<h1>Test Heading</h1>");
    expect(html).toContain("Hello World!");
  });
});
