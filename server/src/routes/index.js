const { Router } = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controllers/product");

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  createProfile,
} = require("../controllers/user");
const { authentication } = require("../middlewares/authentication");
const { uploadFile } = require("../middlewares/fileUploads");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", authentication, checkAuth);
router.post("/user", createUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", authentication, updateUser);
router.delete("/user/:id", authentication, deleteUser);
router.post("/profile", authentication, createProfile);

router.post("/product", authentication, uploadFile("imageFile"), createProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);

module.exports = router;
