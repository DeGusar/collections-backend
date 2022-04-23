const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(483).json({ message: "User not authorised" });
    }
    const { status } = jwt.verify(token, secret);
    console.log(status);
    if (status == "Blocked") {
      return res.status(403).json({ message: "You are blocked" });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(483).json({ message: "User not authorised" });
  }
};
