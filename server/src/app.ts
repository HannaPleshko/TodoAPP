import express from 'express';
import { PORT } from '@config';
import { IRoutes } from '@interfaces';
import { errorMiddleware } from '@middlewares/error.middleware';
import cors from 'cors';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.port = PORT;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info(`╭───────────────────────────────────────────────────╮`);
      console.info(`│                                                   │`);
      console.info(`│            App listening at port ${this.port}!            │`);
      console.info(`│                                                   │`);
      console.info(`╰───────────────────────────────────────────────────╯`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: IRoutes[]): void {
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default App;
