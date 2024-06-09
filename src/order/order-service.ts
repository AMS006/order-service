import OrderModal from "./order-modal";
import { Filters, OrderType, Pagination } from "./order-type";

export class OrderService {
    async createOrder(order: OrderType) {
        // First Create a document in the OrderModal collection
        const createdOrder = await OrderModal.create(order);

        // Get the _id of order and create a orderId with the format "ORD-<order._id>"
        const orderId = `ORD-${createdOrder._id}`;

        // Update the order with the orderId
        return OrderModal.findByIdAndUpdate(createdOrder._id, { orderId }, { new: true });
    }

    async getOrders(filters: Filters, pagination: Pagination) {

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

        if (status === "Delivered") {
            return OrderModal.findByIdAndUpdate(id, {
                orderStatus: status,
                isDelivered: true,
                deliveryDate: new Date()
            })
        }

        return OrderModal.findByIdAndUpdate(id, { orderStatus: status });
    }

    async cancelOrder(id: string, reason: string) {
        return OrderModal.findByIdAndUpdate(id, {
            orderStatus: "Cancelled",
            isCancelled: true,
            cancelDate: new Date(),
            cancelReason: reason
        });
    }

    async deleteOrder(id: string) {
        return OrderModal.findByIdAndDelete(id);
    }

    async totalOrderSale(role: string, tenantId?: string) {
        // Calculate total orders & Total sales
        const filters: {
            restaurantId?: string;
        } = {};
        console.log(tenantId, role);

        if (role === "manager" && tenantId) {
            filters.restaurantId = tenantId;
        }

        const orderDetails = await OrderModal.aggregate([
            {
                $match: filters
            },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalSales: { $sum: "$orderAmount" }
                }
            }
        ]);

        return orderDetails[0];
    }

    async getRecentOrders(role: string, tenantId?: string) {
        const filters: {
            restaurantId?: string;
        } = {};

        if (role === "manager" && tenantId) {
            filters.restaurantId = tenantId;
        }

        const orderDetails = await OrderModal.aggregate([
            {
                $match: filters
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
                $limit: 6
            }
        ]);

        return orderDetails;
    }

    async getSalesReportForChart(role: string, tenantId?: string) {
        const currentDate = new Date();
        // currentDate.setUTCHours(0, 0, 0, 0); // Normalize to the start of the day

        const startDate = new Date(currentDate);
        startDate.setUTCDate(currentDate.getUTCDate() - 6); // Go back 6 days


        const filters: {
            orderDate: {
                $gte: Date;
                $lte: Date;
            };
            orderStatus?: string;
            restaurantId?: string;
        } = {
            orderDate: {
                $gte: startDate,
                $lte: currentDate
            }
        };


        if (role === "manager" && tenantId) {
            filters.restaurantId = tenantId;
        }

        const pipeline: Array<any> = [
            {
                $match: filters
            },
            {
                $sort: {
                    orderDate: -1
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%d %b", date: "$orderDate" }
                    },
                    totalSales: { $sum: "$orderAmount" }
                }
            },

            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    totalSales: 1
                }
            },
            {
                $sort: {
                    date: -1 // Sort by the formatted date string in ascending order
                }
            }
        ];

        const result = await OrderModal.aggregate(pipeline);

        return result;
    }
}