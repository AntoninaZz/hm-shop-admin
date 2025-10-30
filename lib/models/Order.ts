import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerClerkId: {
        type: String,
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            color: String,
            size: String,
            quantity: Number,
        }
    ],
    shippingAddress: String,
    totalAmount: Number,
    comment: String,
    paymentStatus: {
        type: String,
        default: "not paid",
    },
    isSent: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;