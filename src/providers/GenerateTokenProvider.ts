import * as jwt from "jsonwebtoken";

interface IGenerateTokenProvider {
  generate: (userId: string) => Promise<string>;
}

class GenerateTokenProvider implements IGenerateTokenProvider {
  async generate(userId: string) {
    const secret = process.env.SECRET;
    const tokenExpiration = Number(process.env.TOKEN_EXPIRATION);
    const token = jwt.sign({ userId: userId }, secret, { expiresIn: tokenExpiration });
    return token;
  }
}

export { GenerateTokenProvider };