import { Response } from "express";
import { AuthRequest } from "../common/types";
import { OrderService } from "./order-service";

export class OrderController {
    constructor(private orderService: OrderService) { }
    createOrder = async (req: AuthRequest, res: Response) => {
        try {
            const order = req.body;
            const userId = String(req.auth.sub);
            const response = await this.orderService.createOrder({ ...order, userId, orderDate: new Date() });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    getOrder = async (req: AuthRequest, res: Response) => {
        try {
            const userId = String(req.auth.sub);
            const response = await this.orderService.getOrder(userId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    updateOrderStatus = async (req: AuthRequest, res: Response) => {
        try {
            const id = req.params.id;
            const status = req.body.status;
            const response = await this.orderService.updateOrderStatus(id, status);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    deleteOrder = async (req: AuthRequest, res: Response) => {
        try {
            const id = req.params.id;
            const response = await this.orderService.deleteOrder(id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    totalOrderSale = async (req: AuthRequest, res: Response) => {
        try {
            const response = await this.orderService.totalOrderSale();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getWeeklySales = async (req: AuthRequest, res: Response) => {
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            const response = await this.orderService.getSalesReportForChart(startDate, new Date());
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}