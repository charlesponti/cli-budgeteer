/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
const { GraphQLString, GraphQLFloat } = require("graphql");
const { PersonType } = require("../types");
const { Person } = require("../data");

module.exports = {
  type: PersonType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString }
  },
  resolve(value, person) {
    // Only create transaction if account exists
    return Person.create({ ...person });
  }
};
