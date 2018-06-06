const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
// Library Fake data generator
const casual = require('casual');

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
        nombre: 'Paola',
        nacionalidad: 'Perú'
      }
    },
    comentarios: () => {
      return [{
        id: 1,
        nombre: 'Ximena',
        cuerpo: 'Buen vídeo'
      }, {
        id: 2,
        nombre: 'Pelusa',
        cuerpo: 'Buen vídeo'
      }]
    }
  }
}

const schema = makeExecutableSchema({ 
  typeDefs,
  resolvers
});

addMockFunctionsToSchema({
  schema,
  mocks: {
    Curso: () => {
      return {
        id: casual.uuid,
        titulo: casual.sentence,
        descripcion: casual.sentences(2)
      }
    },
    Profesor: () => {
      return {
        nombre: casual.name,
        nacionalidad: casual.country
      }
    },
    Comentario: () => {
      return {
        nombre: casual.name,
        cuerpo: casual.sentence
      }
    }
  },
  preserveResolvers: false
});

// preserveResolvers preserva los datos instaciados en el resolver

module.exports = schema;