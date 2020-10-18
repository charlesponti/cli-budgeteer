const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLFloat,
  GraphQLString
} = require("graphql");
const TransactionType = require("./Transaction");

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
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
    netWorth: { type: GraphQLFloat }
    // accounts: { type: new GraphQLList(AccountType) },
    // categories: { type: new GraphQLList(CategoryType) },
    // transactions: { type: new GraphQLList(TransactionType) }
  })
});

module.exports = {
  TransactionType,
  CategoryType,
  SummaryType
};
