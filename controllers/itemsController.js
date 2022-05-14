const { validationResult } = require("express-validator");
const { findOne } = require("../models/Item");
const Item = require("../models/Item");
const Tag = require("../models/Tag");

module.exports.getAll = async function (req, res) {};
module.exports.getByIdItem = async function (req, res) {
  try {
    const { idItem } = req.params;
    const item = await Item.findOne({
      _id: idItem,
    });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({message: e.message});
  }
};
module.exports.getByIdCollection = async function (req, res) {
  try {
    const { idCollection } = req.params;
    const items = await Item.find({
      idCollection: idCollection,
    });
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({message: e.message});
  }
};
module.exports.create = async function (req, res) {
  try {
    const { nameItem, tags } = req.body;

    const possibleItem = await Item.findOne({
      nameItem: new RegExp("^" + nameItem + "$", "i"),
    });
    if (possibleItem) {
      return res
        .status(409)
        .json({ message: "Item with this name has already exist" });
    } else {
      const item = await new Item(req.body);
      await item.save();

      tags.forEach(async (tag) => {
        const possibleTag = await Tag.findOne({
          value: new RegExp("^" + tag.trim() + "$", "i"),
        });
        if (!possibleTag) {
          const tagModel = await new Tag({
            value: tag.trim(),
            items: [item._id],
          });
          await tagModel.save();
        } else {
          await Tag.findOneAndUpdate(
            { value: new RegExp("^" + tag.trim() + "$", "i") },
            { $push: { items: item._id } }
          );
        }
      });

      return res.status(200).json({ message: "Item created" });
    }
  } catch (e) {
    res.status(400).json({message: e.message});
  }
};
module.exports.update = async function (req, res) {
  try {
    const { idItem } = req.params;
    const { tags } = req.body;
    const item = await Item.findOne({
      _id: idItem,
    });
    await Item.updateOne({ _id: idItem }, { $set: { ...req.body } });
    for (const tag of tags) {
      const possibleTag = await Tag.findOne({
        value: new RegExp("^" + tag.trim() + "$", "i"),
      });
      if (!possibleTag) {
        const tagModel = await new Tag({
          value: tag.trim(),
          items: item._id,
        });
        await tagModel.save();
      } else {
        await Tag.findOneAndUpdate(
          { value: new RegExp("^" + tag.trim() + "$", "i") },
          { $addToSet: { items: item._id } }
        );
      }
    }
    res.status(200).json({ message: "Item updated" });
  } catch (e) {
    res.status(400).json({message: e.message});
  }
};
module.exports.delete = async function (req, res) {
  try {
    const idItem = req.params.idItem;

    const item = await Item.find({
      _id: idItem,
    });
    item[0].tags.forEach(async (tagValue) => {
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
          { $pull: { items: item[0]._id } }
        );
      }
    });
    await Item.deleteOne({
      _id: idItem,
    });

    res.status(200).json({ message: "Item successfull deleted" });
  } catch (e) {
    res.status(400).json({message: e.message});
  }
};
module.exports.setLike = async function (req, res) {
  try {
    const { idItem } = req.params;
    const { userId } = req.body;

    const item = await Item.findOne({ _id: idItem });
    if (item.likes.includes(userId)) {
      await Item.findOneAndUpdate(
        { _id: idItem },
        { $pull: { likes: userId } }
      );
    } else {
      await Item.findOneAndUpdate(
        { _id: idItem },
        { $push: { likes: userId } }
      );
    }
    res.status(200).json({ message: "Likes updated" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
