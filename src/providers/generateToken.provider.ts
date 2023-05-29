import * as jwt from "jsonwebtoken";

interface ITokenProvider {
  generate: (userId: string) => Promise<string>;
}

class TokenProvider implements ITokenProvider {
  async generate(userId: string) {
    const secret = process.env.SECRET;
    const token = jwt.sign({ userId: userId }, secret, { expiresIn: 600 });
    return token;
  }
}

export { TokenProvider };