const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.json({ limit: "200mb" }));

const cors = require("cors");
app.use(cors());

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
