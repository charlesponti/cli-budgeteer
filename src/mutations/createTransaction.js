/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
const { iLike } = require("sequelize").Op;
const { GraphQLString, GraphQLFloat } = require("graphql");
const moment = require("moment");
const { TransactionType } = require("../types");
const { Account, Transaction } = require("../data");
const logger = require("../logger");
const { isUndefined } = require("lodash");

module.exports = {
  type: TransactionType,
  args: {
    account: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    payee: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString }
  },
  resolve(value, { account, ...transaction }) {
    logger.info(`Account: ${account}`);

    // If no date is provided, it is assumed that the transaction has just occurred
    if (isUndefined(transaction.date)) transaction.date = moment().toJSON();

    // Only create transaction if account exists
    return Account.findOne({
      where: { name: { [iLike]: `%${account}%` } }
    }).then(function(a) {
      return Transaction.create({ ...transaction, account_id: a.id });
    });
  }
};
