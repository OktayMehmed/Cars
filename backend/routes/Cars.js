const express = require("express");
const router = express.Router();
const { getCars, getCarsById } = require("../controllers/Cars");

router.route("/").get(getCars);
router.route("/:id").get(getCarsById);

module.exports = router;
