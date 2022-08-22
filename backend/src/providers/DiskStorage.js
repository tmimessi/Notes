const fs = require("fs") // do próprio nome p/ manipulação de arquivos
const path = require("path") // lidar com os diretórios
const uploadConfig = require("../configs/upload")

// criando as funções de salvar a imagem e deletar a anterior quando o usuário fizer upload de uma nova 
class DiskStorage {
  async saveFile(file){
    await fs.promises.rename( // a função rename é pra mudar o arquivo de lugar
    path.resolve(uploadConfig.TMP_FOLDER, file), // mudar da pasta temporária
    path.resolve(uploadConfig.UPLOADS_FOLDER, file) // pra pasta final
    )  
    return file
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) // buscando o arquivo

    // tratativa de exceções - evitar possíveis erros
    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    // deletando
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage