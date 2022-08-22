const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization // é aqui que estará o token de autorização do usuário

  // se o token não existir
  if (!authHeader) {
    throw new AppError("JWT Token não informado.", 401)
  }

  // se o token existir - quebrar um texto em string com um espaço pra pegar só a segunda parte, que é o token. ex. bearer xxxx
  const [, token] = authHeader.split(" ")

  // verificando a validade do token
  try {
    // se o token for válido, vai devolver o sub, que será atribuido um alias de user_id
    const {sub: user_id} = verify(token, authConfig.jwt.secret)
    req.user = {
      // voltando pra número - no SessionsController foi transformado num array
      id: Number(user_id)
    }

    // chamando a próxima função 
    return next()

    // se for inválido
  } catch {
    throw new AppError("JWT Token inválido", 401)
  }
}

module.exports = ensureAuthenticated