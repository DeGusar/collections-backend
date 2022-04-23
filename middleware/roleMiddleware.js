const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { role } = jwt.verify(token, secret);
    if (role !== "admin") {
      return res.status(403).json({ message: "You don't have access" });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(483).json({ message: "User not authorised" });
  }
};
