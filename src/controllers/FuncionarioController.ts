import { Request, Response } from "express";
import prismaClient from "../prisma";
import { FuncionarioService } from "../services/FuncionarioController";

export class FuncionarioController {

  static async getEquipe(req: Request, res: Response) {
    try {
      const equipe = await FuncionarioService.getEquipe();
      return res.json(equipe);
    } catch (err: any) {
      return res.status(err.status || 500).json({
        message: err?.message || "Erro interno",
      });
    }
  }
}