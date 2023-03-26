const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsController = require("../bloglist/controllers/blogsController");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.get("/api/blogs", blogsController.getAllBlogs);
app.post("/api/blogs", blogsController.postABlog);
app.post("/api/users", blogsController.createANewUser);
app.put("/api/blogs/:id", blogsController.updateLikes);
app.delete("/api/blogs/:id", blogsController.deleteABlog);

app.listen(3001, () => {
  console.log(`running on port ${3001}`);
});

module.exports = app;
