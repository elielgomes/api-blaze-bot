import { hash, genSalt, compare } from "bcrypt";
import dayjs from "dayjs";

import { client } from "../database/prisma.client";
import { ILoginUserRequest, IRegisterUserRequest } from "../interfaces";
import { Permitions, RefreshToken } from "@prisma/client";
import CustomHttpException from "../utils/customHttpException";
import { RefreshTokenProvider } from "../providers/generateRefreshToken.provider";
import { TokenProvider } from "../providers/generateToken.provider";

export interface IUserService {
  register: ({ username, permition, password, confirmPassword }: IRegisterUserRequest) => Promise<void>;
  login: ({ username, password }: ILoginUserRequest) => Promise<{ token: string, refresh_token: RefreshToken }>;
  getUserById: (userId: string) => Promise<{ username: string, permition: Permitions }>;
  refreshToken: (refreshTokenId: string) => Promise<{ token: string } | { token: string, refresh_token: RefreshToken }>;
}

class UserService implements IUserService {

  async register({ username, permition, password, confirmPassword }: IRegisterUserRequest) {

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username: username
      }
    });

    if (userAlreadyExists) {
      throw new CustomHttpException("User already exists!", 409);
    }

    if (password !== confirmPassword) {
      throw new CustomHttpException("The passwords don't match!", 400);
    }

    const salt = await genSalt(12);
    const passwordHash = await hash(password, salt);
    const user = await client.user.create({
      data: {
        username: username,
        password: passwordHash,
        permition: permition
      }
    });
  }

  async login({ username, password }: ILoginUserRequest) {

    const user = await client.user.findFirst({
      where: {
        username: username
      }
    })

    if (!user) {
      throw new CustomHttpException("This User do not exists!", 404);
    }

    const checkPassword = compare(password, user.password);

    if (!checkPassword) {
      throw new CustomHttpException("Invalid username or password!", 401);
    }

    const tokenProvider = new TokenProvider();
    const token = await tokenProvider.generate(user.id);

    await client.refreshToken.deleteMany({
      where: {
        userId: user.id,
      }
    });
    const generateRefreshToken = new RefreshTokenProvider();
    const refreshToken = await generateRefreshToken.generate(user.id);

    return { token: token, refresh_token: refreshToken };
  }

  async getUserById(userId: string) {
    const user = await client.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new CustomHttpException("User not found!", 404);
    }

    const userInfos = {
      username: user.username,
      permition: user.permition
    }

    return userInfos;
  }

  async refreshToken(refreshTokenId: string) {

    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refreshTokenId
      }
    });

    if (!refreshToken) {
      throw new CustomHttpException("Invalid refresh token!", 401);
    }
    const generateTokenProvider = new TokenProvider();
    const token = await generateTokenProvider.generate(refreshToken.userId);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      })
      const generateRefreshToken = new RefreshTokenProvider();
      const newRefreshToken = await generateRefreshToken.generate(refreshToken.userId);

      return { token: token, refresh_token: newRefreshToken }
    }
    return { token: token };
  }

}

export default new UserService();
