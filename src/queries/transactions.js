const { GraphQLList, GraphQLString } = require('graphql')
const { TransactionType } = require('../types')
const { Transaction } = require('../data')

module.exports = {
  type: new GraphQLList(TransactionType),
  description: 'Transactions from csv',
  args: {
    account: { type: GraphQLString },
    from: { type: GraphQLString, description: 'Minimum date' },
    to: { type: GraphQLString, description: 'Maximum date' }
  },
  resolve (root, args) {
    return Transaction.findAll({ where: args })
  }
}
