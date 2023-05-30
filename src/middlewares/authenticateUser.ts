import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export interface ITokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

class AuthenticateUser {

  public checkToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Acess denied!" });
    }

    try {
      const secret = process.env.SECRET;
      jwt.verify(token, secret);
      next();
    } catch (error) {
      return res.status(401).json({ error: "Acess denied!" });
    }
  }

  public validateUserId(req: Request, res: Response, next: NextFunction) {

    const { id } = req.params;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    try {
      const secret = process.env.SECRET;
      const decodedToken = jwt.verify(token, secret) as ITokenPayload;
      if (id !== decodedToken.userId) {
        res.status(401).json({ error: "Acess denied!" });
      }
      next();
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  
}

export default new AuthenticateUser();