const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
  async update(req, res){
    const user_id = req.user.id
    const avatarFilename = req.file.filename
    const diskStorage = new DiskStorage() // instanciando 

    const user = await knex("users").where({id: user_id}).first()

    // verificando se o usuário existe
    if(!user) {
      throw new AppError("Somente usuários autenticados pode alterar o avatar", 401)
    }

    // verificando se o usuário tem um avatar e deletando-o, se tiver
    if(user.avatar){
      await diskStorage.deleteFile(user.avatar)
    }

    // colocando a nova imagem no avatar
    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    // salvando e atualizando
    await knex("users").update(user).where({id: user_id})

    return res.json(user)
  }
}

module.exports = UserAvatarController