import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { FuncionarioController } from "./controllers/FuncionarioController";
import { ProdutoController } from "./controllers/ProdutoController";
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

/**
 * Produto Routes
 */
 router.get("/get-produtos", ensureAuth, ProdutoController.getProdutos);


export { router }