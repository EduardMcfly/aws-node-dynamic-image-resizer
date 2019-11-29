import 'dotenv/config';
import { ApolloServer, gql } from 'apollo-server-lambda';
import { resolvers } from 'src/resolvers';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    bye: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
