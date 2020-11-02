import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString, resolve: a => a.name},
    balance: {type: GraphQLFloat},
  }),
});
