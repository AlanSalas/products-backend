import categoryService from "../services/category.js";
import _ from "underscore";

const createCategory = async (req, res) => {
  console.log(req.body);
  try {
    await categoryService.create(req.body);
    res.status(200).json({
      ok: true,
      status: 200,
      message: `Category ${req?.body?.name} has been created successfully.`,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updateCategory = _.pick(req.body, ["name"]);

  try {
    await categoryService.update(id, updateCategory);
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Category has been updated successfully.",
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.get();
    res.status(200).json({
      ok: true,
      status: 200,
      categories,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryDeleted = await categoryService.remove(id);
    res.status(200).json({
      ok: true,
      status: 200,
      message: `Category ${categoryDeleted?.name} has been deleted successfully.`,
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
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
};
