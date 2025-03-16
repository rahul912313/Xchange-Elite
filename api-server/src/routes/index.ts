import { Router } from "express";
import { orderRouter } from "./order";
import { depthRouter } from "./depth";
import { tradesRouter } from "./trades";
import { klineRouter } from "./kline";
import { tickersRouter } from "./ticker";

const rootRouter = Router();

rootRouter.use("/order", orderRouter);
rootRouter.use("/depth", depthRouter);
rootRouter.use("/trades", tradesRouter);
rootRouter.use("/klines", klineRouter);
rootRouter.use("/tickers", tickersRouter);

export { rootRouter };
