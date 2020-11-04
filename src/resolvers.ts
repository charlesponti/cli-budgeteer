import Query from './queries';
import Mutation from './mutations';

import {Account, Category, Person, Transaction} from './data';

export default {
  Category: {
    transactions: async (category: any) =>
      await Transaction.findAll({where: {category_id: category.id}}),
  },
  Person: {
    accounts: async (person: any) =>
      await Account.findAll({where: {person_id: person.id}}),
    transactions: async (person: any) =>
      await Transaction.findAll({where: {person_id: person.id}}),
  },
  Transaction: {
    category: async (transaction: any) =>
      await Category.findOne({where: {id: transaction.category_id}}),
    person: async (transaction: any) =>
      await Person.findOne({where: {id: transaction.person_id}}),
    account: async (transaction: any) =>
      await Account.findOne({where: {id: transaction.account_id}}),
  },
  Query,
  Mutation,
};
