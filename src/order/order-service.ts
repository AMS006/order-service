import OrderModal from "./order-modal";
import { Filters, OrderType, Pagination } from "./order-type";

export class OrderService {
    async createOrder(order: OrderType) {
        // First Create a document in the OrderModal collection
        const createdOrder = await OrderModal.create({ ...order, customerName: order.address.name });

        // Get the _id of order and create a orderId with the format "ORD-<order._id>"
        const orderId = `ORD-${createdOrder._id}`;

        // Update the order with the orderId
        return OrderModal.findByIdAndUpdate(createdOrder._id, { orderId }, { new: true });
    }

    async getOrders(userId: string, filters: Filters, pagination: Pagination) {

        const skip = (pagination.page - 1) * pagination.limit;
        const pipeline: Array<any> = [
            {
                $match: filters,
            },

            {
                $lookup: {
                    from: "addresses",
                    localField: "addressId",
                    foreignField: "_id",
                    as: "address",

                }
            },
            {
                $unwind: "$address"
            },
            {
                $sort: { orderDate: -1 }
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: pagination.limit }],
                    total: [{ $count: "total" }],
                },

            },
            {
                $project: {
                    data: 1,
                    total: { $arrayElemAt: ["$total.total", 0] },
                },
            },
        ];

        const result = await OrderModal.aggregate(pipeline);

        return result[0];
    }

    async getOrderById(id: string) {
        const order = await (await OrderModal.findById(id)).populate("addressId");

        return order;
    }

    async confirmOrder(id: string) {
        return OrderModal.findByIdAndUpdate(id, { isConfirmed: true });
    }


    async updateOrderStatus(id: string, status: string) {
        return OrderModal.findByIdAndUpdate(id, { orderStatus: status });
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