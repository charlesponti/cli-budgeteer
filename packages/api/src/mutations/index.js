const { GraphQLObjectType } = require("graphql");
const createTransaction = require("./createTransaction");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation for Transactions",
  fields: () => ({
    createTransaction
  })
});
