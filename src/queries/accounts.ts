import * as sequelize from 'sequelize';
import {GraphQLList, GraphQLString} from 'graphql';
import AccountType from '../types/Account';
import {Account} from '../data';

const {iLike} = sequelize.Op;

export default {
  name: 'accounts',
  description: 'list of accounts',
  type: new GraphQLList(AccountType),
  args: {
    name: {type: GraphQLString},
  },
  resolve(root: any, args: any) {
    if (args.name) {
      return Account.findAll({
        where: {name: {[iLike]: `%${args.name}%`}},
      });
    }

    return Account.findAll();
  },
};
