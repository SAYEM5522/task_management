import { config } from 'dotenv';
config();
export const connection_url = process.env.connection_url;
export const PORT = process.env.PORT || 8081;
