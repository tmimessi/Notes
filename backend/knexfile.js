const path = require('path') // importando o path

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      // escrevendo o filename assim para que a aplicação seja acessível em qualquer sistema - resolve partindo desta pasta (dirname), acessa a pasta src, acessa a pasta database e localiza o arquivo database.db
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },

    // o pool é uma funcionalidade que executará o que for colocado dentro dele no momento em que for estabelecida a conexão com o bd
    pool: {
      // após criar, recuperar a conexão e a função de callback. vai pegar a conexão e rodar o comando pragma que é pra quando deletar uma nota, vai deletar em cascata as tags
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },

    // mostrando pro knex em qual lugar ele vai ter que armazenar essas infos
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      )
    },
    useNullAsDefault: true // adicionando propriedade padrão do sqlite
  }
}
