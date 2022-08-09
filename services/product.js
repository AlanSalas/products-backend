import Product from "../models/Product.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs-extra";

// Create product
const create = async (product, image) => {
  try {
    if (image) {
      const savedImage = image && (await cloudinary.uploadImage(image?.path));
      product.image = savedImage && { publicId: savedImage?.public_id, secureUrl: savedImage?.secure_url };
      savedImage && (await fs.unlink(image?.path));
    } else {
      product.image = null;
    }

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

    if (image) {
      const updatedImage = await cloudinary.uploadImage(image?.path);
      newData.image = updatedImage && { publicId: updatedImage?.public_id, secureUrl: updatedImage?.secure_url };
      updatedImage && (await fs.unlink(image.path));
      product?.image?.publicId && (await cloudinary.removeImage(product?.image?.publicId));
    } else {
      newData.image = product?.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, newData);
    return updatedProduct;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Get products
const get = async (search, category) => {
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
          category: product?.category,
          user: {
            _id: user?._id,
            name: user?.name,
            lastName: user?.lastName,
            username: user?.username,
            image: user?.image,
          },
        };
      })
    );
    const filterProducts = productsWithObjUser.filter((product) => {
      return product.title.toLowerCase().includes(search.toLowerCase());
    });

    if (search.length === 0 && category.length === 0) {
      return productsWithObjUser;
    } else if (search.length === 0 && category.length > 0) {
      return productsWithObjUser.filter((product) => product.category === category);
    } else if (search.length > 0) {
      return filterProducts;
    } else if (search.length > 0 && category.length > 0) {
      return filterProducts.filter((product) => product.category === category);
    }
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
      category: product?.category,
      user: {
        _id: ownerProduct?._id,
        name: ownerProduct?.name,
        lastName: ownerProduct?.lastName,
        username: ownerProduct?.username,
        image: ownerProduct?.image,
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
