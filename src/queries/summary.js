const { GraphQLString } = require("graphql");
const { Transaction, Account } = require("../data");
const { SummaryType } = require("../types");

module.exports = {
  type: SummaryType,
  args: {
    person_id: { type: GraphQLString }
  },
  async resolve(root, { person_id }) {
    const netWorth = await Transaction.sum("amount");
    const transactions = await Transaction.findAll({ where: { person_id } });
    const accounts = await Account.findAll({ where: { person_id } });

    return {
      netWorth,
      accounts,
      transactions
    };
  }
};
