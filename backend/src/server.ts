import express from "express";
import cors from "cors"; 
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import router from "./src/routes/route"; // <-- NEW: Import product routes

const app = express();
const port = 8000;


app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

// 2. Body Parser: Essential for parsing JSON bodies in POST/PUT requests (req.body).
// This must come before any route or controller that needs to read req.body.
app.use(express.json());

app.all("/api/auth/*", toNodeHandler(auth));

app.use('/api/routes', router);


// --- SERVER START ---

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
    console.log(`Test Product Endpoint: http://localhost:${port}/api/products`);
});