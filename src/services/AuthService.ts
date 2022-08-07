import { funcionario } from "@prisma/client";
import { NotFound, Unauthorized, } from "http-errors"
import prismaClient from "../prisma";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { isAllowToSignIn, isManager } from "../tools/ToolPermissions";

export class AuthService {

  static async login(data: funcionario) {
    const { cpf, senha } = data;

    const funcionario = await prismaClient.funcionario.findUnique({
      where: { cpf },
      include: {
        funcoes: {
          select: {
            descricao: true
          }
        }
      }
    })

    if (!funcionario || !senha || !funcionario.senha)
      throw new NotFound("Senha ou CPF incorretos!")

    //const checkPassword = bcrypt.compare(senha, funcionario.senha);
    const checkPassword = senha === funcionario.senha

    if (!checkPassword) throw new Unauthorized("wrongEmailPassword")

    delete funcionario.senha;

    const isManager = this.verifyAndGetPermissions(funcionario.permission_id)

    const token = sign(
      {
        funcionario: {
          name: funcionario.nome,
          email: funcionario.email,
          cpf: funcionario.cpf,
          permission_id: funcionario.permission_id,
          funcao: funcionario.funcoes.descricao
        }
      },
      process.env.JWT_SECRET as string,
      {
        subject: funcionario.cpf,
      }
    )

    return { ...funcionario, token, isManager }
  }

  static verifyAndGetPermissions(permission_id: number) {
    if (isAllowToSignIn(permission_id)) {
      return isManager(permission_id)
    } else {
      throw new Unauthorized("Funcionário não possui permissão para acessar!")
    }
  }
}