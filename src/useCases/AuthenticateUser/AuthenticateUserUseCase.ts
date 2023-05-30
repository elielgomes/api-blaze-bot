import { compare } from "bcrypt";
import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import CustomHttpException from "../../utils/customHttpException";
import { IAuthenticateUserRequestDTO } from "./AuthenticateUserDTO";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";
import { IRefreshTokenRepository } from "../../repositories/RefreshTokenRepository/IRefreshTokenRepository";
import { GenerateRefreshTokenProvider } from "../../providers/GenerateRefreshTokenProvider";

export class AuthenticateUserUseCase {

  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository
  ) { }

  async execute({ username, password }: IAuthenticateUserRequestDTO) {

    if (!username) {
      throw new CustomHttpException("Username is required!", 400);
    }

    if (!password) {
      throw new CustomHttpException("Username is required!", 400);
    }

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new CustomHttpException("This User do not exists!", 404);
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new CustomHttpException("Invalid username or password!", 401);
    }

    const tokenProvider = new GenerateTokenProvider();
    const token = await tokenProvider.generate(user.id);

    const refreshTokenProvider = new GenerateRefreshTokenProvider(this.refreshTokenRepository);
    const refreshToken = await refreshTokenProvider.generate(user.id);

    return { token: token, refresh_token: refreshToken };

  }
}