import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { FuncionarioController } from "./controllers/FuncionarioController";
import { ensureAuth } from "./middlewares/ensureAuth";


const router = Router();


/**
 * Auth Routes
 */
router.post("/login", AuthController.login);


/**
 * Funcionario Routes
 */
router.get("/get-equipes", ensureAuth, FuncionarioController.getEquipe);

export { router }