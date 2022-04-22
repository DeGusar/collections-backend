const express = require("express");
const controller = require("../controllers/authController");
const router = express.Router();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/users", controller.getUsers);
router.delete("/delete", controller.deleteUsers);
router.patch("/block", controller.blockUsers);
router.patch("/unblock", controller.unblockUsers);
router.patch("setadmin", controller.setAdmin);

module.exports = router;
