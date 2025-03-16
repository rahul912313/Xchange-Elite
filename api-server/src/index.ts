import express from "express";
import cors from "cors";

import { rootRouter } from "./routes/index";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "We are running",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
