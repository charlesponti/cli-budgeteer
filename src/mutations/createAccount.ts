/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
import {GraphQLString, GraphQLFloat, GraphQLID} from 'graphql';
import AccountType from '../types/Account';
import {Account} from '../data';

export default {
  type: AccountType,
  args: {
    name: {type: GraphQLString},
    balance: {type: GraphQLFloat},
    person_id: {type: GraphQLID},
  },
  resolve(value: any, {...account}) {
    return Account.create(account);
  },
};
