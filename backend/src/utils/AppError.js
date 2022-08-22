class AppError {
  // criando essas variáveis aqui no topo da classe pra que toda ela tenha conhecimento delas.
  message;
  statusCode;
  
  // o método construtor é carregado toda vez que a classe for instanciada
  constructor(message, statusCode = 400) {
    // ao usar o this, eu quero pegar a mensagem que vai chegar ali na classe pelo message e estou repassando ela para o contexto global
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError