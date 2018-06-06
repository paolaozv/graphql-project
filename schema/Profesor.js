module.exports = `
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

  input NuevoProfesor {
    nombre: String!,
    genero: Genero,
    nacionalidad: String!
  }

  input EditarProfesor {
    nombre: String
    genero: Genero,
    nacionalidad: String
  }
`;