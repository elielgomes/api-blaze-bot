import { CreateUserController } from "./CreateUserControllers";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { DBUserRepository } from "../../repositories/UserRepository/DBUserRepository";

const dbUserRepository = new DBUserRepository();
const createUserUseCase = new CreateUserUseCase(dbUserRepository);
const createUserController = new CreateUserController(createUserUseCase);
export default createUserController;