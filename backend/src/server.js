require("dotenv/config") // importando pra ter acesso às variáveis de ambiente
require('express-async-errors') // importando o express-async-errors

const migrationsRun = require('./database/sqlite/migrations') // importando o database
const AppError = require('./utils/AppError') // importando o AppError
const express = require('express') // importando o express
const routes = require('./routes') // importando as rotas
const uploadConfig = require("./configs/upload")
const cors = require("cors")

migrationsRun() // executando o banco de dados
const app = express() // inicializando o express
app.use(express.json()) // mostrando qual o padrão que a aplicação deverá entender (JSON)
app.use(cors())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, req, res, next) => {
  // pra saber se o erro foi gerado pelo lado do cliente
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  console.log(error)

  // se não for um erro do lado do cliente
  return res.status(500).json({
    status: 'error',
    message: 'internal server error'
  })
})
const port = process.env.PORT || 3333 // em qual porta o express vai atender às requisições
app.listen(port, () => console.log(`Server is running on port ${port}`)) // especificando em qual porta irá "escutar" e mostrar essa mensagem
