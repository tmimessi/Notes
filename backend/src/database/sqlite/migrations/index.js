const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsRun(){
  // criando a tabela Users pelo schema e tirando os espaços com o join
  const schemas = [createUsers].join("")
  // chamando o sqlConnection e exibindo um erro caso precise
  sqliteConnection().then(db => db.exec(schemas)).catch(error => console.error(error))
}

module.exports = migrationsRun