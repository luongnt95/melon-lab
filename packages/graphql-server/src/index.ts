import schema, { Network } from '@melonproject/graphql-schema';
import { getConfig, getParityProvider } from '@melonproject/melon.js';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLServer } from 'graphql-yoga';

function retrieveNetwork(network: string): Network {
  switch (network.toUpperCase()) {
    case 'LIVE':
      return 'LIVE';
    case 'KOVAN':
      return 'KOVAN';
    default:
      return 'KOVAN';
  }
}

async function start(port: number) {
  const pubsub = new PubSub();
  const network = retrieveNetwork((process.env.NETWORK as string) || 'KOVAN');
  const environment = await getParityProvider(process.env.JSON_RPC_ENDPOINT);
  const config = await getConfig(environment);

  const server = new GraphQLServer({
    schema,
    context: () => ({
      pubsub,
      network,
      config,
      environment,
    }),
  });

  await server.start({
    port,
    https: false,
  });

  // tslint:disable-next-line:no-console
  console.log(`Server is running on http://localhost:${port}`);
}

start(parseInt(process.env.PORT as string, 10));
