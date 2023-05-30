import { Request, Response, NextFunction } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

export class RefreshTokenUserController {

  constructor(
    private refreshTokenUserUseCase: RefreshTokenUserUseCase
  ) { }

  async handle(req: Request, res: Response) {

    const { refresh_token } = req.body;

    try {
      const newToken = await this.refreshTokenUserUseCase.execute({ refresh_token });
      res.status(200).json(newToken);
    } catch (error) {
      res.status(error.statusCode ?? 401).json({ error: error.message });
    }
  }
}
