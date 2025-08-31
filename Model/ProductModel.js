
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({

    name:{
        type:String,
        required:true,
    },
      description:{
        type:String,
        required:true,
    },
      brand:{
        type:String,
        required:true,
    },
      category:{
        type:String,
        required:true,
    },
      priceLKR:{
        type:Number,
        required:true,
    },
      stock:{
        type:Number,
        required:true,
    },
       createdAT:{
        type:Date,
        default:Date.now,
    },

    images: [
      {
        public_id:{
          type:String,
          required:true,
        },
        url :{
          type:String,
          required:true,
        }
      }
    ],


});

module.exports = mongoose.model("productModel",productSchema );