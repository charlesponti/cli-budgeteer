/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
import {isUndefined} from 'lodash';
import moment = require('moment');

import {Transaction} from '../data';

interface CreateTransactionRequest {
  category_id: string;
  account_id: string;
  person_id: string;
  date: string;
}

export default function (
  value: any,
  {...transaction}: CreateTransactionRequest
) {
  // If no date is provided, it is assumed that the transaction has just occurred
  if (isUndefined(transaction.date)) transaction.date = moment().toJSON();

  // Only create transaction if account exists
  return Transaction.create({
    ...transaction,
  });
}
