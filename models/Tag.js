const { Schema, model } = require("mongoose");

const tagScheme = new Schema({
  value: { type: String },
});

module.exports = model("tags", tagScheme);
