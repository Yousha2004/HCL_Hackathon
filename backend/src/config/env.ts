import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI as string,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
};
