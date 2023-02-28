const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Blog = require("./models/blog");

const mongoUrl = process.env.mongoUrl;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  const blog = await Blog.create(req.body);
  const newBlog = await blog.save();
  res.json(newBlog);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
