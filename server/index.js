require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const router = require("./src/routes");
const path = require("path");

const PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./src/socket")(io);

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
