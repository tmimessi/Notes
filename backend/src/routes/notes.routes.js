// este arquivo vai ficar responsável por conhecer as rotas de notas.

const { Router } = require('express')

const NotesController = require('../controllers/NotesController')

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const notesRoutes = Router()

const notesController = new NotesController()

// fazendo assim, o middleware de autenticação vai passar para todas as rotas abaixo
notesRoutes.use(ensureAuthenticated)

// usando a rota > não precisa passar o user_id pois ele vai ser passado como uma query e quando bater na raiz vai chamar o index pelo método get
notesRoutes.get('/', notesController.index)
// usando o método post (preciso executar no insominia pois o navegador não executa)
notesRoutes.post('/', notesController.create)
// é uma navegação que espera um parâmetro id - é uma navegação e então redireciona o fluxo para o show
notesRoutes.get('/:id', notesController.show)

notesRoutes.delete('/:id', notesController.delete)
module.exports = notesRoutes
