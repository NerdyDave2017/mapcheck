export interface IUserCreate{
  email: string;
  password: string;
}

export interface IUserInput {
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  newPassword?: string;
}

export interface IUserSignin{
  email: string;
  password: string;
}

export interface IUpdateUser{
  firstname?: string;
  lastname?: string;
  password?: string;
}

export interface IChangePassword{
  email: string;
  password: string;
  newPassword: string;
}