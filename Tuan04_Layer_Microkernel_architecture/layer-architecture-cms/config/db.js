const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sapassword",
  database: "cms_db"
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Lỗi kết nối DB:", err);
  } else {
    console.log("✅ Đã kết nối MySQL");
  }
});

module.exports = connection;