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

exports.addProduct = addProduct;
exports.getAllProducts = getAllProducts;
