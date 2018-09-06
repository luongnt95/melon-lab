// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import ApolloClient from 'apollo-client';
import { split, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import withApollo from 'next-with-apollo';
import gql from 'graphql-tag';
import { getParityProvider } from '@melonproject/melon.js';

const isSubscription = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};

const httpUri = (global.GRAPHQL_REMOTE_HTTP || process.env.GRAPHQL_REMOTE_HTTP) as string;
const wsUri = (global.GRAPHQL_REMOTE_WS || process.env.GRAPHQL_REMOTE_WS) as string;

const createLink = (options, cache) => {
  const httpLink = new HttpLink({
    uri: httpUri,
    headers: options.headers,
  });

  const stateLink = withClientState({
    cache,
    resolvers: {
      Query: {
        ethereumNetwork: async () => {
          const endpoint = global.JSON_RPC_ENDPOINT || process.env.JSON_RPC_ENDPOINT;
          const environment = await getParityProvider(endpoint);
          const network = await environment.api.net.version();
          return network;
        },
      },
      Mutation: {
        rankingOrdering: (parent, args, { cache }) => {
          const query = gql`
            query RankingOrderingQuery {
              rankingOrdering @client
            }
          `;

          cache.writeQuery({ query, data: {
            rankingOrdering: args.order,
          }});

          return args.order;
        },
        rankingSearchString: (parent, args, { cache }) => {
          const query = gql`
            query RankingSearchStringQuery {
              rankingSearchString @client
            }
          `;

          cache.writeQuery({ query, data: {
            rankingSearchString: args.search,
          }});

          return args.search;
        },
      },
    },
    defaults: {
      ethereumNetwork: null,
      rankingOrdering: '+rank',
      rankingSearchString: '',
    },
  });

  const httpAndStateLink = from([stateLink, httpLink]);

  // Do not use the websocket link on the server.
  if (typeof window === 'undefined') {
    return httpAndStateLink;
  }

  const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
    },
  });

  return split(isSubscription, wsLink, httpAndStateLink);
};

export const createClient = options => {
  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspection,
    }),
  });

  const link = createLink(options, cache);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache,
  });
};

export default withApollo(options => {
  return createClient(options);
});
