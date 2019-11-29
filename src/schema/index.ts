import { DocumentNode } from 'graphql';
import { gql } from 'apollo-server-lambda';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    bye: String
  }
`;

const schema: DocumentNode[] = [typeDefs];
export default schema;
