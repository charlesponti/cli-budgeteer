const { GraphQLObjectType, GraphQLFloat, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Transaction',
  description: 'Transaction',
  fields: () => ({
    Account: { type: GraphQLString },
    Transfers: { type: GraphQLString },
    Description: { type: GraphQLString },
    Payee: { type: GraphQLString },
    Category: { type: GraphQLString },
    Date: { type: GraphQLString },
    Amount: { type: GraphQLFloat }
  })
})
