const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Blog = require("./models/blog");
const blogsController = require("./controllers/blogsController");

const mongoUrl = process.env.mongoUrl;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", blogsController.getAllBlogs);

app.post("/api/blogs", blogsController.postABlog);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
