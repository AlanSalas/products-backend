import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

// Server
export const PORT = process.env.PORT || 9292;

// Database
export const DB_PORT = process.env.DB_PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
export const DB_URL =
  DB_HOST == "localhost"
    ? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
    : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
export const DB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// FileRoute
export const __DIRNAME = path.dirname(fileURLToPath(import.meta.url));
