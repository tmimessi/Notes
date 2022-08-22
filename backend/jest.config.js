module.exports = {
  bail: true, 
  coverageProvider: "v8",
  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ]
}

// quando o bail estiver como true, é pra quando algum teste falhar, parar pra poder arrumar, e não avançar.
// o testMatch é usando pra quando for executar o teste, os outros arquivos serão ignorados, não vai ser necessário ler arquivo por arquivo, vai direto nos arquivos de teste. o * é que pode ser em qlq pasta, com um arquivo de qlq nome. o rootDir é pra dizer pro jest pegar o que tem dentro da pasta src, ignorando a node_modules.