const { hash } = require('bcryptjs') 
const AppError = require('../utils/AppError')

// usando a inversão de dependências 
class UserCreateService {
  // pra não dependender do UserRepository, criar um constructor
  constructor(userRepository){
    // aqui, estou atribuindo o userRepository a uma variável com o mesmo nome para que fique disponível na classe como um todo, pra ter acesso, por exemplo, dentro da função de execute. recebo o userRepository como um parâmetro aqui dentro da classe.
    
    this.userRepository = userRepository
  }
  async execute({name, email, password}){
    // antes de criar um novo usuário, verificando se ele já não existe - a lógica tá dentro do UserRepository.js
    const checkUserExists = await this.userRepository.findByEmail(email)
    
    if (checkUserExists) {
      throw new AppError('Este e-mail já está em uso')
    }
    
    const hashedPassword = await hash(password, 8) // passando dois parâmetros, a senha e o fator de complexidade
    
    // executando a inserção de valores e cadastrando o usuário (a lógica tá dentro do UserRepository.js)
    const userCreated = await this.userRepository.create({name, email, password: hashedPassword})

    return userCreated
  }
}

module.exports = UserCreateService