import {GraphQLFloat, GraphQLList, GraphQLObjectType} from 'graphql';
import TransactionType from './Transaction';
import AccountType from './Account';
import CategoryType from './Category';

export default new GraphQLObjectType({
  name: 'Summary',
  description: 'Summary of financial health',
  fields: () => ({
    netWorth: {type: GraphQLFloat},
    accounts: {type: new GraphQLList(AccountType)},
    categories: {type: new GraphQLList(CategoryType)},
    transactions: {type: new GraphQLList(TransactionType)},
  }),
});
