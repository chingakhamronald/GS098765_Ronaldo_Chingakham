import express from "express";
import { createStore, getStores, updateStore, deleteStore } from "./controller";

const router = express.Router();

router.post("/store", createStore);
router.put("/store/:storeId", updateStore);
router.get("/stores", getStores);
router.delete("/store/:storeId", deleteStore);

export default router;
