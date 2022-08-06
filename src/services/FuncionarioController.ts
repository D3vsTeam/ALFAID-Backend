import prismaClient from "../prisma";

export class FuncionarioService {

  static async getEquipe() {
    const today = new Date();
    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0);
    today.setUTCMilliseconds(0);

    const equipe = await prismaClient.ponto.findMany({
      where: {
        data: {
          equals: today
        }
      },
      select: {
        nome: true,
        matricula: true,
        data: true
      }
    })

    return equipe;
  }
}