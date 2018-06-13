import { GraphQLSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import * as typeDefs from './schema.gql';

export interface Context {
  pubsub: PubSub;
}

export const makeContext = (pubsub: PubSub): Context => ({
  pubsub,
});

export default makeExecutableSchema({
  typeDefs,
  resolvers,
}) as GraphQLSchema;
