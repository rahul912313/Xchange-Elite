import e, { Router } from "express";

const klineRouter = Router();

klineRouter.get("/", (req, res) => {
  res.send("Hello from kline");
});

export { klineRouter };
