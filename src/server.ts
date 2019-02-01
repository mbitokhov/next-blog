import * as Express from 'express';
import 'reflect-metadata';
import { App } from './Application';
import { config } from './config';
import { container, initializeContainer } from './container';
import { routes } from './routes';

async function makeServer(): Promise<Express.Application> {
  await initializeContainer();

  const app = container.get(App);
  return app.make();
}

makeServer().then((app) => {
  app.listen(config.port, (err: Error) => {
    if (err) {
      throw err;
    }

    console.log('Listening on port', 3000);
  });
});
