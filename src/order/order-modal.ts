import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    order: Array,
    total: Number,
    status: {
        type: String,
        default: "pending",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});