import {gql} from 'apollo-server';

export default gql`
  type Person {
    id: ID!
    firstName: String
    lastName: String
    email: String
    accounts: [Account]
    transactions: [Transaction]
  }

  type Transaction {
    id: ID!
    payee: String
    description: String
    date: String
    amount: Float
    category: ID!
    account_id: ID!
    account: Account
    person_id: ID!
    person: Person
  }

  type Summary {
    netWorth: Float
    accounts: [Account]
    transactions: [Transaction]
    categories: [Category]
  }

  type Category {
    id: ID!
    name: String
    total: Float
    count: Int
    transations: [Transaction]
  }

  type Account {
    id: ID!
    name: String
    balance: Float
    person_id: ID!
  }

  type RestaurantResponse {
    count: Int
    transactions: [Transaction]
  }

  type Query {
    person: Person
    transactions: [Transaction]
    accounts: [Account]
    categories: [Category]
    restaurants: RestaurantResponse
    people: [Person]
    summary: Summary
  }

  type Mutation {
    createTransaction(
      payee: String!
      description: String
      amount: Float!
      person_id: ID!
      account_id: ID!
    ): Transaction

    createAccount(name: String!, person_id: ID!): Account

    createPerson(firstName: String!, lastName: String!, email: String!): Person
  }
`;
