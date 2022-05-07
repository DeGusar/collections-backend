const { validationResult } = require("express-validator");
const Item = require("../models/Item");
const Tag = require("../models/Tag");

module.exports.getAll = async function (req, res) {};
module.exports.getById = async function (req, res) {};
module.exports.create = async function (req, res) {
  try {
    const { nameItem, tags } = req.body;
    tags.forEach(async (tag) => {
      const possibleItem = await Tag.findOne({
        value: new RegExp("^" + tag + "$", "i"),
      });
      if (!possibleItem) {
        const tagModel = await new Tag({
          value: tag.trim(),
        });
        await tagModel.save();
      }
    });

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

      return res.status(200).json({ message: "Item created" });
    }
  } catch (e) {
    console.log("error");
  }
};
module.exports.update = async function (req, res) {};
module.exports.delete = async function (req, res) {};
