const sequelize = require("sequelize");
const { eq, lte, gte, iLike } = sequelize.Op;
const { GraphQLList, GraphQLString } = require("graphql");
const { TransactionType } = require("../types");
const { Transaction, Account } = require("../data");

module.exports = {
  type: new GraphQLList(TransactionType),
  description: "Transactions",
  args: {
    account: {
      type: GraphQLString,
      description: "Account which transaction occured on"
    },
    from: { type: GraphQLString, description: "Minimum date" },
    to: { type: GraphQLString, description: "Maximum date" }
  },
  resolve(root, args) {
    const baseQuery = {
      where: {},
      order: sequelize.col("date"),
      include: [Account]
    };

    if (args.from) {
      baseQuery.where.date = { [gte]: args.from };
    }

    if (args.to) {
      if (baseQuery.where.date) {
        Object.assign(baseQuery.where.date, { [lte]: args.to });
      } else {
        baseQuery.where.date = { [lte]: args.to };
      }
    }

    if (args.account) {
      return Account.find({
        where: { name: { [iLike]: `%${args.account}%` } }
      }).then(a =>
        Transaction.findAll({
          ...baseQuery,
          where: { account_id: { [eq]: a.id }, ...baseQuery.where }
        })
      );
    }

    return Transaction.findAll({ baseQuery });
  }
};
