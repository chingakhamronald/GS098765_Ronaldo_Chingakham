import express from "express";
import { createSku, deleteSku, getSku, updateSku } from "./controller";

const router = express.Router();

router.get("/sku", getSku);
router.post("/sku", createSku);
router.put("/sku/:skuId", updateSku);
router.delete("/sku/:skuId", deleteSku);

export default router;
