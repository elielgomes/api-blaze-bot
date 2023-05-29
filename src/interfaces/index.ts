export enum Permitions {
  Admin = "Admin",
  User = "User"
}

export interface IRegisterUserRequest {
  username: string;
  permition?: Permitions;
  password: string;
  confirmPassword: string;
}

export interface ILoginUserRequest {
  username: string;
  password: string;
}

export interface ICustomHttpException {
  statusCode: number;
  message: string;
}


export interface ITokenPayload {
  userId: string;
  iat: number;
  exp: number;
}