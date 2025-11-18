import express from "express";
import cors from "cors"; 
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import router from "./src/routes/route";



import publicRoutes from './routes/publicRoutes';
const app = express();
const port = 8000;


app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(express.json());

app.all("/api/auth/*", toNodeHandler(auth));

app.use('/api/routes', router);

app.use('/api/public', publicRoutes);


// --- SERVER START ---

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});