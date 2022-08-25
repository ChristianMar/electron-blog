export interface ILoginData {
  username: string;
  password: string;
}

export interface ILogged {
  id: string | number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | number;
  avatar: string;
  language: string;
  token: string;
}
