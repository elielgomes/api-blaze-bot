import dayjs from "dayjs";
import { IRefreshTokenUserRequestDTO } from "./RefreshTokenUserDTO";
import { IRefreshTokenRepository } from "../../repositories/RefreshTokenRepository/IRefreshTokenRepository";
import CustomHttpException from "../../utils/customHttpException";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";
import { GenerateRefreshTokenProvider } from "../../providers/GenerateRefreshTokenProvider";

export class RefreshTokenUserUseCase {

  constructor(
    private refreshTokenRepository: IRefreshTokenRepository
  ) { }

  async execute({ refresh_token }: IRefreshTokenUserRequestDTO) {

    if (!refresh_token) {
      throw new CustomHttpException("Refresh token id is required!", 400);
    }

    const refreshToken = await this.refreshTokenRepository.findById(refresh_token);

    if (!refreshToken) {
      throw new CustomHttpException("Invalid refresh token!", 401);
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.generate(refreshToken.userId);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if (refreshTokenExpired) {
      const generateTokenProvider = new GenerateRefreshTokenProvider(this.refreshTokenRepository);
      const newRefreshToken = await generateTokenProvider.generate(refreshToken.userId);

      return { token: token, refresh_token: newRefreshToken }
    }
    return { token: token };
  }
}
