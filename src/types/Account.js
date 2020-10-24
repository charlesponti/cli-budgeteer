const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString, resolve: a => a.name },
    balance: { type: GraphQLFloat }
  })
});
