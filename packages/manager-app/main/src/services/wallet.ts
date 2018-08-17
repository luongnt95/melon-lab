import * as keytar from 'keytar';
import { ipcMain } from 'electron';

const KEYCHAIN_SERVICE_NAME = 'melon.fund';

const registerIpcMessageHandler = (name, handler) =>
  ipcMain.on(name, async (event, requestId, ...params) => {
    try {
      const result = await handler(...params);
      event.sender.send(`${name}-success`, requestId, ...result);
    }
    catch (error) {
      event.sender.send(`${name}-error`, requestId, error);
    }
  });

const linkKeytar = () => {
  registerIpcMessageHandler('get-wallets', () => {
    return keytar.findCredentials(KEYCHAIN_SERVICE_NAME);
  });

  registerIpcMessageHandler('store-wallet', (address, encryptedWallet) => {
    return keytar.setPassword(KEYCHAIN_SERVICE_NAME, address, encryptedWallet);
  });

  registerIpcMessageHandler('delete-wallet', address => {
    return keytar.deletePassword(KEYCHAIN_SERVICE_NAME, address);
  });
};

export default linkKeytar;
