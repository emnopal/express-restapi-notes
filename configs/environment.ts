import {config} from 'dotenv';
config();

export const host: string | undefined = process.env.API_HOST;
export const port: string | undefined = process.env.API_PORT;
export const allowedHost: string | undefined = process.env.ALLOWED_HOST;
export const db: string | undefined = process.env.MONGODB_URL;
export const schema: string | undefined = process.env.MONGODB_SCHEMA;
export const nodeEnv: string | undefined = process.env.NODE_ENV;
