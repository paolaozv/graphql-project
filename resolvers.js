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
  },
  Mutation: {
    profesorAdd: (_, args) => Profesor.query().insert(args.profesor),
    profesorEdit: (_, args) => Profesor.query().patchAndFetchById(args.profesorId, args.profesor),
    profesorDelete: (_, args) => Profesor.query().findById(args.profesorId).then((profesor) => Profesor.query().deleteById(args.profesorId).then(() => profesor)),
    cursoAdd: (_, args) => Curso.query().insert(args.curso),
    cursoEdit: (_, args) => Curso.query().patchAndFetchById(args.cursoId, args.curso),
    cursoDelete: (_, args) => Curso.query().findById(args.cursoId).then((curso) => Curso.query().deleteById(args.cursoId).then(() => curso))
  }
}

module.exports = resolvers;