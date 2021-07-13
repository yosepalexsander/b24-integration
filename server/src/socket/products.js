const { Product, User, Category, CategoryProduct } = require("../../models");

module.exports.respond = (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnet");
  });

  socket.on("load products", async () => {
    console.log("token from middleware", socket.token);
    try {
      let products = await Product.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: Category,
            as: "categories",
            through: {
              model: CategoryProduct,
              as: "bridge",
              attributes: [],
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["user_id", "createdAt", "updatedAt"],
        },
      });

      products = JSON.parse(JSON.stringify(products));
      products = products.map((product) => {
        return {
          ...product,
          image: process.env.FILE_PATH + product.image,
        };
      });

      socket.emit("products", products);
    } catch (error) {
      // socket.emit('products', {
      //   status: 'failed',
      //   message: 'internal server error',
      // })
      socket.disconnect();
      console.log(error);
    }
  });
  socket.on("disconnect", () => {
    console.log("disconnect");
    socket.disconnect();
  });
};
