const { GraphQLList } = require('graphql')

const data = require('../data')
const { TransactionType } = require('../types')

module.exports = {
  type: new GraphQLList(TransactionType),
  description: 'Transactions from csv',
  args: { },
  resolve () {
    return data.getTransactions()
  }
}
