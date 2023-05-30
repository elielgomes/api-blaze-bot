import { RefreshToken } from "@prisma/client";

export interface IRefreshTokenRepository {
  deleteAllByUserId: (userId: string) => Promise<void>;
  save: (refreshToken: RefreshToken) => Promise<void>;
  findById: (refreshTokenId: string) => Promise<RefreshToken>;
}