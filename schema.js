const { makeExecutableSchema } = require('graphql-tools');

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

// Type Query son como endpoint


// Resolvers son como los controllers, pueden devolver una promesa
// Es una capa fina que emula a la capa de controladores en una arquitectura MVC
const resolvers = {
  Query: {
    cursos: () => {
      return [{
        id: 1,
        titulo: 'Curso de GraphQL',
        descripcion: 'Aprendiendo GraphQL'
      }, {
        id: 2,
        titulo: 'Curso de PHP',
        descripcion: 'Aprendiendo PHP'
      }]
    }
  },
  Curso: {
    profesor: () => {
      return {
        nombre: 'Paola'
      }
    }
  }
}

const schema = makeExecutableSchema({ 
  typeDefs,
  resolvers
});

module.exports = schema;