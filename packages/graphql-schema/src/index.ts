import { GraphQLSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import * as typeDefs from './schema.gql';

export type Network = "KOVAN" | "LIVE";

export interface Context {
  pubsub: PubSub;
  network: Network;
}

export const makeContext = (pubsub: PubSub, network: Network): Context => ({
  pubsub,
  network,
});

export default makeExecutableSchema({
  typeDefs,
  resolvers,
}) as GraphQLSchema;
