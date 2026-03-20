const express = require("express");
const bodyParser = require("body-parser");
const pluginManager = require("./core/pluginManager");

const app = express();
app.use(bodyParser.json());

// load plugin từ DB
(async () => {
  await pluginManager.loadPlugins();
})();

// API test
app.get("/", async (req, res) => {
  let context = {
    content: "Hello Plugin CMS"
  };

  await pluginManager.execute(context);

  res.json(context);
});

app.listen(4000, () => {
  console.log("🚀 Microkernel CMS running at http://localhost:4000");
});