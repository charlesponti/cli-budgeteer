const { GraphQLObjectType, GraphQLFloat, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'csvTransaction',
  description: 'Transaction from csv',
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
