const express = require("express");
const controller = require("../controllers/tagsController");
const router = express.Router();

router.get("/all", controller.getAll);

module.exports = router;
