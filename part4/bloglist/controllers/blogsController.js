const Blog = require("../models/blog");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
};

exports.postABlog = async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400);
  }
  const blog = await Blog.create({ ...req.body, likes: req.body.likes || 0 });
  const newBlog = await blog.save();
  res.status(201).json(newBlog);
};

exports.updateLikes = async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await Blog.findByIdAndUpdate(id, {
    likes: req.body.likes,
  });
  res.status(204).end();
};

exports.deleteABlog = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.status(204).end();
};
