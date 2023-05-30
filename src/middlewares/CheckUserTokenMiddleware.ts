import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

class CheckUserTokenMiddleware {

  async handle(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    const secret = process.env.SECRET;

    if (!token) {
      return res.status(401).json({ error: "Acess denied!" });
    }

    try {
      verify(token, secret);
      next();
    } catch (error) {
      res.status(401).json({ error: "Acess denied!" });
    }
  }

}

export default new CheckUserTokenMiddleware();