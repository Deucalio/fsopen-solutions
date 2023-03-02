const Blog = require("../models/blog");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
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

exports.createANewUser = async (req, res) => {
  const { username, name, password } = req.body;
  console.log("a", username, name, password);
  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: "username or password must be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(password, saltRounds);

  try {
    const user = await User.create({
      username,
      name,
      password,
    });
    const savedUser = await user.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ Error: "username must be unique" });
    }
    res.status(500).send("Something went wrong");
  }

  res.status(201).json(savedUser);
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
