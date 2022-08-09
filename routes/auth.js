import express from "express";
// Controller
import authController from "../controllers/auth.js";
// Middlewares
import mdAuth from "../middlewares/mdAuth.js";
import mdYup from "../middlewares/mdYup.js";
// Validations
import yup from "../utils/yupValidations.js";

const router = express.Router();

router.post("/register", [mdYup(yup.userRegisterSchema)], authController.register);
router.post("/login", [mdYup(yup.userLoginSchema)], authController.login);
router.post("/forgot-password", [mdYup(yup.forgotPasswordSchema)], authController.forgotPassword);
router.put("/update-password/:id", [mdYup(yup.updatePasswordSchema)], authController.updatePassword);
router.put("/activation/:id", authController.activateUser);
router.post("/activation-email/:id", authController.sendLinkToActivate);

export default router;
