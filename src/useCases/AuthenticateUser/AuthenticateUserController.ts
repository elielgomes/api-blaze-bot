import { Request, Response, NextFunction } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {

  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase
  ) { }

  async handle(req: Request, res: Response) {

    const { username, password } = req.body;

    try {
      const authenticationTokens = await this.authenticateUserUseCase.execute({ username, password });
      res.status(200).json({ ...authenticationTokens });;
    } catch (error) {
      res.status(error.statusCode ?? 401).json({ error: error.message });
    }
  }
}