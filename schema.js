const { makeExecutableSchema } = require('graphql-tools');
// Library Fake data generator
const casual = require('casual');
const Curso = require('./models/Curso');
const Profesor = require('./models/Profesor');

const typeDefs = `
  # Esto es un curso en el sistema
  type Curso {
    id: ID!
    titulo: String!
    # Esta es la descripcion del curso
    descripcion: String!
    profesor: Profesor
    rating: Float
    comentarios: [Comentario]
  }

  type Profesor {
    id: ID!
    nombre: String!
    nacionalidad: String!
    genero: Genero
    cursos: [Curso]
  }

  enum Genero {
    MASCULINO
    FEMENINO
  }

  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }

  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
`;

// Type Query son como endpoints

// Resolvers son como los controllers, pueden devolver una promesa
// Es una capa fina que emula a la capa de controladores en una arquitectura MVC
const resolvers = {
  Query: {
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id)
  }
}

const schema = makeExecutableSchema({ 
  typeDefs,
  resolvers
});

module.exports = schema;