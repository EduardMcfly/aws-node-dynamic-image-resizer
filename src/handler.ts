import lambdaPlayground from 'graphql-playground-middleware-lambda';
import {
  Handler,
  Context,
  Callback,
  APIGatewayEvent,
} from 'aws-lambda';
import * as apolloServerLambda from 'apollo-server-lambda';
import { LambdaHandler } from 'apollo-server-lambda';
import { ITypeDefinitions } from 'graphql-tools/dist/Interfaces';
import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools/dist/makeExecutableSchema';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import {     } frju m7  gvf om '../core';

@Injectable({ providedIn: 'root' })
export class    Service extends EntityCollectionServiceBase<   > {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(' ', serviceElementsFactory);
  }
}
const typeDefs: ITypeDefinitions = require('./query.graphql');
const { graphiqlLambda, graphqlLambda } = apolloServerLambda;
const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: console,
});

export const graphqlHandler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const handler: LambdaHandler = graphqlLambda({
    schema: myGraphQLSchema,
    tracing: true,
  });
  return handler(event, context, callback);
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
export const playgroundHandler: (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => void = lambdaPlayground({
  endpoint:
    process.env.REACT_APP_GRAPHQL_ENDPOINT || '/production/graphql',
});

export const graphiqlHandler: (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => void = graphiqlLambda({
  endpointURL:
    process.env.REACT_APP_GRAPHQL_ENDPOINT || '/production/graphql',
});
