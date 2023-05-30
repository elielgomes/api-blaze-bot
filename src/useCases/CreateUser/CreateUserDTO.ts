import { Permitions } from "../../interfaces";

export interface ICreateUserRequestDTO {
  username: string;
  password: string;
  confirmPassword: string;
  permition: Permitions | null;
}