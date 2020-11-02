/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
import {GraphQLString} from 'graphql';
import {PersonType} from '../types';
import {Person} from '../data';

interface CreatePersonRequest {
  email: string;
}

export default {
  type: PersonType,
  args: {
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
  },
  resolve(value: any, person: CreatePersonRequest) {
    // Only create transaction if account exists
    return Person.create({...person});
  },
};
