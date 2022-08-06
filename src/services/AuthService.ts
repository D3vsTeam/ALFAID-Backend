import { funcionario } from "@prisma/client";
import { NotFound, Unauthorized, } from "http-errors"
import prismaClient from "../prisma";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthService {

  static async login(data: funcionario) {
    const { cpf, senha } = data;

    const funcionario = await prismaClient.funcionario.findUnique({
      where: { cpf }
    })

    if (!funcionario || !senha || !funcionario.senha)
      throw new NotFound("Senha ou CPF incorretos!")

    //const checkPassword = bcrypt.compare(senha, funcionario.senha);
    const checkPassword = senha === funcionario.senha

    if (!checkPassword) throw new Unauthorized("wrongEmailPassword")

    delete funcionario.senha;

    const token = sign(
      {
        funcionario: {
          name: funcionario.nome,
          email: funcionario.email,
          cpf: funcionario.cpf,
          permission_id: funcionario.permission_id,
        }
      },
      process.env.JWT_SECRET as string,
      {
        subject: funcionario.cpf,
      }
    )

    return { ...funcionario, token }
  }
}