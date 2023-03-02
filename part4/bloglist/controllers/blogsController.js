const Blog = require("../models/blog");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

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

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  console.log("user", user);

  const blog = new Blog({
    ...req.body,
    likes: req.body.likes || 0,
  });
  await user.save();

  user.blogs.push(blog);
  user.save();
  blog.save();
  res.status(201).json(blog);
};

exports.createANewUser = async (req, res) => {
  const { username, name, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ error: "username must be unique" });
  }
  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: "username or password must be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(password, saltRounds);
  let savedUser = "";
  const user = await User.create({
    username,
    name,
    password: passwordHash,
  });
  savedUser = await user.save();

  res.status(201).json(savedUser);
};

exports.logUserIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcryptjs.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
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
