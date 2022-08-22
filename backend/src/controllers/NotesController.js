const knex = require('../database/knex')
class NotesController {
  async create(req, res) {
    // desestruturando
    const { title, description, tags, links } = req.body
    const user_id = req.user.id

    // cadastrando a nota e recuperar qual foi o id dessa nota cadastrada
    const note_id = await knex('notes').insert({
      title,
      description,
      user_id
    })
    // percorrendo cada link que eu tenho pelo map
    const linksInsert = links.map(link => {
      return {
        // criando um objeto inserindo a nota que esse link tá vinculado e mudando de link pra url
        note_id,
        url: link
      }
    })
    // passando os links que eu quero inserir
    await knex('links').insert(linksInsert)

    // percorrendo cada tag que eu tenho pelo map
    const tagsInsert = tags.map(name => {
      return {
        // pegando as informações necessárias da tag 
      note_id,
      name,
      user_id
    }
  })
    // passando os links que eu quero inserir
    await knex('tags').insert(tagsInsert)

    return res.json()
  }


  async show(req, res) {
    // recuperando o id que virá através de req.params
    const {id} = req.params
    // selecionando as notas usando o id como parâmetro e pegando apenas a primeira com o first
    const note = await knex("notes").where({id}).first()
    // selecionando as tags para serem exibidas tb, trazendo em ordem alfabética
    const tags = await knex("tags").where({note_id: id}).orderBy("name")
    // selecionando os links e colocando em ordem de criação
    const links = await knex("links").where({note_id: id}).orderBy("created_at")


    // montando o objeto
    return res.json(
      note, // despejando todos os detalhes da nota aqui
      tags,
      links
    )

  }

  async delete(req, res) {
    const {id} = req.params
    await knex("notes").where({id}).delete()
    return res.json()
  }

  // função para listar as notas
  async index(req, res) {
    const {title, tags} = req.query
    const user_id = req.user.id // para mostrar as notas, elas vão ser exibidas de acordo com o id do usuário

    let notes
    // se existir a tag que está sendo acessada acima, significa que vai ter um filtro baseado em tags, senão, vai ter a consulta normal
    if(tags) {  
      // convertendo a tag de um texto simples para um vetor e usando a vírgula como um delimitador; usando o map pois a única coisa que interessa é a tag
      const filterTags = tags.split(',').map(tag => tag.trim())

      // fazendo a pesquisa baseando nas tags e passando o vetor filterTags para comparar se a tag de fato existe ali ou não 
      // filtro select pra buscar o id, title e user_id da tabela notas
      notes = await knex("tags")
      .select(["notes.id", 
      "notes.title", 
      "notes.user_id"])
      .where("notes.user_id", user_id) // filtrando pelo id do usuário
      .whereLike("notes.title", `%${title}%`) // explicação do whereLike abaixo
      .whereIn("name", filterTags)
      .innerJoin("notes", "notes.id", "tags.note_id") // conectando uma tabela com a outra com os campos que tem em comum
      .groupBy("notes.id") // pra não trazer notas repetidas quando o usuário filtrar 
      .orderBy("notes.title") // organizando em ordem alfabética

    } else {
       // buscando as notas que foram criadas somente por um usuário específico e em ordem alfabética - o whereLike ajuda a buscar por valores que estão dentro de uma palavra, assim não preciso digitar ela exatamente. Usando depois a literal pois estou colocando o sinal de percentual para que o banco de dados pesquise pela palavra tanto antes quanto depois, em qualquer parte da palavra
      notes = await knex("notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title")
    }

    // fazendo um filtro em todas as tags onde a tag seja igual ao id do usuário
    const userTags = await knex("tags").where({user_id})
    // percorrendo todas as notas 
    const notesWithTags = notes.map(note => {
      // filtrando as tags da nota > quero saber aonde o id da nota que tá vinculado à tag seja igual ao note_id
      const noteTags = userTags.filter(tag => tag.note_id === note.id)
      // se for igual, vou retornar todos os detalhes da nota e vou passar pra tag o noteTags
      return {
        ...note,
        tags: noteTags
      }
    })

    return res.json(notesWithTags)
  }
}
module.exports = NotesController