const { hash, compare } = require('bcryptjs') // importando o hash que é a função do bcrypt que fará a criptografia para a senha do usuário e o compare que é pra usar na verificação para a função de update
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite') // importando a conexão com o banco de dados
const UserRepository = require('../repositories/UserRepository')
const UserCreateService = require('../services/UserCreateService')

// usando uma classe pois possibilita que sejam criadas várias funções dentro dela
// agora, o controller só é responsável pelas requisições e respostas pois a lógica do banco está separada em outro arquivo; assim, facilita os testes.
class UsersController {
  // criando a função criar para criar um usuário
  async create(req, res) {
    const { name, email, password } = req.body

    // instanciando o UserRepository pq ele é uma classe
    const userRepository = new UserRepository()
    // faço a instância do meu serviço de criar usuário passando qual repositório eu vou usar
    const userCreateService = new UserCreateService(userRepository)
    await userCreateService.execute({name, email, password})

    return res.status(201).json() // senão, devolvendo o staus de 201 e criando o usuário no formato json
  }

  // criando a função de atualizar os dados do usuário
  async update(req, res) {
    // pegando as informações de nome e email do req.body
    const { name, email, password, old_password } = req.body
    // agora, tem um id de usuário incorporado nas requisições por conta do middleware de autenticação que foi criado
    const user_id = req.user.id

    // criando a conexão com o banco de dados
    const database = await sqliteConnection()

    // buscando o usuário e pegando o id informado e substituindo pelo user_id
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id])

    // se o usuário não existir:
    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    // verificando se o usuário está tentando mudar o email para um email que já existe
    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    // se estiver tudo certo, vai pegar o nome do usuário e mudar para o novo nome que ele passou e se tiver tudo certo com o email, tb vai pegar e mudar para o novo email
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso.')
    }

    user.name = name ?? user.name // se existir conteúdo dentro de nome, então este será usado, senão, então o nome que já está é o que continuará sendo utilizado - operador nullish
    user.email = email ?? user.email // mesma lógica acima

    // se a pessoa informou a nova senha mas não informou a antiga
    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha.'
      )
    }

    if (password && old_password) {
      // verificando se a senha antiga bate com a que está cadastrada no banco, mas ela está criptografada, então usar o compare
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.')
      }

      // se estiver tudo certo, então fará a atualização; com o hash pra manter a criptografia
      user.password = await hash(password, 8)
    }

    // executando o update
    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )
    return res.json()
  }
}

module.exports = UsersController
