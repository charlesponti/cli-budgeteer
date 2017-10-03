const { GraphQLObjectType } = require('graphql')
const transactions = require('./transactions')
const summary = require('./summary')
const category = require('./category')

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: 'Query for Transactions',
  fields: () => ({
    transactions,
    summary,
    category
  })
})
