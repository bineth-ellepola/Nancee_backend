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


// Update product
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, description, brand, category, priceLKR, stock } = req.body;

    // Find the product first
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Update fields if provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (priceLKR) product.priceLKR = priceLKR;
    if (stock) product.stock = stock;

    // Handle images if new files are uploaded
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        public_id: file.filename,
        url: file.path,
      }));
      product.images = images;
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully!",
      product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// Get by ID
const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};


exports.addProduct = addProduct;
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;


