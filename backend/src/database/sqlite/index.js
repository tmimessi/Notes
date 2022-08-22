const sqlite3 = require("sqlite3") // é o drive que irá estabelecer a conexão com o banco de dados
const sqlite = require("sqlite") // é o driver responsável por conectar
const path = require("path") // o path resolve os endereços de acordo com o ambiente 

// criando uma função assíncrona para que quando a apicação iniciar e o arquivo de banco de dados não existe, vai criar de forma automática (não vai criar o conteúdo), como são passos que não acontecem no mesmo momento, é feito por meio de uma função assíncrona
async function sqliteConnection() {
  // abrindo uma conexão
  const database = await sqlite.open({
    // dizendo aonde eu quero que o arquivo fique salvo
    // o __dirname pega de forma automática aonde eu estou no momento dentro do meu projeto e depois volta uma pasta pra trás e cria um arquivo chamado database
    filename: path.resolve(__dirname, "..", "database.db"),
    // dizendo o drive de conexão que será utilizado
    driver: sqlite3.Database
  })
  return database
}

module.exports = sqliteConnection