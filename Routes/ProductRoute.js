const express = require("express");
const router = express.Router();

const ProductController = require("../Controllers/ProductController");
const upload = require("../upload"); // multer + cloudinary config

// Get all products
router.get("/", ProductController.getAllProducts);

// Add product 
router.post("/add", upload.array("images", 5), ProductController.addProduct);

// Get product by ID
router.get("/:id", ProductController.getProductById);

// Update product
router.put("/update/:id", upload.array("images", 5), ProductController.updateProduct);

// Delete product
router.delete("/delete/:id", ProductController.deleteProduct);



module.exports = router;
