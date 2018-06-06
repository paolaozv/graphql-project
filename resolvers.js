const Curso = require('./models/Curso');
const Profesor = require('./models/Profesor');

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

module.exports = resolvers;