import express from "express";
import { getAllPlanning, getPlanning } from "./controller";

const router = express.Router();

router.get("/planning", getPlanning);
router.get("/plannings", getAllPlanning);

export default router;
