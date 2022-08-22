const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require('../utils/AppError')

// usando o describe, posso colocar vários testes dentro; aqui, estão só os de usuário.
describe('UserCreateService', () => {
  // essas duas consts seriam usadas em todos os its do teste, então, uso o beforeEach que vai executar e iniciá-as antes de cada teste.
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  // criando uma função que recebe como parâmetro a descrição do que o teste vai realizar e a função que vai executar o teste de fato.
  // como no teste não queremos depender do usuário, deve ser automatizado, então criamos um usuário e simulamos os inputs
  it("user should be created", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    // executando o userCreateService com os dados criados no it
    const userCreated = await userCreateService.execute(user)
    // 'espero' que retorne um id gerado
    expect(userCreated).toHaveProperty("id")
  })

  it('user shouldnt be created with existing email', async () => {
    const user1 = {
      name: 'User Test1',
      email: 'user@test.com',
      password: '123'
    }

    const user2 = {
      name: 'User Test2',
      email: 'user@test.com',
      password: '456'
    }

    // primeiramente, cadastro o primeiro usuário
    await userCreateService.execute(user1)
    // fazendo a tentativa de cadastrar o segundo usuário e verificando se o erro está de acordo com o erro que estou esperando que aconteça, que é não deixar criar o usuário pois o e-mail colocado já está em uso.
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso"))
  })
})
