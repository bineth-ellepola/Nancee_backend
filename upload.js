const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",  // folder name in Cloudinary
    resource_type: "auto",   // allows both images & videos
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
