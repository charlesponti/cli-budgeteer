import {uniq} from 'lodash';
import {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';
import {Transaction} from '../data';

const RestaurantsResponse = new GraphQLObjectType({
  name: 'restaurantsResponse',
  fields: () => ({
    count: {type: GraphQLInt},
    items: {type: new GraphQLList(GraphQLString)},
  }),
});

export default {
  name: 'restaurants',
  type: RestaurantsResponse,
  args: {},
  async resolve() {
    const response = await Transaction.findAll({
      where: {category: 'Food > Dining Out'},
    });

    const items = uniq(
      (response as []).map((t: {payee: string}) => t.payee).sort()
    );

    return {
      count: items.length,
      items,
    };
  },
};
