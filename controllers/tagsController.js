const Tag = require("../models/Tag");
const Item = require("../models/Item");

module.exports.getAll = async function (req, res) {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (e) {
    res.status(400).json({ message: "Error. Try one more time please" });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { value } = req.body;
    const { idItem } = req.params;
    const item = await Item.find({ _id: idItem });
    await Item.findOneAndUpdate({ _id: idItem }, { $pull: { tags: value } });
    const tag = await Tag.findOne({
      value: new RegExp("^" + value + "$", "i"),
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
    res.status(200).json({ message: "Tag deleted" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports.getByItemId = async (req, res) => {
  try {
    const { idItem } = req.params;
    const item = await Item.find({
      _id: idItem,
    });
    console.log(item[0].tags);
    res.status(200).json(item[0].tags);
  } catch (e) {
    console.log(e.message);
  }
};
