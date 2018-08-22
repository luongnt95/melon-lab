// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { SubscriptionClient } from '~/ipc/graphql/client';

const client = new SubscriptionClient({
  messenger: global.ipcRenderer,
  channel: 'graphql',
});

export default withApollo(() => {
  const link = new ApolloLink(operation => client.request(operation));

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspection,
      }),
    }),
  });
});
