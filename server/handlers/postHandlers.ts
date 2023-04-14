import crypto from 'crypto';
import { CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse } from '../api';
import { db } from '../datastore';
import { Post } from '../types';
import { ExpressHandler } from '../types';

export const listPostsHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = (req, res) => {
  res.send({ posts: db.listPosts() });
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = (
  req,
  res
) => {
  if (!req.body.title) {
    res.status(400).send('Title field is required, but missing!');
  }
  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  db.createPost(post);
  res.sendStatus(200);
};
