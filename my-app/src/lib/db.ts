import mongoose from "mongoose";
import { env } from "./env";

const MONGODB_URI = env.MONGODB_URI || '';

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('Connected to Database')
    } catch (error) {
        console.error('Error connecting to DB: ', error);
        throw new Error('Could not connect to DB')
    }
}

