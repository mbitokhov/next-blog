import * as Express from 'express';
import { container } from '../container';
import { HomepageController } from '../http/controllers/HomepageController';
import { makeListener } from '../utils/routes';

export function routes(): Express.Router {
  const router = Express.Router();
  const homepage = container.get(HomepageController);

  router.use('/', makeListener(homepage, 'index'));

  return router;
}
