import {sequelize} from '../data';

export default function (root: any, args: any) {
  return sequelize.models.person.findAll({where: args});
}
