const express = require("express");
const router = express.Router();

const ProductController = require("../Controllers/ProductController");
const upload = require("../upload"); // multer + cloudinary config

// Get all products
router.get("/", ProductController.getAllProducts);

// Add product (with multiple images)
router.post("/add", upload.array("images", 5), ProductController.addProduct);

// Get a single product by ID
router.get("/:id", ProductController.getProductById);

module.exports = router;
