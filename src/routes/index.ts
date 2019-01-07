import * as Express from 'express';
import { makeListener } from '../utils/routes';
import { HomepageController } from '../http/controllers/HomepageController';
import { container } from '../container';

export function routes(): Express.Router {
  const router = Express.Router();
  const homepage = container.get(HomepageController);

  router.use('', makeListener(homepage, 'index'));

  return router;
}