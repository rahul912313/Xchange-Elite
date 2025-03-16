import { Router } from "express";

export const tradesRouter = Router();

tradesRouter.get("/", async (req, res) => {
  const { market } = req.query;
  // can extract market from database
  res.json({
    message: "Hello form trades",
  });
});
