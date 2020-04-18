const express = require("express");
const winston = require("winston");
const GraphQLHTTP = require("express-graphql");
const app = express();

const { GraphQLSchema } = require("graphql");
const query = require("./queries");
const mutation = require("./mutations");

app.use(
  "*",
  GraphQLHTTP({
    schema: new GraphQLSchema({
      query,
      mutation
    }),
    pretty: true,
    graphiql: true
  })
);

if (require.main === module) {
  app.listen(3000, function() {
    winston.info("GraphQL Server running @ port 3000");
  });
}

module.exports = app;
