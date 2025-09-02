const Order = require("../Model/OrderModel");
const Product = require("../Model/ProductModel"); // stays the same

// Get all orders with product details populated
exports.getOrders = async (req, res) => {
  try {
    // Populate products._id using your existing model name
    const orders = await Order.find().populate({
      path: "products._id",
      model: "productModel", // match your exported model
      select: "name priceLKR",
    });

    // Format products for frontend
    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      address: order.address,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      products: order.products.map((p) => ({
        _id: p._id?._id || p._id,
        name: p._id?.name || "Unknown Product",
        price: p._id?.priceLKR || 0,
        quantity: p.quantity,
      })),
    }));

    res.json({ orders: formattedOrders });
  } catch (err) {
    console.error("Get Orders Error:", err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Add new order
// Add new order with automatic total calculation
exports.addOrder = async (req, res) => {
  try {
    const { products, customerName, customerEmail, address } = req.body;

    if (!products || !customerName || !address || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields or products" });
    }

    // Fetch product details from DB to calculate total
    const productIds = products.map(p => p.productId);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    let total = 0;
    const orderProducts = products.map(p => {
      const dbProduct = dbProducts.find(dp => dp._id.toString() === p.productId);
      if (!dbProduct) throw new Error(`Product not found: ${p.productId}`);
      total += dbProduct.priceLKR * p.quantity; // calculate total
      return { _id: p.productId, quantity: p.quantity };
    });

    const newOrder = new Order({
      products: orderProducts,
      customerName,
      customerEmail,
      address,
      total, // automatically calculated
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Add Order Error:", err.message);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};


// Update order status and reduce stock
exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status === "Processed" && order.status !== "Processed") {
      for (const item of order.products) {
        const product = await Product.findById(item._id);
        if (!product) continue;
        product.stock = Math.max(product.stock - item.quantity, 0);
        await product.save();
      }
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order updated successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order" });
  }
};

// Update product stock manually
exports.updateStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.stock = Math.max(product.stock - quantity, 0);
    await product.save();
    res.json({ message: "Stock updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update stock" });
  }
};
