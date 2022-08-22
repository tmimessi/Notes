const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const authConfig = require('../configs/auth')
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(req, res){
    const {email, password} = req.body

    // usando o knex pra acessar a tabela de users e filtrar pelo email; o first é pra garantir que tenha apenas um usuário.
    const user = await knex("users").where({ email }).first()

    // se o usuário não existe
    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401)
    }

    // comparando a senha que o usuário colocou agora com a senha que tem cadastrada no banco de dados
    const passwordMatched = await compare(password, user.password)

    // se a senha não bateu
    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401)
    }

    // criando o token de autenticação
    const { secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {
      // inserindo o id do usuário dentro do token - tenho que mudar pra string
      subject: String(user.id),
      expiresIn
    })

    return res.json({user, token})
  }
}

module.exports = SessionsController