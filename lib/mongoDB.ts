import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("using existing database connection");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI || "", {
            dbName: "HM-Shop_Admin",
        })
        isConnected = true;
        console.log("MongoDB is connected");
    } catch (err) {
        console.log("Error connecting to MongoDB ", err);
    }
}