import crypto from 'crypto';
import { CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse } from '../api';
import { db } from '../datastore';
import { Post } from '../types';
import { ExpressHandler } from '../types';

export const listPostsHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (
  req,
  res
) => {
  res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (
  req,
  res
) => {
  if (!req.body.title || !req.body.url) {
    return res.sendStatus(400);
  }

  // TODO : Validate user exists
  // TODO : Get user id from session
  // TODO : Validate title & url are non-empty
  // TODO : Validate url is new, otherwise add +1 to post
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId,
  };
  await db.createPost(post);
  res.sendStatus(200);
};
