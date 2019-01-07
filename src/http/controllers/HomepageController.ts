import * as Express from 'express';
import { injectable } from 'inversify';

@injectable()
export class HomepageController {
  public index(req: Express.Request, res: Express.Response) {
    res.send('Hello World!');
  }
}