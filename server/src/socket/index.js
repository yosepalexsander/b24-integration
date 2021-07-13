const { Chat } = require("../../models");
const socketProducts = require("./products");

let interval;

const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("new client connected: ", socket.id);
    interval = setInterval(async () => {
      const messages = await Chat.findAll({
        attributes: ["id", "message"],
      });
      socket.emit("messages", messages);
    }, 2000);

    socket.on("message", async (data) => {
      await Chat.create({ message: data });
      socket.emit("messages", messages);
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
      socket.disconnect();
      clearInterval(interval);
    });
  });

  // create namespace / route
  const productNameSpace = io.of("/products");

  productNameSpace.on("connection", (socket) => {
    console.log("connect to /products");
    socketProducts.respond(socket);
  });

  // create middleware
  productNameSpace.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      const token = socket.handshake.auth.token;
      socket.token = token;
      next();
    } else {
      const err = new Error("not authorized");
      next(err);
    }
  });
};

module.exports = socketIo;
