import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import addressRouter from '../src/address/address-routes'
import orderRouter from '../src/order/order-routes'
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from order service service!" });
});

app.use("/address", addressRouter);
app.use("/order", orderRouter);

app.use(globalErrorHandler);

export default app;
