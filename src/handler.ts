import 'dotenv/config';
import { ApolloServer } from 'apollo-server-lambda';
import { resolvers } from 'src/resolvers';
import typeDefs from 'src/schema';

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
