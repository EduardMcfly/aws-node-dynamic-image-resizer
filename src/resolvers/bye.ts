import { IResolvers } from 'graphql-tools';

export const bye: IResolvers = {
  Query: {
    bye: () => 'Bye',
  },
};
