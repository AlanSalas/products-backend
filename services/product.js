import Product from "../models/Product.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs-extra";

// Create product
const create = async (product, image) => {
  try {
    const savedImage = image && (await cloudinary.uploadImage(image?.path));
    product.image = savedImage && { publicId: savedImage?.public_id, secureUrl: savedImage?.secure_url };
    savedImage && (await fs.unlink(image?.path));
    const newProduct = new Product(product);
    const savedProduct = await Product.create(newProduct);
    return savedProduct;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Update product
const update = async (id, newData, image) => {
  try {
    if (!id) throw { ok: false, status: 400, message: `The id is required.` };
    const product = await Product.findById(id);
    const updatedImage = image && (await cloudinary.uploadImage(image?.path));
    newData.image = updatedImage && { publicId: updatedImage?.public_id, secureUrl: updatedImage?.secure_url };
    updatedImage && (await fs.unlink(image.path));
    product?.image?.publicId && (await cloudinary.removeImage(product?.image?.publicId));
    const updatedProduct = await Product.findByIdAndUpdate(id, newData);
    return updatedProduct;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Get products
const get = async () => {
  try {
    const products = await Product.find();
    const productsWithObjUser = await Promise.all(
      products.map(async (product) => {
        const user = await User.findById(product.user);
        return {
          _id: product?._id,
          title: product?.title,
          price: product?.price,
          description: product?.description,
          image: product?.image,
          user: {
            _id: user?._id,
            name: user?.name,
            lastName: user?.lastName,
            username: user?.username,
          },
        };
      })
    );
    return productsWithObjUser;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Get product by id
const getById = async (id) => {
  try {
    if (!id) throw { ok: false, status: 400, message: `The id is required.` };
    const product = await Product.findById(id);
    const ownerProduct = await User.findById(product?.user);
    return {
      _id: product?._id,
      title: product?.title,
      price: product?.price,
      description: product?.description,
      image: product?.image,
      user: {
        _id: ownerProduct?._id,
        name: ownerProduct?.name,
        lastName: ownerProduct?.lastName,
        username: ownerProduct?.username,
      },
    };
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Delete product
const remove = async (id) => {
  try {
    if (!id) throw { ok: false, status: 400, message: `The id is required.` };
    const productDeleted = await Product.findByIdAndDelete(id);
    productDeleted?.image?.publicId && (await cloudinary.removeImage(productDeleted?.image?.publicId));
    return productDeleted;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

export default {
  create,
  update,
  get,
  getById,
  remove,
};