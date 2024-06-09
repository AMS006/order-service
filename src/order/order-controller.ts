import { Response } from "express";
import { AuthRequest } from "../common/types";
import { OrderService } from "./order-service";
import { Filters } from "./order-type";

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

    getOrders = async (req: AuthRequest, res: Response) => {
        try {

            const { search, orderStatus, tenantId } = req.query;
            const filters: Filters = {};

            if (search) {
                filters.customerName = { $regex: search as string, $options: "i" };
            }

            if (tenantId) {
                filters.restaurantId = tenantId as string;
            }

            if (orderStatus) filters.orderStatus = orderStatus as string;

            const pagination = {
                page: parseInt(req.query.page as string) || 1,
                limit: parseInt(req.query.limit as string) || 10,
            };

            const response = await this.orderService.getOrders(filters, pagination);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getUserOrders = async (req: AuthRequest, res: Response) => {
        const userId = req.auth.sub;
        if (!userId) return res.status(400).json({ message: "User Id is required" });

        const filters: Filters = {
            userId
        }

        const pagination = {
            page: parseInt(req.query.page as string) || 1,
            limit: parseInt(req.query.limit as string) || 10,
        };

        const response = await this.orderService.getOrders(filters, pagination);

        res.status(200).json(response);
    }



    getOrderById = async (req: AuthRequest, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) return res.status(400).json({ message: "Order Id is required" });
            const response = await this.orderService.getOrderById(id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    confirmOrder = async (req: AuthRequest, res: Response) => {
        try {
            const id = req.params.id;
            const response = await this.orderService.confirmOrder(id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    cancelOrder = async (req: AuthRequest, res: Response) => {
        try {
            const id = req.params.id;
            const { cancelReason } = req.body;
            const response = await this.orderService.cancelOrder(id, cancelReason);
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
            const role = req.auth.role;
            console.log(req.auth);
            const tenant = req.auth?.tenant;
            const response = await this.orderService.totalOrderSale(role, String(tenant?.id));
            console.log(response, "response");
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getRecentOrders = async (req: AuthRequest, res: Response) => {
        try {
            const role = req.auth.role;
            const tenant = req.auth?.tenant;
            const response = await this.orderService.getRecentOrders(role, String(tenant?.id));

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getWeeklySales = async (req: AuthRequest, res: Response) => {
        try {
            const role = req.auth.role;
            const tenant = req.auth?.tenant;

            const response = await this.orderService.getSalesReportForChart(role, String(tenant?.id));
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}