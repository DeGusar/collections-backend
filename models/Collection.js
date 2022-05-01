const { Schema, model } = require("mongoose");

const collectionScheme = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  name: { type: String, required: true },
  imageSrc: { type: String, default: "" },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

module.exports = model("collections", collectionScheme);
