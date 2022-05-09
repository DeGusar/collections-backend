const { Schema, model } = require("mongoose");

const itemScheme = new Schema({
  nameItem: { type: String, required: true },
  idCollection: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  additional: { type: Array, default: [] },
  tags: { type: Array, default: [] },
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
});

module.exports = model("items", itemScheme);
