import { Router } from "express";
import { AuthController } from "./controllers/AuthController";


const router = Router();


/**
 * Auth Routes
 */
 router.post("/login", AuthController.login);

 export { router }