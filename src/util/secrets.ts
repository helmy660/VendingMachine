import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const ENVIRONMENT = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
