import {GraphQLString, GraphQLList, GraphQLID} from 'graphql';
import {sequelize} from '../data';
import {PersonType} from '../types';

export default {
  name: 'people',
  description: 'list of people',
  type: new GraphQLList(PersonType),
  args: {
    id: {type: GraphQLID},
    email: {type: GraphQLString},
  },
  resolve(root: any, args: any) {
    return sequelize.models.person.findAll({where: args});
  },
};
