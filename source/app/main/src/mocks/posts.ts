import { IUser } from './user';

export interface IPost {
  id: string | number;
  userId: string | number;
  title: string;
  post: string;
  image: string;
  createdAt: string;
  user: IUser;
}

export interface IPosts<T> {
  posts: T[];
  cursor: {
    next: boolean;
    prev: boolean;
  };
  user: IUser;
}

export interface IPostsGet {
  limit: number;
  page: number;
  userId?: string | number;
  postId?: string | number;
}

export interface IPostUserGet {
  limit: number;
  page: number;
  userId: string | number;
}

export interface IPostGet {
  postId: string | number;
}

export interface IPostCreate {
  userId: string | number;
  title: string;
  post: string;
  image: string | null;
  createdAt: string;
}

export interface IPostEdit {
  postId: string | number;
  userId: string | number;
  title: string;
  post: string;
  image: string | null;
  createdAt: string;
}
