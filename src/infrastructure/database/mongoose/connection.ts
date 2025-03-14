
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

export const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected successfully');  
    } catch (error) {
        console.error('❌ MongoDB connection error: ', error);
        process.exit(1);
    }
}

export const disconnectDb = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('✅ MongoDB disconnected successfully');
    } catch (error) {
        console.error('❌ MongoDB disconnection error: ', error);
        process.exit(1);
    }
}