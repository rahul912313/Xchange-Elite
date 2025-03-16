import { Router } from "express";
import { RedisManager } from "../RedisManager";
const orderRouter = Router();

//Create and order -> POST REQUEST
orderRouter.post("/", async (req, res) => {
  const { market, price, quantity, side, userId } = req.body;
  const data = {
    market,
    price,
    quantity,
    side,
    userId,
  };
  const response = await RedisManager.getInstance().sendAndAwaitMessage({
    type: "CREATE_ORDER",
    data,
  });

  res.send(response.payload);
});

//Cancel Order -> DELETE REQUEST
orderRouter.delete("/", async (req, res) => {
  const { orderId, market } = req.body;
  const data = {
    orderId,
    market,
  };
  const response = await RedisManager.getInstance().sendAndAwaitMessage({
    type: "CANCEL_ORDER",
    data,
  });
  res.send(response.payload);
});

//Users open orders -> GET REQUEST
orderRouter.get("/", async (req, res) => {
  const { userId, market } = req.query;
  const data = {
    userId: userId as string,
    market: market as string,
  };
  const response = await RedisManager.getInstance().sendAndAwaitMessage({
    type: "GET_OPEN_ORDERS",
    data,
  });
  res.send(response.payload);
});

export { orderRouter };
