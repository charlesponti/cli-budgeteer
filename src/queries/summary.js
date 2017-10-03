const { GraphQLObjectType, GraphQLFloat, GraphQLList, GraphQLString } = require('graphql')
const { TransactionType } = require('../types')
const { getSummary } = require('../data')

const Summary = new GraphQLObjectType({
  name: 'summary',
  descripton: 'Summary of financial health',
  fields: () => ({
    balance: { type: GraphQLFloat },
    accounts: { type: new GraphQLList(GraphQLString) },
    categories: { type: new GraphQLList(GraphQLString) },
    transactions: { type: new GraphQLList(TransactionType) }
  })
})

module.exports = {
  type: Summary,
  args: { },
  resolve: getSummary
}
