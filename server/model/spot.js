const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema({
  latitude: { type: String },
  longitude: { type: String },
  imgsrc: { type: String }, // needs to be unique at some point
});

module.exports = mongoose.model("spot", spotSchema);