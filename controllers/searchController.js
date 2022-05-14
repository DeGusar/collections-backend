const Item = require("../models/Item");
const Tag = require("../models/Tag");
const Collection = require("../models/Collection");

module.exports.searchByQuery = async function (req, res) {
  try {
    const { query } = req.params;
    const collections = await Collection.find({
      $text: { $search: query },
    });
    const items = await Item.find({
      $text: { $search: query },
    });
    res.status(200).json({ collections, items });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports.searchByTags = async function (req, res) {
  try {
    const { tag } = req.params;
    const tags = await Tag.findOne({
      value: tag,
    });
    const items = [];
    for (const idItem of tags.items) {
      const item = await Item.findOne({
        _id: idItem._id,
      });
      items.push(item);
    }
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
