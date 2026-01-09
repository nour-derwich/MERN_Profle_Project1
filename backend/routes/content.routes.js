const express = require("express");
const { renderMarkdoc } = require("../utils/markdoc");

const router = express.Router();

router.get("/:page", (req, res, next) => {
  try {
    const { page } = req.params;
    const html = renderMarkdoc(`${page}.md`);

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${page}</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 0 20px;
            line-height: 1.6;
            background: #f9fafb;
            color: #111827;
          }
          h1, h2, h3 {
            margin-top: 1.5em;
          }
          code {
            background: #e5e7eb;
            padding: 2px 6px;
            border-radius: 4px;
          }
          pre {
            background: #111827;
            color: #f9fafb;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
