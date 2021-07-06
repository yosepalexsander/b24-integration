require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./src/routes");
const path = require("path");

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
