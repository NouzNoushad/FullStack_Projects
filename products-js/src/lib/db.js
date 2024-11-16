import mongoose from "mongoose";
import { env } from "./env";

const MONGODB_URI = env.MONGODB_URI || "";

let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('Connected to database');
    } catch (error) {
        console.error('Failed: ', error);
        throw new Error('Failed to connect database');
    }
}

export default connectToDatabase;
