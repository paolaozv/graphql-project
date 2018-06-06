const express = require('express');
const bodyParser = require('body-parser');
//Middleware
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema');

// Acceso a base de datos
require('./db/setup');

const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

const PORT = 5678;

app.listen(PORT, () => {
  console.log(`
    👍 GraphQL corriendo en http://localhost:${PORT}
    🎉 GraphiQL en http://localhost:${PORT}/graphiql
    `);
})