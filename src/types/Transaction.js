const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} = require("graphql");
const AccountType = require("./Account");
const { Account } = require("../data");

module.exports = new GraphQLObjectType({
  name: "Transaction",
  description: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    payee: { type: GraphQLString, resolve: p => p.payee },
    description: { type: GraphQLString, resolve: p => p.description },
    date: { type: GraphQLString, resolve: p => p.date },
    amount: { type: GraphQLFloat, resolve: p => p.amount },
    category: { type: GraphQLString, resolve: p => p.category },
    account: {
      resolve: p => Account.findOne({ where: { id: p.account_id } }),
      type: AccountType
    },
    account_id: { type: GraphQLString }
  })
});
