const { GraphQLObjectType } = require('graphql')
const transactions = require('./transactions')

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: 'Query for Transactions',
  fields: () => ({
    transactions
  })
})
