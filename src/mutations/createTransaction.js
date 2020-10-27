/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
const { GraphQLString, GraphQLFloat } = require("graphql");
const moment = require("moment");
const { TransactionType } = require("../types");
const { Transaction } = require("../data");
const logger = require("../logger");
const { isUndefined } = require("lodash");

module.exports = {
  type: TransactionType,
  args: {
    account: { type: GraphQLString },
    payee: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    person: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString }
  },
  resolve(value, { account, person, ...transaction }) {
    logger.info(`Account: ${account}`);

    // If no date is provided, it is assumed that the transaction has just occurred
    if (isUndefined(transaction.date)) transaction.date = moment().toJSON();

    // Only create transaction if account exists
    return Transaction.create({
      ...transaction,
      account_id: account,
      person_id: person
    });
  }
};
