/**
 * This file contains the defition for the GraphQL Mutation which adds
 * a transaction to the database.
 */
import {Person} from '../data';

interface CreatePersonRequest {
  email: string;
}

export default function (value: any, person: CreatePersonRequest) {
  // Only create transaction if account exists
  return Person.create({...person});
}
