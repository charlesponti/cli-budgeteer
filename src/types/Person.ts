import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import Account from './Account';
import TransactionType from './Transaction';
import {Transaction} from '../data';
const resolver = (label: any) => (person: any) => person[label];

export default new GraphQLObjectType({
  name: 'Person',
  description: 'A humanoid thing',
  fields: () => ({
    id: {type: GraphQLID, resolve: resolver('id')},
    firstName: {type: GraphQLString, resolve: resolver('firstName')},
    lastName: {type: GraphQLString, resolve: resolver('lastName')},
    email: {type: GraphQLString, resolve: resolver('email')},
    accounts: {type: new GraphQLList(Account)},
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve: (p: any) => Transaction.findAll({where: {person_id: p.id}}),
    },
  }),
});
