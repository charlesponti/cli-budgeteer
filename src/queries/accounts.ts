import * as sequelize from 'sequelize';
import {Account} from '../data';

const {iLike} = sequelize.Op;

export default function (root: any, args: any) {
  if (args.name) {
    return Account.findAll({
      where: {name: {[iLike]: `%${args.name}%`}},
    });
  }

  return Account.findAll();
}
