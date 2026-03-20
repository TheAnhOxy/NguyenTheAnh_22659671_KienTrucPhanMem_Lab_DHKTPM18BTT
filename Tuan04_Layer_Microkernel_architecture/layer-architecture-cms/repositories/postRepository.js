const db = require("../config/db");

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM posts", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  save: (post) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)";
      db.query(sql, [post.title, post.content, post.author], (err, result) => {
        if (err) reject(err);
        else resolve({ id: result.insertId, ...post });
      });
    });
  }
};