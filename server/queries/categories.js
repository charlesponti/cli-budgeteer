const { GraphQLList } = require("graphql");
const { CategoryType } = require("../types");
const data = require("../data");

module.exports = {
  type: new GraphQLList(CategoryType),
  args: {},
  resolve() {
    return data.getCategories();
  }
};
