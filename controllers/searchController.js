const Item = require("../models/Item");
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
