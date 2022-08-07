import express from "express";
// Controller
import UserController from "../controllers/user.js";
// Middlewares
import multer from "multer";
import mdAuth from "../middlewares/mdAuth.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/user/:id", [mdAuth.verifyToken], UserController.getUserById);
router.put("/user/:id", [mdAuth.verifyToken, upload.single("image")], UserController.updateUser);

export default router;
