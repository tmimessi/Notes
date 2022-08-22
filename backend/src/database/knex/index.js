// configuração e conexão do knex com o bd

const config = require("../../../knexfile") // importando as configs pra poder usar aqui
const knex = require("knex") // importando o knex
const connection = knex(config.development) // importando a conexão que é do knex e passando as configurações de desenvolvimento que estão dentro de config

module.exports = connection
