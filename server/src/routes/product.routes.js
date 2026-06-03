import express from "express";
import { getAllProducts, getProductByIdController } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductByIdController);

export default router;