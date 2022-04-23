const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const generateAccesToken = (id, role, status) => {
  const payload = {
    id,
    role,
    status,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: new RegExp("^" + email + "$", "i"),
    });
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(402).json({ message: "Wrong email or password" });
    }
    const token = generateAccesToken(user._id, user.role, user.status);
    return res.json({
      token: `Bearer ${token}`,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  } catch (e) {
    res.status(400).json({ message: "Login error" });
  }
};

module.exports.register = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Validation error", errors });
    }
    const { password, firstName, lastName, email, role } = req.body;
    const candidate = await User.findOne({
      email: new RegExp("^" + email + "$", "i"),
    });
    if (candidate) {
      res
        .status(409)
        .json({ message: "User with this email has already exist" });
    } else {
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        password: hashPassword,
        firstName,
        lastName,
        email,
        role,
      });
      await user.save();
      return res.status(200).json({ message: "User registered" });
    }
  } catch (e) {}
};
module.exports.getUsers = async function (req, res) {};
module.exports.deleteUsers = function (req, res) {
  res.status(200).json({
    deleteUsers: true,
  });
};
module.exports.blockUsers = function (req, res) {
  res.status(200).json({
    blockUsers: true,
  });
};
module.exports.unblockUsers = function (req, res) {
  res.status(200).json({
    unblockUsers: true,
  });
};
module.exports.setAdmin = function (req, res) {
  res.status(200).json({
    setAdmin: true,
  });
};
