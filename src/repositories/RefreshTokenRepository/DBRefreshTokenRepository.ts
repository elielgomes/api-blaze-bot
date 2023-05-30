import { RefreshToken } from "@prisma/client";
import { client } from "../../database/prisma.client";
import { IRefreshTokenRepository } from "./IRefreshTokenRepository";

export class DBRefreshTokenRepository implements IRefreshTokenRepository {

  async deleteAllByUserId(userId: string): Promise<void> {
    await client.refreshToken.deleteMany({
      where: {
        userId: userId,
      }
    });
  }

  async save({ id, userId, expiresIn }: RefreshToken): Promise<void> {
    await client.refreshToken.create({
      data: {
        id: id,
        userId: userId,
        expiresIn: expiresIn
      }
    });
  }

  async findById(refreshTokenId: string): Promise<RefreshToken> {
    return await client.refreshToken.findFirst({
      where: {
        id: refreshTokenId,
      }
    });
  }

}