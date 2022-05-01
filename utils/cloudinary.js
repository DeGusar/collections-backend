const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "rss-collection",
  api_key: "171718368366996",
  api_secret: "vAlMSLQ1acv_qJCsrNaVrJjkSks",
});

module.exports = { cloudinary };
