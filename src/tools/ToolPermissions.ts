enum Permissions {
  funcionario = 3,
  gerente = 10,
}

export const isManager = (idFuncao: number) => {
  return idFuncao == Permissions.gerente
}

export const isAllowToSignIn = (idFuncao: number) => {
  return [Permissions.funcionario, Permissions.gerente].includes(idFuncao)
}