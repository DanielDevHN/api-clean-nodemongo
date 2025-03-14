import dotenv from 'dotenv';
import { UserUseCases } from './domain/useCases/UserUseCases';
import { UserController } from './interfaces/controllers/UserController';
import { MongoUserRepository } from './infrastructure/repositories/UserRepository';
import { ExpressServer } from './infrastructure/server/server';
import { connectDb } from './infrastructure/database/mongoose/connection';

dotenv.config();

const userRepository = new MongoUserRepository();
const userUseCases = new UserUseCases(userRepository);
const userController = new UserController(userUseCases);

const server = new ExpressServer(userController);

const startApp = async (): Promise<void> => {
  try {
    await connectDb();
    
    server.start();
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

startApp();