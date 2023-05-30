import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { UserEntity } from "../../entities/User";
import CustomHttpException from "../../utils/customHttpException";
import { genSalt, hash } from "bcrypt";

export class CreateUserUseCase {

  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute({ username, password, confirmPassword, permition }: ICreateUserRequestDTO) {

    if (!username) {
      throw new CustomHttpException("Username is required!", 400);
    }

    const userAlreadyExists = await this.userRepository.findByUsername(username);

    if (userAlreadyExists) {
      throw new CustomHttpException("User already exists!", 409);
    }

    if (!password) {
      throw new CustomHttpException("Passwords is required!", 400);
    }

    if (password !== confirmPassword) {
      throw new CustomHttpException("The passwords don't match!", 400);
    }

    const salt = await genSalt(12);
    const passwordHash = await hash(password, salt);

    const user = new UserEntity({
      username: username,
      password: passwordHash,
      permition: permition,
    });

    await this.userRepository.create(user);
  }
}