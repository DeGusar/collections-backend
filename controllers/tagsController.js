const Tag = require("../models/Tag");

module.exports.getAll = async function (req, res) {
  try {
    const tags = await Tag.find();
    console.log(tags);
    res.status(200).json(tags);
  } catch (e) {
    res.status(400).json({ message: "Error. Try one more time please" });
  }
};
