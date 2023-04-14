import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';

const app = express();

app.use(express.json());

const requestLoggerHandler: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path, '- body: ', req.body);
  next();
};

app.use(requestLoggerHandler);

app.get('/v1/posts', listPostsHandler);

app.post('/v1/posts', createPostHandler);

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('Uncaught exception ', err);
  return res.status(500).send('Oops an unexpected error occured, please try again');
};

app.use(errHandler);
app.listen(3000);
