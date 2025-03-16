import { Router } from "express";
import { RedisManager } from "../RedisManager";

const depthRouter = Router();

depthRouter.get("/", async (req, res) => {
  const { market } = req.query;
  const data = {
    market: market as string,
  };
  const response = await RedisManager.getInstance().sendAndAwaitMessage({
    type: "GET_DEPTH",
    data,
  });
  res.send(response.payload);
});

export { depthRouter };
