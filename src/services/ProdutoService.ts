import prismaClient from "../prisma";
import { heavyProducts } from "../tools/ToolProduct";

export class ProdutoService {

  static async getAllProducts() {
    const products = await prismaClient.produto.findMany({
      where: {
        OR: [{
          descricao: {
            contains: heavyProducts[1],
          },
        }, {
          descricao: {
            contains: heavyProducts[2],
          },
        }, {
          descricao: {
            contains: heavyProducts[3],
          },
        }],
        AND: {
          derivacoes: {
            some: {
              NOT: {
                descricao: {
                  equals: " "
                },
                derivacao: {
                  equals: " "
                }
              }
            }
          }
        }
      },
      include: {
        derivacoes: true
      }
    })
    return products;
  }
}