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
    paymentStatus: String,
    isSent: Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;