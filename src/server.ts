import express = require('express');
import * as dotenv from 'dotenv';
import {graphqlHTTP} from 'express-graphql';
import {GraphQLSchema} from 'graphql';
const app = express();

// Load environment variables
dotenv.config();

import logger from './logger';
import mutation from './mutations';
import query from './queries';
const {PORT, APP_URL, NODE_ENV = 'development'} = process.env;

const cors = require('cors');

app.use(
  '*',
  cors({origin: APP_URL}),
  graphqlHTTP({
    schema: new GraphQLSchema({
      query,
      mutation,
    }),
    pretty: true,
    graphiql: true,
  })
);

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(
      `🚀 ${NODE_ENV.toUpperCase()} GraphQL Server running @ port ${PORT}`
    );
  });
}

export default app;
