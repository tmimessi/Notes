// este arquivo vai ficar responsável por conhecer as rotas de usuário.

const { Router } = require('express')

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require('../controllers/UsersController')


const UserAvatarController = require('../controllers/UserAvatarController')

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const usersRoutes = Router()

// passando as confifurações do multer 
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()

const userAvatarController = new UserAvatarController()

// usando o método post (preciso executar no insominia pois o navegador não executa)
usersRoutes.post('/', usersController.create)

// usando o método put para passar o método update e é preciso passar um id como parâmetro
// pra atualizar, o usuário precisa estar autenticado, então primeiro passa pra essa função, pra depois ir pro controller - diferente do create que logicamente o usuário não precisa estar autenticado pois ele ainda nem existe kkk 
usersRoutes.put('/', ensureAuthenticated, usersController.update)

// usando o patch pra atualizar um dado em específico, que é o avatar; passa pela autenticação e o single é pq vai ser só um arquivo e qual vai ser o nome do campo que vai carregar esse arquivo (avatar), depois, chamando pra atualizar o avatar
// obs.: por ser um arquivo muito grande, a imagem guarda numa pasta e no bd só tem a referência dela
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes