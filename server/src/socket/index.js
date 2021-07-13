const { Chat } = require("../../models");

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
  });
};

module.exports = socketIo;
