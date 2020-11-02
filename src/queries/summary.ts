const {Transaction, Account} = require('../data');

interface SummaryQuery {
  person_id: string;
}

export default async function (root: any, {person_id}: SummaryQuery) {
  const netWorth = await Transaction.sum('amount');
  const transactions = await Transaction.findAll({where: {person_id}});
  const accounts = await Account.findAll({where: {person_id}});

  return {
    netWorth,
    accounts,
    transactions,
  };
}
