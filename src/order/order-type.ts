import { AddressType } from "../common/types";

export interface OrderType {
    userId: string;
    userEmail: string;
    address: AddressType;
    restaurnatId: string;
    restaurantName: string;
    orderItems: {
        productId: string;
        quantity: number;
    }[];
    orderAmount: number;
    addressId: string;
    orderStatus: string;
    orderDate: Date;
    paymentType: string;
    paymentStatus: string;
    paymentId: string;
    deliveryDate: Date;
    deliveryTime: string;
    deliveryType: string;
    deliveryStatus: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface Filters {
    customerName?: { $regex: string; $options: string };
    orderStatus?: string;
    restaurantId?: string;
}

export interface Pagination {
    page: number;
    limit: number;
}