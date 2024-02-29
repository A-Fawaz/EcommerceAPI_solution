const express = require("express");
const connect = require("./connect");
const cors = require("cors");
const ProductRoutes = require("../routes/ProductRoutes");
require("dotenv").config();
const app = express();

app.use(express.json(), cors());
app.use(ProductRoutes);

app.listen(process.env.PORT, function () {
  connect();
  console.log(`Server started on port ${process.env.PORT}`);
});
