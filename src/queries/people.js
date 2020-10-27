const { GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const { sequelize } = require("../data");
const { PersonType } = require("../types");

module.exports = {
  type: new GraphQLList(PersonType),
  args: {
    id: { type: GraphQLID },
    email: { type: GraphQLString }
  },
  resolve(root, args) {
    return sequelize.models.person.findAll({ where: args });
  }
};
