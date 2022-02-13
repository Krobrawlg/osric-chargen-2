const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/router"));

const dbo = require("./db/conn");

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
