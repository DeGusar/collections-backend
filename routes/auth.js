const express = require("express");
const controller = require("../controllers/authController");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/login",
  [
    check("email", "email can't be empty").notEmpty(),
    check("password", "password can't be empty").notEmpty(),
  ],
  controller.login
);
router.post("/register", controller.register);
router.get("/users", authMiddleware, roleMiddleware, controller.getUsers);
router.delete(
  "/delete",
  authMiddleware,
  roleMiddleware,
  controller.deleteUsers
);
router.patch("/block", authMiddleware, roleMiddleware, controller.blockUsers);
router.patch(
  "/unblock",
  authMiddleware,
  roleMiddleware,
  controller.unblockUsers
);
router.patch("/setadmin", authMiddleware, roleMiddleware, controller.setAdmin);

module.exports = router;
