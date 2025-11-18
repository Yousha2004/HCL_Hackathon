import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import publicRoutes from "./routes/publicRoutes.js";
import { connectMongoose } from "./models/mongoose.js";
import doctorRoute  from "./routes/doctorRoutes.js";
import patientRoute from "./routes/patientRoutes.js";

const app = express();
const port = 8000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// --- FIX: Route Syntax for Express 5 ---
// The (.*) explicitly tells Express to match anything after /api/auth/
app.all("/api/auth/(.*)", toNodeHandler(auth));

app.use('/api/public', publicRoutes);

app.use('/api/auth/doctor',doctorRoute);

app.use('/api/auth/patient',patientRoute);

const startServer = async () => {
  try {
    // 1. Connect Mongoose (for your application models)
    await connectMongoose();
    
    // 2. Start Server
    app.listen(port, () => {
      console.log(`🚀 Better Auth app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();