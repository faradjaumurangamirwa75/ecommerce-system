
const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// GET all products
router.get("/", getProducts);

// GET one product
router.get("/:id", getProductById);

// ADD product with optional image upload
router.post("/", upload.single("image"), addProduct);

// UPDATE product with optional image upload
router.put("/:id", upload.single("image"), updateProduct);

// DELETE product
router.delete("/:id", deleteProduct);

module.exports = router;
