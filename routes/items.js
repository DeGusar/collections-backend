const express = require("express");
const controller = require("../controllers/itemsController");
const router = express.Router();

router.get("/", controller.getAll);
router.get("/:idItem", controller.getByIdItem);
router.get("/collection/:idCollection", controller.getByIdCollection);
router.post("/create", controller.create);
router.patch("/update/:idItem", controller.update);
router.delete("/delete/:idItem", controller.delete);

module.exports = router;
