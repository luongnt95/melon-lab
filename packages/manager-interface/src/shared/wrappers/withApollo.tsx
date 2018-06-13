// Based on the environment, this file will either load the IPC (electron),
// or the HTTP/WS transport.
import withApolloFinal from '~/apollo';

// Import the introspection results (handled with a custom webpack loader)
// for the schema.
import introspection from '@melonproject/graphql-schema/schema.gql';

export default withApolloFinal(introspection);
