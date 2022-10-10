const path = require("path");
const fs = require('fs')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;

const uploadProductImageLocal = async (req, res) => {
  //check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }
  // if(req.files.image.mimetype !== 'image/jpeg'){
  //   throw new CustomError.BadRequestError('File format not supported')
  // }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError(
      "File format not supported, please upload an image"
    );
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "File too large, Please upload image less than 1 kilobyte"
    );
  }

  const imagePath = path.resolve(
    __dirname,
    `../public/uploads/${productImage.name}`
  );
  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath)
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
