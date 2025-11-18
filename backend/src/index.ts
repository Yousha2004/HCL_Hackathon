import express from 'express';
import cors from "cors";
import router from './routes';
import { env } from './config/env';
import { connectMongoose } from './models/mongoose';

const app = express();

app.use(cors({
    origin: env.ALLOWED_ORIGIN,// frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.json());

app.use(router);

const startServer = async () => {
    try {
        await connectMongoose();
        app.listen(env.PORT, () =>
            console.log('Server is up and running!')
        );
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
// Start the server
app.listen(env.PORT, () =>
    console.log('Server is up and running!')
);