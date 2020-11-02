const {GraphQLString} = require('graphql');
const {Transaction, Account} = require('../data');
const {SummaryType} = require('../types');

interface SummaryQuery {
  person_id: string;
}

export default {
  name: 'summary',
  type: SummaryType,
  args: {
    person_id: {type: GraphQLString},
  },
  async resolve(root: any, {person_id}: SummaryQuery) {
    const netWorth = await Transaction.sum('amount');
    const transactions = await Transaction.findAll({where: {person_id}});
    const accounts = await Account.findAll({where: {person_id}});

    return {
      netWorth,
      accounts,
      transactions,
    };
  },
};
