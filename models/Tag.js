const { Schema, model } = require("mongoose");

const tagScheme = new Schema({
  value: { type: String },
  items: { type: Array, default: [] },
});

module.exports = model("tags", tagScheme);
