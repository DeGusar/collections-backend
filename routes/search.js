const express = require("express");
const controller = require("../controllers/searchController");
const router = express.Router();

router.get("/:query", controller.searchByQuery);

module.exports = router;
