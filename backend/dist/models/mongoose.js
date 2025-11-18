import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}
export const connectMongoose = async () => {
    try {
        // Check if we are already connected
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }
        // Establish connection
        await mongoose.connect(MONGODB_URI);
        console.log("✅ MongoDB Connected Successfully");
        return mongoose.connection;
    }
    catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit process with failure
    }
};
