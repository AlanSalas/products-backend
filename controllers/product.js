import productService from "../services/product.js";
import _ from "underscore";

const createProduct = async (req, res) => {
  const { id } = req.user;
  const product = { ...req.body, user: id };
  const image = req.file ? req.file : null;

  try {
    await productService.create(product, image);
    res.status(200).json({
      ok: true,
      status: 200,
      message: `Product ${req?.body?.title} has been created successfully.`,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateProduct = _.pick(req.body, ["title", "price", "description", "category"]);
  const image = req.file ? req.file : null;

  try {
    await productService.update(id, updateProduct, image);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Product has been updated successfully.",
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const getProducts = async (req, res) => {
  const { search, category } = req.query;
  try {
    const products = await productService.get(search, category);
    res.status(200).json({
      ok: true,
      status: 200,
      products,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getById(id);
    res.status(200).json({
      ok: true,
      status: 200,
      product,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDeleted = await productService.remove(id);
    res.status(200).json({
      ok: true,
      status: 200,
      message: `Product ${productDeleted?.title} has been deleted successfully.`,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

export default {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
};
