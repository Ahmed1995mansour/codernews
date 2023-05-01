import dotenv from 'dotenv';
import express, { ErrorRequestHandler, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import { SignUpHandler, signInHandler } from './handlers/authHandlers';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';
import { authMiddleware } from './middlewares/authMiddleware';
import { errHandler } from './middlewares/errorHandler';
import { requestLoggerHandler } from './middlewares/loggerMiddleware';

(async () => {
  await initDb();

  dotenv.config();
  const app = express();

  app.use(express.json());

  app.use(requestLoggerHandler);

  // Public Endpoints
  app.post('/v1/signup', asyncHandler(SignUpHandler));
  app.post('/v1/signin', asyncHandler(signInHandler));

  app.use(authMiddleware);

  // Public Endpoints
  app.get('/v1/posts', asyncHandler(listPostsHandler));
  app.post('/v1/posts', asyncHandler(createPostHandler));

  app.use(errHandler);
  app.listen(3000);
})();
