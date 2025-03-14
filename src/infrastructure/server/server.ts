import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { UserController } from '../../interfaces/controllers/UserController';
import { userRouter } from '../../interfaces/routes/UserRoutes';
import expressListEndpoints from 'express-list-endpoints';

export class ExpressServer {
  private app: Application;
  private port: number;

  constructor(
    private userController: UserController,
    port: number = Number(process.env.PORT) || 3000
  ) {
    this.app = express();
    this.port = port;
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
  }

  private configureRoutes(): void {
    this.app.use('/api/users', userRouter(this.userController));
    
    this.app.get('/', (_req, res) => {
      res.send('API is running...');
    });
    
    this.app.use((_req, res) => {
      res.status(404).json({ message: 'Route not found' });
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`✅ Server running on port ${this.port}`);
      console.log(`✅ Server running on http://localhost:${this.port}`);
      console.table(expressListEndpoints(this.app));
    });
  }

  public getApp(): Application {
    return this.app;
  }
}