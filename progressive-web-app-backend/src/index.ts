import express from "express";
import cors from "cors";
import StoreRouter from "./stores/routes";
import SkuRouter from "./sku/routes";
import WeekRouter from "./week/routes";
import PlanningRouter from "./planning/routes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", StoreRouter);
app.use("/api", SkuRouter);
app.use("/api", WeekRouter);
app.use("/api", PlanningRouter);

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
