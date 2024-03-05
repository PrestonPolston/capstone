const express = require("express");
const router = express.Router();

router.use("/", require("./user"));
router.use("/", require("./cart"));
router.use("/", require("./preferences"));
router.use("/", require("./userInformation"));

module.exports = router;
