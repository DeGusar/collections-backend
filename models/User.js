const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, default: "user" },
  status: { type: String, default: "Active" },
});

module.exports = model("User", User);
