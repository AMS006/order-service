import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    restaurantId: {
        type: String,
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    orderItems: {
        type: Array,
        required: true,
    },
    orderAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["Ordered", "Prepared", "Out for delivery", "Delivered", "Cancelled"],
        default: "Ordered",
        required: true,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveryDate: {
        type: Date,
    },
    isCancelled: {
        type: Boolean,
        default: false,
    },
    cancelDate: {
        type: Date,
    },
    cancelReason: {
        type: String,
    },
    diccountPercent: {
        type: Number,
    },
    isReviewAdded: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
    }
);

const OrderModal = mongoose.model("Order", orderSchema);
export default OrderModal;