// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';
import { getParityProvider } from '@melonproject/melon.js';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import ApolloClient from 'apollo-client';
import { split, from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import withApollo from 'next-with-apollo';
import { defaults, resolvers } from '~/resolvers';

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

  const clientContext = setContext(async (operation) => {
    const endpoint = global.JSON_RPC_ENDPOINT || process.env.JSON_RPC_ENDPOINT;
    const environment = await getParityProvider(endpoint);

    return {
      environment,
    };
  });

  const stateLink = withClientState({
    cache,
    resolvers,
    defaults,
  });

  const stateLinkWithContext = from([clientContext, stateLink]);
  const httpAndStateLink = from([stateLinkWithContext, httpLink]);

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
