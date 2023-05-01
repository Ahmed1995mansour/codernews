import { RequestHandler } from 'express';

export const requestLoggerHandler: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path, '- body: ', req.body);
  next();
};
