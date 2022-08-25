export interface IUserItem {
  id: string | number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  language: string;
}

export interface IUsers<T> {
  users: T[];
  cursor: {
    next: boolean;
    prev: boolean;
  };
}

export interface IUsersGet {
  limit: number;
  page: number;
}
