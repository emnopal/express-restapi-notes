import {config} from 'dotenv';
config();

export const host = process.env.API_HOST;
export const port = process.env.API_PORT;
export const allowedHost = process.env.ALLOWED_HOST;
export const db = process.env.MONGODB_URL;
export const schema = process.env.MONGODB_SCHEMA;
export const nodeEnv = process.env.NODE_ENV;
