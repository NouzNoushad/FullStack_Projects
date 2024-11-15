import mongoose from "mongoose";
import { env } from "./env";

const MONGODB_URI = env.MONGODB_URI || "";

let isConnected: boolean = false;

const connectToDatabase = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('Connected to database');
    } catch (error) {
        console.error('Failed to connect database', error);
        throw new Error('Failed to open database');
    }
}

export default connectToDatabase;