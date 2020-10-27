const { uniq } = require("lodash");
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt
} = require("graphql");
const { Transaction } = require("../data");

const RestaurantsResponse = new GraphQLObjectType({
  name: "restaurantsResponse",
  fields: () => ({
    count: { type: GraphQLInt },
    items: { type: new GraphQLList(GraphQLString) }
  })
});

module.exports = {
  type: RestaurantsResponse,
  args: {},
  async resolve(root, args) {
    const response = await Transaction.findAll({
      where: { category: "Food > Dining Out" }
    });

    const items = uniq(response.map(t => t.payee).sort());

    return {
      count: items.length,
      items
    };
  }
};
