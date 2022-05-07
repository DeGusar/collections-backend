const express = require("express");
const controller = require("../controllers/collectionsController");
const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/collection/:idCollection", controller.getByIdCollection);
router.post("/create", controller.create);
router.patch("/update", controller.update);
router.delete("/delete/:idCollection", controller.delete);

module.exports = router;
