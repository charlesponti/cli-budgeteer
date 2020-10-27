const express = require("express");
const dotenv = require("dotenv");
const GraphQLHTTP = require("express-graphql");
const app = express();

// Load environment variables
dotenv.config();

const { GraphQLSchema } = require("graphql");

const logger = require("./logger");
const mutation = require("./mutations");
const query = require("./queries");
const { PORT, APP_URL } = process.env;

var cors = require("cors");

app.use(
  "*",
  cors({ origin: APP_URL }),
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
  app.listen(PORT, function() {
    logger.info(
      `🚀 ${process.env.NODE_ENV.toUpperCase()} GraphQL Server running @ port ${PORT}`
    );
  });
}

module.exports = app;
