const { GraphQLList } = require('graphql')
const { AccountType } = require('../types')
const data = require('../data')

module.exports = {
  type: new GraphQLList(AccountType),
  resolve (root, args) {
    return data.getAccounts()
  }
}
