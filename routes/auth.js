import express from "express";
const router = express.Router();

router.post("/register", () => {});
router.post("/login", () => {});
router.post("/forgot-password", () => {});
router.put("/update-password", () => {});
router.put("/activation", () => {});
router.post("/activation-email/:id", () => {});

export default router;
