const sqliteConnection = require('../database/sqlite')

// separando a responsabilidade da logica do bd
class UserRepository {
// no UsersController, preciso primeiramente buscar o usuário pelo e-mail
async findByEmail(email) {
  const database = await sqliteConnection()
  const user = await database.get('SELECT * FROM users WHERE email = (?)', [email])
  return user
}

// como o banco vai lidar com a criação
async create(name, email, password) {
  const database = await sqliteConnection()
  const userId = await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',[name, email, password])
  return {id: userId}
}
}

module.exports = UserRepository