import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import publicRoutes from "./routes/publicRoutes.js";
import { connectMongoose } from "./models/mongoose.js";
const app = express();
const port = 8000;
// Middleware setup
app.use(cors({
    origin: "http://localhost:3000", // Ensure this matches your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
// Better Auth Handler
app.all("/api/auth/*", toNodeHandler(auth));
app.use('/api/public', publicRoutes);
// --- SERVER STARTUP FUNCTION ---
const startServer = async () => {
    try {
        await connectMongoose();
        app.listen(port, () => {
            console.log(`🚀 Better Auth app listening on port ${port}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
// Execute startup
startServer();
