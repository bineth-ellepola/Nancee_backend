const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // <-- Important: parse JSON in requests

// Routes
const productRouter = require("./Routes/ProductRoute");
app.use("/products", productRouter);

const orderRoutes = require("./Routes/OrderRoute");
app.use("/orders", orderRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://admin:29ce3vn5VGOfdtuK@cluster0.ysesjrj.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
