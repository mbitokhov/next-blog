import * as Express from 'express';
import 'reflect-metadata';
import { config } from './config';
import { initializeContainer } from './container';
import { routes } from './routes';

async function makeServer(): Promise<Express.Application> {
  await initializeContainer();

  const server = Express.default();
  server.use(routes());

  return server;
}

makeServer().then((app) => {
  app.listen(config.port, (err: Error) => {
    if (err) {
      throw err;
    }

    console.log('Listening on port', 3000);
  });
});
