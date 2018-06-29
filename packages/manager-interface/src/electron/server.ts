import schema from '@melonproject/graphql-schema';
import { getConfig, getParityProvider } from '@melonproject/melon.js';
import { ipcMain } from 'electron';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-electron';

function retrieveNetwork(network: string): Network {
  switch (network.toUpperCase()) {
    case 'live':
      return 'LIVE';
    case 'kovan-competition':
    case 'kovan-demo':
      return 'KOVAN';
    default:
      return 'KOVAN';
  }
}

export default async () => {
  const environment = await getParityProvider(process.env.JSON_RPC_ENDPOINT);
  const config = await getConfig(environment);
  const network = retrieveNetwork(
    (process.env.TRACK as string) || 'kovan-demo',
  );

  return new SubscriptionServer(
    {
      channel: 'graphql',
      messager: ipcMain,
    },
    {
      schema,
      context: {
        pubsub: new PubSub(),
        network,
        config,
        environment,
      },
    },
  );
};
