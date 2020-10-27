const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} = require("graphql");
const AccountType = require("./Account");
const TransactionType = require("./Transaction");
const PersonType = require("./Person");

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    count: { type: GraphQLFloat },
    transactions: { type: new GraphQLList(TransactionType) }
  })
});

const SummaryType = new GraphQLObjectType({
  name: "Summary",
  descripton: "Summary of financial health",
  fields: () => ({
    netWorth: { type: GraphQLFloat },
    accounts: { type: new GraphQLList(AccountType) },
    categories: { type: new GraphQLList(CategoryType) },
    transactions: { type: new GraphQLList(TransactionType) }
  })
});

module.exports = {
  AccountType,
  TransactionType,
  CategoryType,
  SummaryType,
  PersonType
};
