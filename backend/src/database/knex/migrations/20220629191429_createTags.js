// tags é o nome da tabela e dentro da função eu crio os campos dela. o up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id")
  table.text("name").notNullable() // não é permitido nulo
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") // significa que se eu deletar a nota na qual a tag está vinculada, a tag será deletada 
  table.integer("user_id").references("id").inTable("users")
  }) 
  
  // o down é o processo de deletar a tabela
  exports.down = knex => knex.schema.dropTable("tags") 