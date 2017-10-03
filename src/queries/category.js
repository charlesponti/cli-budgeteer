const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql')
const data = require('../data')

const Category = new GraphQLObjectType({
  name: 'category',
  fields: () => ({
    amount: { type: GraphQLFloat }
  })
})

module.exports = {
  type: new GraphQLObjectType(),
  args: { },
  resolve () {
    return data.getTransactions().reduce(function (a, b) {
      let category = a[b.Category]

      if (category) {
        category.amount += b.Amount
      } else {
        category = { amount: b.Amount }
      }

      return { ...a, [b.Category]: category }
    }, { })
  }
}
