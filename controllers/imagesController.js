const { cloudinary } = require("../utils/cloudinary");

module.exports.upload = async function (req, res) {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(
      JSON.parse(fileStr),
      {
        upload_preset: "collections",
      }
    );
    res.status(200).json({ srcImage: uploadResponse.url });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};
