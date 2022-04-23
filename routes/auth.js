const express = require("express");
const controller = require("../controllers/authController");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/login",
  [
    check("email", "email can't be empty").notEmpty(),
    check("password", "password can't be empty").notEmpty(),
  ],
  controller.login
);
router.post("/register", controller.register);
router.get("/users", authMiddleware, controller.getUsers);
router.delete("/delete", authMiddleware, controller.deleteUsers);
router.patch("/block", authMiddleware, controller.blockUsers);
router.patch("/unblock", authMiddleware, controller.unblockUsers);
router.patch("/setadmin", authMiddleware, controller.setAdmin);

module.exports = router;
