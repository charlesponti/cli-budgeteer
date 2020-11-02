const {GraphQLList} = require('graphql');
const {CategoryType} = require('../types');
const data = require('../data');

export default {
  name: 'categories',
  description: 'list of categories',
  type: new GraphQLList(CategoryType),
  args: {},
  resolve() {
    return data.getCategories();
  },
};
