const { GraphQLList, GraphQLString } = require('graphql')
const { AccountType } = require('../types')
const { Account } = require('../data')

module.exports = {
  type: new GraphQLList(AccountType),
  args: {
    name: { type: GraphQLString }
  },
  resolve (root, args) {
    return Account.findAll({ where: args })
  }
}
