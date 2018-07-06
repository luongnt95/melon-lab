import { ipcMain } from 'electron';
import { PubSub } from 'graphql-subscriptions';
import * as keytar from 'keytar';
import { SubscriptionServer } from 'subscriptions-transport-electron';

import schema from '@melonproject/graphql-schema';
import { getConfig, getParityProvider } from '@melonproject/melon.js';

const KEYCHAIN_SERVICE_NAME = 'melon.fund';

const linkKeytar = () => {
  ipcMain.on('get-wallets', event =>
    keytar
      .findCredentials(KEYCHAIN_SERVICE_NAME)
      .then(credentials =>
        event.sender.send('get-wallets-success', credentials),
      )
      .catch(err => event.sender.send('get-wallets-error', err)),
  );

  ipcMain.on('store-wallet', (event, address, privateKey) =>
    keytar
      .setPassword(KEYCHAIN_SERVICE_NAME, address, privateKey)
      .then(() => event.sender.send('store-wallet-success'))
      .catch(err => event.sender.send('store-wallet-error', err)),
  );

  ipcMain.on('delete-wallet', (event, address, privateKey) =>
    keytar
      .setPassword(KEYCHAIN_SERVICE_NAME, address, privateKey)
      .then(deleted => event.sender.send('delete-wallet-success', deleted))
      .catch(err => event.sender.send('delete-wallet-error', err)),
  );
};

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

  linkKeytar();

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
