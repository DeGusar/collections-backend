const { cloudinary } = require("../utils/cloudinary");
const { validationResult } = require("express-validator");
const Collection = require("../models/Collection");
const Item = require("../models/Item");
const Tag = require("../models/Tag");
const { updateMany } = require("../models/Collection");

module.exports.getAll = async function (req, res) {
  try {
    const collectionsNew = await Collection.find()
      .sort({ createdAt: -1 })
      .limit(12);
    const collectionBig = [];
    for (const collection of collectionsNew) {
      const items = await Item.find({
        idCollection: collection._id.toString(),
      });
      collectionBig.push({ ...collection._doc, items: items.length });
    }
    const collectionsBiggest = collectionBig
      .sort((a, b) => b.items - a.items)
      .splice(0, 12);
    res.status(200).json({ collectionsNew, collectionsBiggest });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
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
    const {
      nameCollection,
      theme,
      description,
      imageSrc,
      userId,
      additional,
      author,
    } = req.body;
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
        author,
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
    console.log(error.mesage);
  }
};
module.exports.delete = async function (req, res) {
  const { idCollection } = req.params;
  try {
    await Collection.deleteOne({
      _id: idCollection,
    });
    const items = await Item.find({
      idCollection: idCollection,
    });
    for (const item of items) {
      await item.tags.forEach(async (tagValue) => {
        const tag = await Tag.findOne({
          value: new RegExp("^" + tagValue + "$", "i"),
        });
        if (tag.items.length === 1) {
          await Tag.deleteOne({
            _id: tag._id,
          });
        } else {
          await Tag.findOneAndUpdate(
            { _id: tag._id },
            { $pull: { items: item._id } }
          );
        }
      });
      await Item.deleteOne({
        idCollection: idCollection,
      });
    }

    res.status(200).json({ message: "Collection deleted" });
  } catch (e) {
    console.log(e.message);
  }
};
