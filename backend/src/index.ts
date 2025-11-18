import express from 'express';
import cors from "cors";
import router from './routes';
import { env } from './config/env';
import { getClient } from './config/db';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const app = express();

app.use(cors({
    origin: env.ALLOWED_ORIGIN,// frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

// Better Auth Handler
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.use('/api/v1', router);

const startServer = async () => {
    try {
        await getClient();
        app.listen(env.PORT, () =>
            console.log('Server is up and running!')
        );
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

export default app;