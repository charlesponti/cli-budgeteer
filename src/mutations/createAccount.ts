/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
import {Account} from '../data';

export default function (value: any, {...account}) {
  return Account.create(account);
}
