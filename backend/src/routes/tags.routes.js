// este arquivo vai ficar responsável por conhecer as rotas de notas.

const { Router } = require('express')

const TagsController = require('../controllers/TagsController')

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const tagsRoutes = Router()

const tagsController = new TagsController()

// usando a rota > quando colocar o id do user vai chamar o index pelo método get
tagsRoutes.get('/', ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes
 