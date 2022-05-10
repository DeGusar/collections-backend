const Item = require("../models/Item");
module.exports.create = async function (req, res) {
  try {
    const { idItem } = req.params;
    console.log("yes");
    const commentData = req.body;
    await Item.findOneAndUpdate(
      { _id: idItem },
      { $push: { comments: commentData } }
    );
    res.status(200).json({ message: "comment created" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
