import 'dotenv/config';
import { ApolloServer } from 'apollo-server-lambda';
import { resolvers } from '@resolvers';
import typeDefs from '@schema';

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
