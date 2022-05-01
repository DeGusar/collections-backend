const express = require("express");
const controller = require("../controllers/imagesController");
const router = express.Router();

router.post("/upload", controller.upload);

module.exports = router;
