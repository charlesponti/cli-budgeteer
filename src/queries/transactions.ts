import * as sequelize from 'sequelize';
import {GraphQLList, GraphQLString} from 'graphql';
import {TransactionType} from '../types';
import {Transaction, Account} from '../data';

const {eq, lte, gte, iLike} = sequelize.Op;

export default {
  name: 'transactions',
  description: 'list of transactions',
  type: new GraphQLList(TransactionType),
  args: {
    account: {
      type: GraphQLString,
      description: 'Account which transaction occured on',
    },
    from: {type: GraphQLString, description: 'Minimum date'},
    to: {type: GraphQLString, description: 'Maximum date'},
  },
  async resolve(root: any, args: any) {
    const baseQuery = {
      where: {date: {}},
      order: sequelize.col('date'),
      include: [Account],
    };

    if (args.from) {
      baseQuery.where.date = {[gte]: args.from};
    }

    if (args.to) {
      if (baseQuery.where.date) {
        Object.assign(baseQuery.where.date, {[lte]: args.to});
      } else {
        baseQuery.where.date = {[lte]: args.to};
      }
    }

    if (args.account) {
      const a = await Account.findOne({
        where: {name: {[iLike]: `%${args.account}%`}},
      });
      return await Transaction.findAll({
        ...baseQuery,
        where: {account_id: {[eq]: a?._attributes.id}, ...baseQuery.where},
      });
    }

    return Transaction.findAll({...baseQuery});
  },
};
