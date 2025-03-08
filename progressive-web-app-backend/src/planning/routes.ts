import express from "express";
import { getPlanning } from "./controller";

const router = express.Router();

router.get("/planning", getPlanning);

export default router;
