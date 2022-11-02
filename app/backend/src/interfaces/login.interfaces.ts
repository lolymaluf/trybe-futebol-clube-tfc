export interface ILogin {
  email: string,
  password: string,
}

export interface IUser extends ILogin {
  role: string,
  username: string,
  id?:number
}

export interface ITokenLogin {
  token: string,
  code?:number,
  message?:string
}

export interface IReturnLogin{
  code: number | null;
  message: string;
}
