import * as sequelize from 'sequelize';
import {Transaction, Account} from '../data';

const {eq, lte, gte, iLike} = sequelize.Op;

export default async function (root: any, args: any) {
  const baseQuery = {
    where: {},
    // order: sequelize.col('date'),
    // include: [Account],
  } as any;

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
}
