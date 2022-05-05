const { cloudinary } = require("../utils/cloudinary");
const { validationResult } = require("express-validator");
const Collection = require("../models/Collection");

module.exports.getAll = function (req, res) {};
module.exports.getById = async function (req, res) {
  try {
    const collections = await Collection.find({
      userId: req.params.id,
    });
    res.status(200).json(collections);
  } catch (e) {
    console.log(e.message);
  }
};
module.exports.create = async (req, res) => {
  try {
    const { nameCollection, theme, description, imageSrc, userId, additional } =
      req.body;
    const possibleCollection = await Collection.findOne({
      nameCollection: new RegExp("^" + nameCollection + "$", "i"),
      userId: new RegExp("^" + userId + "$", "i"),
    });
    if (possibleCollection) {
      return res
        .status(409)
        .json({ message: "User with this email has already exist" });
    } else {
      const collection = await new Collection({
        nameCollection,
        description,
        userId,
        theme,
        imageSrc,
        additional,
      });
      await collection.save();

      return res.status(200).json({ message: "Collection created" });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports.update = async function (req, res) {};
module.exports.delete = async function (req, res) {
  try {
    await Collection.deleteOne({
      _id: req.params.idCollection,
    });
    res.status(200).json({ message: "Collection deleted" });
  } catch (e) {
    console.log(e.message);
  }
};
