import { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoService";

export class ProdutoController {

  static async getProdutos(req: Request, res: Response) {
    try {
      const response = await ProdutoService.getAllProducts();
      return res.json(response);
    } catch (err: any) {
      return res.status(err.status || 500).json({
        message: err?.message || "Erro interno",
      });
    }
  }

  static async getDerivacoes(req: Request, res: Response) {
    try {
      const response = await ProdutoService.getAllDerivacoes();
      return res.json(response);
    } catch (err: any) {
      return res.status(err.status || 500).json({
        message: err?.message || "Erro interno",
      });
    }
  }
}