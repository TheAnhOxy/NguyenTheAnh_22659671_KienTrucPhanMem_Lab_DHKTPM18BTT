const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// load controller
require("./controllers/postController")(app);

app.listen(3000, () => {
  console.log("🚀 Server chạy tại http://localhost:3000");
});