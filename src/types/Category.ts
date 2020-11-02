import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import TransactionType from './Transaction';

export default new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    balance: {type: GraphQLFloat},
    count: {type: GraphQLFloat},
    transactions: {type: new GraphQLList(TransactionType)},
  }),
});
