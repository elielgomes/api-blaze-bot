import dayjs from "dayjs";
import { RefreshToken } from "@prisma/client";
import { RefreshTokenEntity } from "../entities/RefreshToken";
import { IRefreshTokenRepository } from "../repositories/RefreshTokenRepository/IRefreshTokenRepository";

interface IGenerateRefreshTokenProvider {
  generate: (userId: string, expiresTime: number) => Promise<RefreshToken>;
}

class GenerateRefreshTokenProvider implements IGenerateRefreshTokenProvider {

  constructor(
    private refreshTokenRepository: IRefreshTokenRepository
  ) { }

  async generate(userId: string) {

    const refreshTokenExpiration = Number(process.env.REFRESH_TOKEN_EXPIRATION);
    const expiresIn = dayjs().add(refreshTokenExpiration, "second").unix();

    const refreshToken = new RefreshTokenEntity({
      userId: userId,
      expiresIn: expiresIn
    });

    await this.refreshTokenRepository.deleteAllByUserId(userId);
    await this.refreshTokenRepository.save(refreshToken);

    return refreshToken;
  }
}

export { GenerateRefreshTokenProvider };