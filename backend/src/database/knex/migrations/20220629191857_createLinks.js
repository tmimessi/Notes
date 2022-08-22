// links é o nome da tabela e dentro da função eu crio os campos dela. o up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id")
  table.text("url").notNullable() // não é permitido nulo
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") // significa que se eu deletar a nota na qual o links está vinculada, o link será deletado
  table.timestamp("created_at").default(knex.fn.now())
  }) 
  
  // o down é o processo de deletar a tabela
  exports.down = knex => knex.schema.dropTable("links") 