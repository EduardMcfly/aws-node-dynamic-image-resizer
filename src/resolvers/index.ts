import { IResolvers } from 'graphql-tools';
import { bye } from './bye';
import { hello } from './hello';

export const resolvers: IResolvers[] = [hello, bye];
