import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const isSubscription = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};

const httpUri = (global.GRAPHQL_REMOTE_HTTP || process.env.GRAPHQL_REMOTE_HTTP) as string;
const wsUri = (global.GRAPHQL_REMOTE_WS || process.env.GRAPHQL_REMOTE_WS) as string;

const createLink = options => {
  const httpLink = new HttpLink({
    uri: httpUri,
    headers: options.headers,
  });

  // Do not use the websocket link on the server.
  if (typeof window === 'undefined') {
    return httpLink;
  }

  const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
    },
  });

  return split(isSubscription, wsLink, httpLink);
};

export default (introspection) => withApollo(options => {
  const link = createLink(options);

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspection,
      }),
    }),
  });
});
