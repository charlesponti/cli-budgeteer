import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import AccountType from './Account';
import {Account} from '../data';

export default new GraphQLObjectType({
  name: 'Transaction',
  description: 'Transaction',
  fields: () => ({
    id: {type: GraphQLID},
    payee: {type: GraphQLString, resolve: (p: any) => p.payee},
    description: {type: GraphQLString, resolve: (p: any) => p.description},
    date: {type: GraphQLString, resolve: (p: any) => p.date},
    amount: {type: GraphQLFloat, resolve: (p: any) => p.amount},
    category: {type: GraphQLString, resolve: (p: any) => p.category},
    account: {
      resolve: (p: any) => Account.findOne({where: {id: p.account_id}}),
      type: AccountType,
    },
    account_id: {type: GraphQLString},
  }),
});
