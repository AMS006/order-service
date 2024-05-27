import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    addressLine1: {
        type: String,
        required: true,
        trim: true,
    },
    addressLine2: {
        type: String,
        trim: true,
    },
    pincode: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const AddressModal = mongoose.model("Address", addressSchema);

export default AddressModal;