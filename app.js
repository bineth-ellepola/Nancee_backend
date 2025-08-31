//SdpL7XmOler1Bm1v
//vCBFFqBwoUzH9sBE

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); 
app.use(cors({ origin: "http://localhost:5173" }));
const productRouter = require("./Routes/ProductRoute");
app.use("/products", productRouter);


mongoose
  .connect("mongodb+srv://admin:29ce3vn5VGOfdtuK@cluster0.ysesjrj.mongodb.net/")
  .then(() => console.log("Connected to mongo DB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
