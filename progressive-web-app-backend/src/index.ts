import express from "express";
import cors from "cors";
import StoreRouter from "./stores/routes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", StoreRouter);

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
