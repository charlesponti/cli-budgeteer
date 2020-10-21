/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
const { GraphQLString, GraphQLFloat } = require("graphql");
const AccountType = require("../types/Account");
const { Account } = require("../data");

module.exports = {
  type: AccountType,
  args: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
  },
  resolve(value, { ...account }) {
    return Account.create(account);
  }
};
