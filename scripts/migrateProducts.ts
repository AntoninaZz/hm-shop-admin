import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../lib/models/Product";

dotenv.config();

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ Missing MONGODB_URI in environment variables");
    }

    let isConnected: boolean = false;
    console.log("⏳ Connecting to MongoDB...");
    mongoose.set('strictQuery', true);
    if (isConnected) {
      console.log("using existing database connection");
      return;
    }
    try {
      await mongoose.connect(process.env.MONGODB_URI || "", {
        dbName: "HM-Shop_Admin",
      })
      isConnected = true;
      console.log("MongoDB is connected");
    } catch (err) {
      console.log("Error connecting to MongoDB ", err);
    }

    const products = await Product.find().sort({ createdAt: "desc" });
    console.log(`📦 Found ${products.length} products`);

    for (const product of products) {
      const variants = [];

      const colors = product.colors?.length ? product.colors : [null];
      const sizes = product.sizes?.length ? product.sizes : [null];

      for (const color of colors) {
        for (const size of sizes) {
          variants.push({
            color,
            size,
            numberInStock: product.numberInStock || 0,
          });
        }
      }

      const productData = product.toObject();
      delete productData._id;
      delete productData.__v;
      delete productData.numberInStock;

      await Product.findByIdAndUpdate(
        product._id,
        { ...productData, variants },
        { upsert: true }
      );
    }

    console.log("✅ Migration completed successfully!");
  } catch (err) {
    console.error("❌ Migration error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
})();