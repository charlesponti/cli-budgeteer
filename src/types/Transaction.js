const { GraphQLObjectType, GraphQLFloat, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Transacton',
  description: 'A financial transaction execute on a financial account',
  fields: () => ({
    amount: { type: GraphQLFloat },
    payee: { type: GraphQLString }
  })
})
