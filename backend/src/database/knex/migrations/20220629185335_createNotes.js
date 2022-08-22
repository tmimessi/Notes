// notes é o nome da tabela e dentro da função eu crio os campos dela. o up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("notes", table => {
table.increments("id")
table.text("title")
table.text("description")
table.integer("user_id").references("id").inTable("users") // criando um campo do tipo inteiro na tabela, chamado user_id, e ele faz uma referência ao id que existe dentro da tabela do usuário, pois deve existir um usuário para que a nota possa ser criada
table.timestamp("created_at").default(knex.fn.now()) // função para gerar o timestamp
table.timestamp("updated_at").default(knex.fn.now())
}) 

// o down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("notes") 