import { Request, Response } from "express"
import { AuthService } from "../services/AuthService"

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const data = req.body
      console.log(data)
      const user = await AuthService.login(data)
      return res.json(user)

    } catch (error: any) {
      return res.status(error.status || 500).json({
        message: error.message,
        status: error.status
      })
    }
  }
}