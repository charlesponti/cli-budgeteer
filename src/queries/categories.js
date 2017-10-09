const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLFloat } = require('graphql')
const data = require('../data')
const { addToTotal } = require('../data/utils')

const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    name: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    count: { type: GraphQLFloat }
  })
})

module.exports = {
  type: new GraphQLList(Category),
  args: { },
  resolve () {
    const categories = data.getTransactions().reduce(function (a, b) {
      let category = a[b.Category]

      if (category) {
        category.amount = addToTotal(category.amount, b.Amount)
        category.transactions.push(b)
      } else {
        category = { amount: b.Amount, transactions: [b] }
      }

      return { ...a, [b.Category]: category }
    }, { })

    return Object.keys(categories).sort().map(name => ({
      name,
      count: categories[name].transactions.length,
      ...categories[name]
    }))
  }
}
