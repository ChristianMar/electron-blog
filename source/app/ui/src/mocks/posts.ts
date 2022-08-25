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
