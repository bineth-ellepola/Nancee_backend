//SdpL7XmOler1Bm1v
//vCBFFqBwoUzH9sBE

const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Middleware
app.use("/", (req, res, next) => {
  req.setEncoding("it is working");
});



mongoose.connect("mongodb+srv://admin:pGnvvM7oSKBonwNZ@cluster0.ysesjrj.mongodb.net/")
.then(()=> console.log("Connected to mongo DB"))
.then(() => {
    app.listen(5000);
})
.catch((err)=> console.log(err));