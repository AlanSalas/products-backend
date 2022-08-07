import express from "express";
// Controller
import CategoryController from "../controllers/category.js";
// Middlewares
import mdAuth from "../middlewares/mdAuth.js";
import mdYup from "../middlewares/mdYup.js";
// validation
import yup from "../utils/yupValidations.js";

const router = express.Router();

router.post("/category", [mdAuth.verifyToken, mdYup(yup.createCategorySchema)], CategoryController.createCategory);
router.put("/category/:id", [mdAuth.verifyToken, mdYup(yup.createCategorySchema)], CategoryController.updateCategory);
router.get("/categories", [mdAuth.verifyToken], CategoryController.getCategories);
router.delete("/category/:id", [mdAuth.verifyToken], CategoryController.deleteCategory);

export default router;
