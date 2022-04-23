const User = require("../models/User");

module.exports.login = function (req, res) {
  res.status(200).json({
    login: true,
  });
};

module.exports.register = async function (req, res) {};
module.exports.getUsers = async function (req, res) {
  res.status(200).json({ role: userRole });
};
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
