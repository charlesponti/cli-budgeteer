const { uniq } = require('lodash')
const { GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInt } = require('graphql')
const data = require('../data')

const RestaurantsResponse = new GraphQLObjectType({
  name: 'restaurantsResponse',
  fields: () => ({
    count: { type: GraphQLInt },
    items: { type: new GraphQLList(GraphQLString) }
  })
})

module.exports = {
  type: RestaurantsResponse,
  args: { },
  resolve (roo, args) {
    const items = (
      uniq(
        data
          .getTransactions()
          .filter(t => t.Category === 'Food > Dining Out')
          .map(t => t.Payee)
          .sort()
      )
    )

    return {
      count: items.length,
      items
    }
  }
}
