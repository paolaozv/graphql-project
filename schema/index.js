const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers');
const Profesor = require('./Profesor');
const Curso = require('./Curso');

//Endpoints
const rootQuery = `
  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
`;

const schema = makeExecutableSchema({ 
  typeDefs: [rootQuery, Profesor, Curso],
  resolvers
});

module.exports = schema;