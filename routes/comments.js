const express = require("express");
const controller = require("../controllers/commentsController");
const router = express.Router();

router.get("/", controller.getAll);
router.post("/create", controller.create);
router.delete("/delete", controller.delete);

module.exports = router;
