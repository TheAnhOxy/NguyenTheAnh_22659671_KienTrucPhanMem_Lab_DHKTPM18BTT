const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Theanh@123",
  database: "cms_plugin",
});

db.connect((err) => {
  if (err) console.error("DB Error:", err);
  else console.log("✅ MySQL connected");
});

module.exports = db;
