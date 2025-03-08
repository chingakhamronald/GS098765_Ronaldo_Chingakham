import express from "express";
import { getWeek } from "./controller";

const router = express.Router();

router.get("/weeks", getWeek);

export default router;
