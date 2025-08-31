const e = require("express");
const Product = require("../Model/ProductModel");

//   Add product
const addProduct = async (req, res, next) => {
  try {
    const { name, description, brand, category, priceLKR, stock } = req.body;

    // Cloudinary uploaded files will be in req.files (multer-storage-cloudinary)
    const images = req.files.map((file) => ({
      public_id: file.filename, // cloudinary public id
      url: file.path,           // cloudinary secure url
    }));

    const newProduct = new Product({
      name,
      description,
      brand,
      category,
      priceLKR,
      stock,
      images,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating product", error: err.message });
  }
};

//   Get all products
const getAllProducts = async (req, res, next) => {
  let products;

  try {
    products = await Product.find();
  } catch (err) {
    console.log(err);
  }

  if (!products) {
    return res.status(404).json({ message: "Products not found! Try again" });
  }

  return res.status(200).json({ products });
};

// Get product by ID
const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};


// Update product by ID
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, brand, category, priceLKR, stock } = req.body;

  try {
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.priceLKR = priceLKR || product.priceLKR;
    product.stock = stock || product.stock;

    // Update images if provided
    if (req.files && req.files.length > 0) {
      product.images = req.files.map((file) => ({
        public_id: file.filename,
        url: file.path,
      }));
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// Delete product by ID
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

exports.addProduct = addProduct;
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;


