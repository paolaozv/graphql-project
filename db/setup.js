const { Model } = require('objection')
const knexConfig = require('./knexfile')
const Knex = require('knex')

// Inicia una conexión a base de datos
const knex = Knex(knexConfig.development)
Model.knex(knex)