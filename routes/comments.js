const express = require("express");
const controller = require("../controllers/commentsController");
const router = express.Router();

router.patch("/create/:idItem", controller.create);

module.exports = router;
