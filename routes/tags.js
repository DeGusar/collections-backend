const express = require("express");
const controller = require("../controllers/tagsController");
const router = express.Router();

router.get("/all", controller.getAll);
router.get("/:idItem", controller.getByItemId);
router.delete("/delete/:idItem", controller.delete);

module.exports = router;
