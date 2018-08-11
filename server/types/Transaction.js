const { GraphQLObjectType, GraphQLFloat, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Transaction',
  description: 'Transaction',
  fields: () => ({
    payee: { type: GraphQLString, resolve: p => p.payee },
    description: { type: GraphQLString, resolve: p => p.description },
    date: { type: GraphQLString, resolve: p => p.date },
    amount: { type: GraphQLFloat, resolve: p => p.amount }
  })
})
