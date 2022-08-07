import Category from "../models/Category.js";

// Create category
const create = async (category) => {
  try {
    const newCategory = new Category(category);
    const savedCategory = await Category.create(newCategory);
    return savedCategory;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Update category
const update = async (id, newData) => {
  try {
    if (!id) throw { ok: false, status: 400, message: `The id is required.` };
    const updatedCategory = await Category.findByIdAndUpdate(id, newData);
    return updatedCategory;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Get categories
const get = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

// Delete category
const remove = async (id) => {
  try {
    if (!id) throw { ok: false, status: 400, message: `The id is required.` };
    const categoryDeleted = await Category.findByIdAndDelete(id);
    return categoryDeleted;
  } catch (error) {
    throw { ok: false, status: error?.status || 500, message: error?.message || error };
  }
};

export default {
  create,
  update,
  get,
  remove,
};
