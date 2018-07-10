import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import withApollo from 'next-with-apollo';

export default (introspection) => withApollo({
  link: {
    http: options =>
      new HttpLink({
        uri: process.env.GRAPHQL_REMOTE_HTTP as string,
        headers: options.headers,
      }),
    ws: () =>
      new WebSocketLink({
        uri: process.env.GRAPHQL_REMOTE_WS as string,
        reconnect: true,
        timeout: 30000,
      }),
  },
  client: options => ({
    link: options.link,
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspection,
      }),
    }),
  }),
});
