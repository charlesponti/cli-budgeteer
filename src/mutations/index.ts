import {GraphQLObjectType} from 'graphql';
import createTransaction from './createTransaction';
import createAccount from './createAccount';
import createPerson from './createPerson';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation for Transactions',
  fields: () =>
    ({
      createTransaction,
      createAccount,
      createPerson,
    } as any),
});
