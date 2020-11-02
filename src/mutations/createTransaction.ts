/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
import {GraphQLString, GraphQLFloat} from 'graphql';
import {isUndefined} from 'lodash';
import moment = require('moment');

import {TransactionType} from '../types';
import {Transaction} from '../data';
import logger from '../logger';

interface CreateTransactionRequest {
  account: string;
  person: string;
  date: string;
}

export default {
  type: TransactionType,
  args: {
    account: {type: GraphQLString},
    payee: {type: GraphQLString},
    amount: {type: GraphQLFloat},
    person: {type: GraphQLString},
    category: {type: GraphQLString},
    description: {type: GraphQLString},
    date: {type: GraphQLString},
  },
  resolve(
    value: any,
    {account, person, ...transaction}: CreateTransactionRequest
  ) {
    logger.info(`Account: ${account}`);

    // If no date is provided, it is assumed that the transaction has just occurred
    if (isUndefined(transaction.date)) transaction.date = moment().toJSON();

    // Only create transaction if account exists
    return Transaction.create({
      ...transaction,
      account_id: account,
      person_id: person,
    });
  },
};
