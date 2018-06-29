import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import * as typeDefs from './schema.gql';

export type Network = 'KOVAN' | 'LIVE';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
}) as GraphQLSchema;
