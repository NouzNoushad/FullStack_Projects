import dotenv from "dotenv";

if (typeof window === 'undefined') {
    dotenv.config();
}

export const env = typeof window === 'undefined' ? process.env : import.meta.env;