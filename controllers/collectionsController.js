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
module.exports.getByIdCollection = async function (req, res) {
  try {
    const collection = await Collection.find({
      _id: req.params.idCollection,
    });
    res.status(200).json(collection);
  } catch (e) {
    console.log("error");
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
        theme: !theme && "default",
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

module.exports.update = async function (req, res) {
  try {
    const { nameCollection, description, theme, imageSrc, idCollection } =
      req.body;
    await Collection.updateOne(
      { _id: idCollection },
      { $set: { nameCollection, description, theme, imageSrc } }
    );
    res.status(200).json({ message: "Collection updated" });
  } catch (error) {
    console.log("error.mesage");
  }
};
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
