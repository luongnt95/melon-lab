import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import withApollo from 'next-with-apollo';
import { SubscriptionClient } from '~/shared/ipc/client';

const isElectron =
  global.navigator &&
  global.navigator.userAgent.toLowerCase().indexOf(' electron/') !== -1;

const client =
  isElectron &&
  new SubscriptionClient({
    messenger: global.ipcRenderer,
    channel: 'graphql',
  });

export default (introspection) => withApollo({
  link: {
    http: options => new ApolloLink(operation => client.request(operation)),
    ws: () => new ApolloLink(operation => client.request(operation)),
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
