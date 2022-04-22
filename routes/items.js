const express = require("express");
const controller = require("../controllers/collectionsController");
const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/create", controller.create);
router.patch("/update", controller.update);
router.delete("/delete", controller.delete);

module.exports = router;