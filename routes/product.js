import express from "express";
// Controller
import ProductController from "../controllers/product.js";
// Middlewares
import multer from "multer";
import mdAuth from "../middlewares/mdAuth.js";
import mdYup from "../middlewares/mdYup.js";
// validation
import yup from "../utils/yupValidations.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/product",
  [mdAuth.verifyToken, upload.single("image"), mdYup(yup.createProductSchema)],
  ProductController.createProduct
);
router.put(
  "/product/:id",
  [mdAuth.verifyToken, upload.single("image"), mdYup(yup.createProductSchema)],
  ProductController.updateProduct
);
router.get("/products", [mdAuth.verifyToken], ProductController.getProducts);
router.get("/product/:id", [mdAuth.verifyToken], ProductController.getProductById);
router.delete("/product/:id", [mdAuth.verifyToken], ProductController.deleteProduct);

export default router;
