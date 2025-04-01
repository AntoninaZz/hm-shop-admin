import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    media: {
        type: [String],
        required: true,
    },
    category: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        required: true,
    },
    tags: [String],
    sizes: [String],
    colors: [String],
    price: {
        type: mongoose.Schema.Types.Decimal128,
        get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) },
        required: true,
    },
    expense: {
        type: mongoose.Schema.Types.Decimal128,
        get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) },
        required: true,
    },
    numberInStock: {
        type: mongoose.Schema.Types.Int32,
        required: true,
    },
    internalMaterial: [String],
    externalMaterial: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { toJSON: { getters: true } });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;