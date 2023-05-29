import { Request, Response, Router } from "express";
import UserService from "../services/user.service";
import { IRegisterUserRequest, ILoginUserRequest } from "../interfaces";

class UserController {

  async register(req: Request, res: Response) {

    const { username, permition, password, confirmPassword }: IRegisterUserRequest = req.body;

    try {
      const newUser = await UserService.register({
        username,
        permition,
        password,
        confirmPassword
      });
      res.status(201).json({ msg: "User created successfully!" });
    } catch (error) {
      res.status(error.statusCode ?? 400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {

    const { username, password }: ILoginUserRequest = req.body;

    try {
      const userToken = await UserService.login({
        username,
        password
      });
      res.status(200).json({ ...userToken });
    } catch (error) {
      res.status(error.statusCode ?? 401).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userResult = await UserService.getUserById(id);
      res.status(200).json({ userResult });
    } catch (error) {
      res.status(error.statusCode ?? 400).json({ error: error.message });
    }

  }

  async refreshToken(req: Request, res: Response) {
    const { refresh_token } = req.body;

    try {
      const newToken = await UserService.refreshToken(refresh_token);
      res.status(200).json({ ...newToken });
    } catch (error) {
      res.status(error.statusCode ?? 400).json({ error: error.message });
    }
  }

}

export default new UserController;
