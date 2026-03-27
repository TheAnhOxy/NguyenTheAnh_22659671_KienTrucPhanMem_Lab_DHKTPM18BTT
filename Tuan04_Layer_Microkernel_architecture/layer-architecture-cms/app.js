const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Layer CMS API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 760px; margin: 40px auto; line-height: 1.6; }
          code { background: #f3f3f3; padding: 2px 6px; border-radius: 4px; }
          pre { background: #f7f7f7; padding: 12px; border-radius: 6px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <h1>Layer Architecture CMS</h1>
        <p>Server đang chạy thành công.</p>
      </body>
    </html>
  `);
});

require("./controllers/postController")(app);

app.listen(3000, () => {
  console.log("🚀 Server chạy tại http://localhost:3000");
});
