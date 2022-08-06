import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
  secure: true,
});

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, { folder: "products-backend" });
};

const removeImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

export default {
  uploadImage,
  removeImage,
};
