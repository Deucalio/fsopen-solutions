const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  name: {type: String, minLength: 3},
  number: String,
});
module.exports = mongoose.model("People", peopleSchema);
