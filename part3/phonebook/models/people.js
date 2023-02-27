const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
});
module.exports = mongoose.model("People", peopleSchema);
