const db = require("../config/db");

module.exports = {
  name: "Analytics Plugin",

  run: (context) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO analytics (message) VALUES (?)",
        ["User accessed CMS"],
        (err) => {
          if (err) reject(err);
          else {
            context.analytics = "Saved to DB";
            resolve();
          }
        }
      );
    });
  }
};