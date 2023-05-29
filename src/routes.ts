import { Router } from "express";
import AuthenticateUser from "./middlewares/authenticateUser";
import UserController from "./controllers/userController";

export const router = Router();

// Endpoints Routes

router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);
router.get("/api/user/:id", AuthenticateUser.checkToken, AuthenticateUser.validateUserId, UserController.getUserById);
router.post("/api/refresh-token", UserController.refreshToken);

router.get("/api/teste", AuthenticateUser.checkToken, (req, res) => {
  res.status(200).json({ msg: "sucesso!" });
})