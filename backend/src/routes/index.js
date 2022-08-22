// Este arquivo será responsável por reunir todos as rotas da aplicação
const { Router } = require('express')

const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRouter) // função para toda vez que alguém acessar o /users, será redirecionado para o userRoutes
routes.use('/notes', notesRouter)
routes.use('/tags', tagsRouter)
routes.use('/sessions', sessionsRouter)

module.exports = routes
