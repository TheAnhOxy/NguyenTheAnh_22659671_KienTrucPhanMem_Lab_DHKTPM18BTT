const service = require("../services/postService");

module.exports = (app) => {
  app.post("/posts", async (req, res) => {
    try {
      const { title, content, author } = req.body;
      const post = await service.createPost(title, content, author);
      res.json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get("/posts", async (req, res) => {
    const posts = await service.getPosts();
    res.json(posts);
  });
};