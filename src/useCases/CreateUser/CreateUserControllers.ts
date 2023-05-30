import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserController {

  constructor(
    private createUserUseCase: CreateUserUseCase
  ) { }

  async handle(req: Request, res: Response) {
    const { username, password, confirmPassword, permition }: ICreateUserRequestDTO = req.body;

    try {

      await this.createUserUseCase.execute({ username, password, confirmPassword, permition });
      res.status(201).json({ msg: "User created successfully!" });
    } catch (error) {
      res.status(error.statusCode ?? 400).json({ error: error.message });
    }

  }

}