const knex = require("../database/knex")

class TagsController {
  // criando a função resposável por listar todas as tags do usuário
  async index(req, res) {
    // pegando o user_id
    const user_id = req.user.id
    // buscando pelas tags
    const tags = await knex("tags")
    // filtrando pelo user_id
    .where({user_id})
    .groupBy("name") // pra remover possíveis tags duplicadas

    return res.json(tags)
  }
}

module.exports = TagsController