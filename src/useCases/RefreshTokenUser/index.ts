import { DBRefreshTokenRepository } from "../../repositories/RefreshTokenRepository/DBRefreshTokenRepository";
import { RefreshTokenUserController } from "./RefreshTokenUserController";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

const dbRefreshTokenRepository = new DBRefreshTokenRepository();
const refreshTokenUserUseCase = new RefreshTokenUserUseCase(dbRefreshTokenRepository);
const refreshTokenUserController = new RefreshTokenUserController(refreshTokenUserUseCase);
export default refreshTokenUserController;