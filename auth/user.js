const router = require("express").Router();

router.get("/user", (req, res) => {
  res.send("this is a user");
});

module.exports = router;
