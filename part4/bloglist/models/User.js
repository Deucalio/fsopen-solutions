const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: String,
  name: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }],
});

module.exports = mongoose.model("User", userSchema);
