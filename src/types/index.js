const { GraphQLObjectType, GraphQLList, GraphQLFloat, GraphQLString } = require('graphql')
const TransactionType = require('./Transaction')
const { Transaction } = require('../data')

const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    name: { type: GraphQLString, resolve: a => a.name },
    balance: { type: GraphQLFloat },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve: (root) => Transaction.findAll({ where: { accountId: root.id } })
    }
  })
})

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    count: { type: GraphQLFloat },
    transactions: { type: new GraphQLList(TransactionType) }
  })
})

const SummaryType = new GraphQLObjectType({
  name: 'Summary',
  descripton: 'Summary of financial health',
  fields: () => ({
    netWorth: { type: GraphQLFloat },
    accounts: { type: new GraphQLList(AccountType) },
    categories: { type: new GraphQLList(CategoryType) },
    transactions: { type: new GraphQLList(TransactionType) }
  })
})

module.exports = {
  TransactionType,
  AccountType,
  CategoryType,
  SummaryType
}
