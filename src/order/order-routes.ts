import express from "express";
import { OrderService } from "./order-service";
import { OrderController } from "./order-controller";
import authenticate from "../common/middleware/authenticate";
import { asyncWrapper } from "../utils";
import canAccess from "../common/middleware/canAccess";

const router = express.Router();


const orderService = new OrderService();
const orderController = new OrderController(orderService);

router.post(
    "/",
    authenticate,
    asyncWrapper(orderController.createOrder)
);

router.get(
    "/",
    authenticate,
    asyncWrapper(orderController.getOrders)
);

router.get(
    "/details/:id",
    authenticate,
    asyncWrapper(orderController.getOrderById)
);

router.patch(
    "/confirm/:id",
    authenticate,
    asyncWrapper(orderController.confirmOrder)
)

router.patch(
    "/status/:id",
    authenticate,
    asyncWrapper(orderController.updateOrderStatus)
);

router.delete(
    "/:id",
    authenticate,
    asyncWrapper(orderController.deleteOrder)
);

router.get(
    "/total-sale",
    authenticate,
    canAccess(["admin"]),
    asyncWrapper(orderController.totalOrderSale)
);

router.get(
    "/weekly-sales",
    authenticate,
    canAccess(["admin"]),
    asyncWrapper(orderController.getWeeklySales)
);

export default router;