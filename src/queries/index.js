const { GraphQLObjectType } = require('graphql')
const transactions = require('./transactions')
const summary = require('./summary')
const restaurants = require('./restaurants')
const categories = require('./categories')

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: 'Query for Transactions',
  fields: () => ({
    transactions,
    summary,
    restaurants,
    categories
  })
})
