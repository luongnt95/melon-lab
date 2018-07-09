import { ipcMain } from 'electron';
import { PubSub } from 'graphql-subscriptions';
import * as keytar from 'keytar';
import { SubscriptionServer } from 'subscriptions-transport-electron';
import ipcMessages from '~/shared/constants/ipcMessages';

import schema from '@melonproject/graphql-schema';
import { getConfig, getParityProvider } from '@melonproject/melon.js';

const KEYCHAIN_SERVICE_NAME = 'melon.fund';

const linkKeytar = () => {
  ipcMain.on(ipcMessages.GET_WALLETS, (event, requestId) =>
    keytar
      .findCredentials(KEYCHAIN_SERVICE_NAME)
      .then(credentials =>
        event.sender.send(
          `${ipcMessages.GET_WALLETS}-success`,
          requestId,
          credentials,
        ),
      )
      .catch(err =>
        event.sender.send(`${ipcMessages.GET_WALLETS}-error`, requestId, err),
      ),
  );

  ipcMain.on(
    ipcMessages.STORE_WALLET,
    (event, requestId, address, encryptedWallet) =>
      keytar
        .setPassword(KEYCHAIN_SERVICE_NAME, address, encryptedWallet)
        .then(() =>
          event.sender.send(
            `${ipcMessages.STORE_WALLET}-success`,
            requestId,
            address,
          ),
        )
        .catch(err =>
          event.sender.send(
            `${ipcMessages.STORE_WALLET}-error`,
            requestId,
            err,
          ),
        ),
  );

  ipcMain.on(ipcMessages.DELETE_WALLET, (event, requestId, address) =>
    keytar
      .deletePassword(KEYCHAIN_SERVICE_NAME, address)
      .then(deleted =>
        event.sender.send(
          `${ipcMessages.DELETE_WALLET}-success`,
          requestId,
          deleted,
        ),
      )
      .catch(err =>
        event.sender.send(`${ipcMessages.DELETE_WALLET}-error`, requestId, err),
      ),
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
