const express = require("express");
const router = express.Router();

router.use("/", require("./user"));
router.use("/", require("./cart"));

module.exports = router;
