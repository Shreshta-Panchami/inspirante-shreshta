const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  venue: String,
  capacity: Number
});

module.exports = mongoose.model("Event", eventSchema);