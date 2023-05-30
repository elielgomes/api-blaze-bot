import { Router } from "express";

// -----------------------------
import createUserController from "./useCases/CreateUser";
import authenticateUserController from "./useCases/AuthenticateUser";
import refreshTokenUserController from "./useCases/RefreshTokenUser";
// ----------------------------
import CheckUserTokenMiddleware from "./middlewares/CheckUserTokenMiddleware";
//-----------------------------

export const router = Router();

//Public Routes ---------------------->>
router.post("/api/register", (req, res) => createUserController.handle(req, res));
router.post("/api/login", (req, res) => authenticateUserController.handle(req, res));
router.post("/api/refresh-token", (req, res) => refreshTokenUserController.handle(req, res))
//Private Routes ---------------------->>
router.get("/api/teste", CheckUserTokenMiddleware.handle, (req, res) => {
  res.status(200).json({ msg: "sucesso!" });
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

