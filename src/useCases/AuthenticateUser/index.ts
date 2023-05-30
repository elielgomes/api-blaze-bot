import { DBRefreshTokenRepository } from "../../repositories/RefreshTokenRepository/DBRefreshTokenRepository";
import { DBUserRepository } from "../../repositories/UserRepository/DBUserRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const dbUserRepository = new DBUserRepository();
const dbRefreshTokenRepository = new DBRefreshTokenRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(dbUserRepository, dbRefreshTokenRepository);
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);
export default authenticateUserController;