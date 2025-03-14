import dotenv from 'dotenv';
import UserModel from './models/UserModel';
import { connectDb } from './connection';
import { seed } from './seed/fakedata';

dotenv.config();

connectDb();

async function seedDB() {
    try {
        await UserModel.insertMany(seed);
        console.log('Users inserted successfully');
        process.exit();
    } catch (error) {
        console.error('Error inserting users:', error);
        process.exit(1);
    }
}

async function clearDB() {
    try {
        await UserModel.deleteMany();
        console.log('Users deleted successfully');
        process.exit();
    } catch (error) {
        console.error('Error deleting users:', error);
        process.exit(1);
    }
}

if (process.argv[2] === '--import') {
    seedDB();
} else {
    clearDB();
}
