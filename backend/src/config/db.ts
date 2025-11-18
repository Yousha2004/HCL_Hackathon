import { MongoClient, ServerApiVersion } from "mongodb"
import { env } from "./env"

export const client = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

