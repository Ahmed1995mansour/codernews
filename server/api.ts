import { Post, User } from './types';

// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}

export type CreatePostRequest = Pick<Post, 'title' | 'url'>;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

// User APIs
export type SignUpRequest = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'username' | 'password'
>;
export interface SignUpResponse {
  jwt: string;
}

export interface SignInRequest {
  login: string; // email or username
  password: string;
}
export type SignInResponse = {
  user: Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'id'>;
  jwt: string;
};
