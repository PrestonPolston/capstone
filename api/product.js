const router = require("express").Router();

router.get("/products", (req, res) => {
  res.send("these are products");
});

module.exports = router;
