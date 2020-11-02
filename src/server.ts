import * as dotenv from 'dotenv';
import {ApolloServer} from 'apollo-server';

// Load environment variables
dotenv.config();

import Query from './queries';
import Mutation from './mutations';
import logger from './logger';
import typeDefs from './types';
import {Account, Transaction} from './data';
const {PORT, APP_URL, NODE_ENV = 'development'} = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Person: {
      accounts: async person =>
        Account.findAll({where: {person_id: person.id}}),
      transactions: async (person: any) =>
        Transaction.findAll({where: {person_id: person.id}}),
    },
    Transaction: {
      account: async (transaction: any) =>
        Account.findOne({where: {id: transaction.account_id}}),
    },
    Query,
    Mutation,
  },
  cors: {origin: APP_URL},
});

if (require.main === module) {
  server.listen(PORT, () => {
    logger.info(
      `🚀 ${NODE_ENV.toUpperCase()} GraphQL Server running @ port ${PORT}`
    );
  });
}

export default server;
