const path = require("path");
const multer = require("multer");
const crypto = require("crypto")

// pasta temporária
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")

// pasta onde os arquivos de fato vão ficar 
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

// biblioteca pra fazer o upload
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER, // onde ficará armazenado 
    // nome do arquivo
    filename(req, file, callback){
      const fileHash =  crypto.randomBytes(10).toString("hex") // usando o hash pra não ter arquivos com nomes iguais, no formato hexadecimal
      const fileName = `${fileHash}-${file.originalname}` // o nome do arquivo então vai ser o hash + o nome original

      return callback(null, fileName)
    } 
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
}