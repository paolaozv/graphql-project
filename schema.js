const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  # Esto es un curso en el sistema
  type Curso {
    id: ID!
    titulo: String!
    # Esta es la descripcion del curso
    descripcion: String!
    rating: Float @deprecated(reason: "No creemos más en los puntajes")
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

const schema = makeExecutableSchema({ typeDefs });

module.exports = schema;