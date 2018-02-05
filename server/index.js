const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./api/schema");
const config = require("./config");
const initResolvers = require("./api/resolvers");

const app = express();

config(app);

const postgresResource = require("./api/resources/postgresResource");
const firebaseResource = require("./api/resources/firebaseResource")(app);

postgresResource(app).then(pgresource => start(pgresource));

function start(postgresResource) {
  const resolvers = initResolvers({
    postgresResource,
    firebaseResource
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  app.use("*", cors());
  // Where we will send all of our GraphQL requests
  app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({
      schema
      // ,
      // context: { loaders: createLoaders({ jsonResource }) }
    })
  );
  // A route for accessing the GraphiQL tool
  app.use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql"
    })
  );
  app.listen(app.get("PORT"), () =>
    console.log(
      `GraphQL is now running on http://localhost:${app.get("PORT")}/graphql`
    )
  );
}
