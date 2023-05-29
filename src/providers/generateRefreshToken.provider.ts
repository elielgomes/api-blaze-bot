import { RefreshToken } from "@prisma/client";
import { client } from "../database/prisma.client";
import dayjs from "dayjs";

interface IRefreshToken {
  generate: (userId: string) => Promise<RefreshToken>;
}

class RefreshTokenProvider implements IRefreshToken {
  async generate(userId: string) {

    const expiresIn = dayjs().add(20, "second").unix();

    const refreshToken = await client.refreshToken.create({
      data: {
        userId: userId,
        expiresIn: expiresIn,
      }
    });
    return refreshToken;
  }
}

export { RefreshTokenProvider };