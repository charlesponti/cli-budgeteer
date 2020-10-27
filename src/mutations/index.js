const { GraphQLObjectType } = require("graphql");
const createTransaction = require("./createTransaction");
const createAccount = require("./createAccount");
const createPerson = require("./createPerson");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation for Transactions",
  fields: () => ({
    createTransaction,
    createAccount,
    createPerson
  })
});
