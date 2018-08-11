const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
const { Conn } = require('../data')
const resolver = label => person => person[label]

const Person = new GraphQLObjectType({
  name: 'person',
  fields: () => ({
    id: { type: GraphQLString, resolve: resolver('id') },
    firstName: { type: GraphQLString, resolve: resolver('firstName') },
    lastName: { type: GraphQLString, resolve: resolver('lastName') },
    email: { type: GraphQLString, resolve: resolver('email') }
  })
})

module.exports = {
  type: new GraphQLList(Person),
  args: {
    id: { type: GraphQLInt },
    email: { type: GraphQLString }
  },
  resolve (root, args) {
    return Conn.models.person.findAll({ where: args })
  }
}
