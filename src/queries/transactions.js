const { GraphQLList } = require('graphql')
const { TransactionType } = require('../types')

module.exports = {
  type: new GraphQLList(TransactionType),
  description: 'Retrieve a transaction',
  args: { },
  resolve () {
    return [{ amount: 15.00, payee: 'Meerkat Manor' }]
  }
}
