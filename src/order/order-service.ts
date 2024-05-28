import OrderModal from "./order-modal";
import { OrderType } from "./order-type";

export class OrderService {
    async createOrder(order: OrderType) {
        // First Create a document in the OrderModal collection
        const createdOrder = await OrderModal.create(order);

        // Get the _id of order and create a orderId with the format "ORD-<order._id>"
        const orderId = `ORD-${createdOrder._id}`;

        // Update the order with the orderId
        return OrderModal.findByIdAndUpdate(createdOrder._id, { orderId }, { new: true });
    }

    async getOrder(userId: string) {
        return OrderModal.find({ userId });
    }


    async updateOrderStatus(id: string, status: string) {
        return OrderModal.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    }

    async deleteOrder(id: string) {
        return OrderModal.findByIdAndDelete(id);
    }

    async totalOrderSale() {
        // Calculate total orders & Total sales
        const orderDetails = await OrderModal.aggregate([
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalAmount: { $sum: "$orderAmount" }
                }
            }
        ]);

        return orderDetails;
    }

    async getSalesReportForChart(startDate: Date, endDate: Date) {
        const orderDetails = await OrderModal.aggregate([
            {
                $match: {
                    orderDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
                    totalAmount: { $sum: "$orderAmount" }
                }
            }
        ]);

        return orderDetails;
    }
}