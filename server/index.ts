import express, { RequestHandler } from 'express';
import { db } from './datastore';

const app = express();

app.use(express.json())

const requestLoggerHandler: RequestHandler = (req, _res, next)=> {
console.log(req.method , req.path, '- body: ' ,req.body);
next();
}

app.use(requestLoggerHandler)

app.get('/posts', (_req,  res)=> {
    res.send({posts: db.listPosts()});
})

app.post('/posts', (req, res)=> {
  const post = req.body;
 db.createPost(post)
    res.sendStatus(200)
})
app.listen(3000);
