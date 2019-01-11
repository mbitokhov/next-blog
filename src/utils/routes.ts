import * as Express from 'express';

export function makeListener<T, K extends keyof T>(obj: T, key: K): Express.RequestHandler {
  const func = obj[key];

  if (typeof func !== 'function') {
    throw new Error('Route must be a function');
  }

  return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    func.call(obj, req, res, next);
  };
}
