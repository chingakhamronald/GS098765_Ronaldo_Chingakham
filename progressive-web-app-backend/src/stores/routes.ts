import express from "express";
import { getStores } from "./controller";

const router = express.Router();

router.get("/stores", getStores);

export default router;
