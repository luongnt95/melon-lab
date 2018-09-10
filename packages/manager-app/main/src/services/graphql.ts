import schema from '@melonproject/graphql-schema';
import { getConfig, getParityProvider } from '@melonproject/melon.js';
import { ipcMain } from 'electron';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from '~/ipc/graphql/server';
import getNextConfig from 'next/config';

const { publicRuntimeConfig: nextConfig } = getNextConfig();

function retrieveNetwork(track: string) {
  switch (track) {
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
  const environment = {
    ...(await getParityProvider(nextConfig.jsonRpcEndpoint)),
    track: nextConfig.track,
  };

  const config = await getConfig(environment);
  const network = retrieveNetwork(config.track);

  return new SubscriptionServer(
    {
      channel: 'graphql',
      messenger: ipcMain,
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
