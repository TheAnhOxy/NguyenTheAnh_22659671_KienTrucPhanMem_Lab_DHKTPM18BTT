const Post = require("../models/post");
const repo = require("../repositories/postRepository");

module.exports = {
  createPost: async (title, content, author) => {
    if (!title || !content) {
      throw new Error("Thiếu dữ liệu");
    }

    const post = new Post(title, content, author);
    return await repo.save(post);
  },

  getPosts: async () => {
    return await repo.findAll();
  }
};