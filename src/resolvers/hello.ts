import { IResolvers } from 'graphql-tools';

export const hello: IResolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
