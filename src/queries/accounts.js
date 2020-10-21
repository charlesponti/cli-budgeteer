const { iLike } = require("sequelize").Op;
const { GraphQLList, GraphQLString } = require("graphql");
const AccountType = require("../types/Account");
const { Account } = require("../data");

module.exports = {
  type: new GraphQLList(AccountType),
  args: {
    name: { type: GraphQLString }
  },
  resolve(root, args) {
    if (args.name) {
      return Account.findAll({
        where: { name: { [iLike]: `%${args.name}%` } }
      });
    }

    return Account.findAll();
  }
};
