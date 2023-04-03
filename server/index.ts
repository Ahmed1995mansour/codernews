import express, { RequestHandler } from 'express';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';

const app = express();

app.use(express.json())

const requestLoggerHandler: RequestHandler = (req, _res, next)=> {
console.log(req.method , req.path, '- body: ' ,req.body);
next();
}

app.use(requestLoggerHandler)

app.get('/posts',listPostsHandler)

app.post('/posts', createPostHandler)
app.listen(3000);
