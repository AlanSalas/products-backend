import express from "express";
const router = express.Router();

router.post("/product", () => {});
router.get("/products", () => {});
router.get("/product/:id", () => {});
router.put("/product/:id", () => {});
router.delete("/product/:id", () => {});

export default router;
