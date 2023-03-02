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
app.get("/api/users", blogsController.getAllUsers);
app.post("/api/blogs", blogsController.postABlog);
app.post("/api/users", blogsController.createANewUser);
app.post("/api/login", blogsController.logUserIn)
app.put("/api/blogs/:id", blogsController.updateLikes);
app.delete("/api/blogs/:id", blogsController.deleteABlog);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
