const { Schema, model } = require("mongoose");

const collectionScheme = new Schema({
  nameCollection: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  theme: { type: String, default: "default" },
  imageSrc: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  additional: { type: Array, default: [] },
});

module.exports = model("collections", collectionScheme);
