/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
const { iLike } = require('sequelize').Op
const { GraphQLString, GraphQLFloat } = require('graphql')
const { TransactionType } = require('../types')
const { Account } = require('../data')

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
  resolve (value, { account, ...transaction }) {
    return (
      Account
        .find({ where: { name: { [iLike]: `%${account}%` } } })
        .then(function (a) {
          return a.createTransaction(transaction)
        })
    )
  }
}
