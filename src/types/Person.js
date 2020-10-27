const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = require("graphql");
const Account = require("./Account");
const TransactionType = require("./Transaction");
const { Transaction } = require("../data");
const resolver = label => person => person[label];

const PersonType = new GraphQLObjectType({
  name: "person",
  description: "A humanoid thing",
  fields: () => ({
    id: { type: GraphQLID, resolve: resolver("id") },
    firstName: { type: GraphQLString, resolve: resolver("firstName") },
    lastName: { type: GraphQLString, resolve: resolver("lastName") },
    email: { type: GraphQLString, resolve: resolver("email") },
    accounts: { type: new GraphQLList(Account) },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve: p => Transaction.findAll({ where: { person_id: p.id } })
    }
  })
});

module.exports = PersonType;
