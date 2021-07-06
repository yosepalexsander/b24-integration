const { User, Product, Category, CategoryProduct } = require("../../models");

exports.getProducts = async (req, res) => {
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
    res.send({
      status: "success",
      message: "resource has successfully get",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.findOne({
      where: {
        id,
      },
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

    product = JSON.parse(JSON.stringify(product));
    product = {
      ...product,
      image: process.env.FILE_PATH + product.image,
    };
    res.send({
      status: "success",
      message: "resource has successfully get",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.createProduct = async (req, res) => {
  const { category: categoryName, ...productData } = req.body;

  try {
    const product = await Product.create({
      name: productData.name,
      price: productData.price,
      image: req.files.imageFile[0].filename,
      description: productData.description,
      user_id: req.userId,
    });

    let category = await Category.findOne({
      where: {
        name: categoryName,
      },
    });
    // method 1
    if (category) {
      await CategoryProduct.create({
        category_id: category.id,
        product_id: product.id,
      });
    } else {
      await Category.create({ name: categoryName });
      await CategoryProduct.create({
        category_id: category.id,
        product_id: product.id,
      });
    }

    let createdProduct = await Product.findOne({
      where: {
        id: product.id,
      },
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

    createdProduct = JSON.parse(JSON.stringify(createdProduct));
    createdProduct = {
      ...createdProduct,
      image: process.env.FILE_PATH + createdProduct.image,
    };
    res.send({
      status: "success",
      message: "resource has successfully deleted",
      data: createdProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
