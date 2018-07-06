import { takeLatest, call, put, take, select, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  getWallet,
  createWallet,
  encryptWallet,
  importWalletFromMnemonic,
  decryptWallet,
  setEnvironment,
} from '@melonproject/melon.js';
import { actions as modalActions, types as modalTypes } from '../actions/modal';
import { types, actions } from '../actions/wallet';
import {
  actions as ethereumActions,
  types as ethereumTypes,
} from '../actions/ethereum';
import {
  actions as routeActions,
  types as routeTypes,
} from '../actions/routes';

// function* encryptWalletSaga(wallet, password) {
//   const encryptedWallet = yield call(encryptWallet, wallet, password);
//   localStorage.setItem('wallet:melon.fund', encryptedWallet);
//   yield put(actions.encryptWalletSucceeded());
//   yield put(ethereumActions.accountChanged(`${wallet.address}`));
//   setEnvironment({ account: JSON.parse(encryptedWallet) });
// }

// from https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
const createDownload = (data, filename, mime) => {
  var blob = new Blob([data], { type: mime || 'application/octet-stream' });

  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var blobURL = window.URL.createObjectURL(blob);
    var tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
};

function* storeWallet(wallet) {
  const isElectron = yield select(state => state.app.isElectron);

  console.log(wallet);

  if (!isElectron && process.env.NODE_ENV === 'development') {
    console.warn(
      'Development environment detected. Storing unencrypted wallet on localStorage!',
    );
    localStorage.setItem('wallet:melon.fund', JSON.stringify(wallet));
  } else if (isElectron) {
    global.ipcRenderer.send('store-wallet', wallet.address, wallet.privateKey);
  }
}

function* generateMnemonic() {
  try {
    yield put(actions.generateWalletSucceeded(createWallet().mnemonic));
  } catch (err) {
    console.error(err);
    yield put(actions.generateWalletFailed(err));
  }
}

function* restoreWalletSaga({ mnemonic }) {
  try {
    const wallet = yield importWalletFromMnemonic(mnemonic);
    setEnvironment({ account: wallet });
    yield put(actions.restoreFromMnemonicSucceeded(wallet));
    yield call(storeWallet, wallet);
    yield put(routeActions.wallet());
    yield put(ethereumActions.accountChanged(`${wallet.address}`));
  } catch (err) {
    console.error(err);
    yield put(actions.restoreFromMnemonicFailed(err));
  }
}

function* deleteWallet() {
  const isElectron = yield select(state => state.app.isElectron);
  yield put(
    modalActions.confirm({
      body: `Do you really want to erase your current wallet? If yes, please type your password below:`,
    }),
  );
  yield take(modalTypes.CONFIRMED);
  yield put(actions.doDeleteWallet());
  yield put(ethereumActions.accountChanged());
  // Delete local storage wallet anyways. If in production, they key should
  // not exist. If it exists, then deletion is ok anyways
  localStorage.removeItem('wallet:melon.fund');
  if (isElectron) {
    const address = yield select(state => state.ethereum.account);
    global.ipcRenderer.send('delete-wallet', address);
  }
  yield put(routeActions.root());
}

function* downloadJSON() {
  yield put(
    modalActions.password(
      `Please type a strong password to encrypt your wallet JSON with:`,
    ),
  );
  const { password } = yield take(modalTypes.PASSWORD_ENTERED);

  if (password.length < 8) {
    yield put(
      modalActions.error(
        'Password needs to be at least 8 chars long. For your security!',
      ),
    );
    return;
  }

  yield put(modalActions.password(`Confirm password:`));
  const { password: confirm } = yield take(modalTypes.PASSWORD_ENTERED);

  if (password !== confirm) {
    yield put(modalActions.error("The entered passwords didn't match"));
    return;
  }

  yield put(modalActions.loading());
  const privateKey = yield select(state => state.wallet.privateKey);
  const address = yield select(state => state.ethereum.account);
  const wallet = getWallet(privateKey);
  const encryptedWallet = yield call(encryptWallet, wallet, password);

  createDownload(
    encryptedWallet,
    `olympiad.melon.fund-${address}.json`,
    'application/json',
  );

  yield put(modalActions.close());
}

function* importWallet({ encryptedWalletString }) {
  try {
    yield put(
      modalActions.password(
        `Enter the password this wallet is encrypted with:`,
      ),
    );

    const { password } = yield take(modalTypes.PASSWORD_ENTERED);
    yield put(modalActions.loading('Decrypting ...'));
    const decryptedWallet = yield call(
      decryptWallet,
      encryptedWalletString,
      password,
    );
    setEnvironment({ account: decryptedWallet });
    yield put(actions.importWalletSucceeded(decryptedWallet));
    yield call(storeWallet, decryptedWallet);
    yield put(ethereumActions.accountChanged(`${decryptedWallet.address}`));
    yield put(routeActions.wallet());
    yield put(modalActions.close());
  } catch (e) {
    console.error(e);
    yield put(actions.importWalletFailed(e));
    yield put(modalActions.error('Failed to decrypt wallet. Wrong password?'));
  }
}

function* loadFromKeytar({ password }) {
  try {
    const wallet = getWallet(password);
    yield put(actions.importWalletSucceeded(wallet));
    setEnvironment({ account: wallet });
    yield put(ethereumActions.accountChanged(`${decryptedWallet.address}`));
  } catch (e) {
    console.error(e);
    yield put(actions.importWalletFailed(e));
    yield put(modalActions.error('Failed to load wallet'));
  }
}

function* keytarChannel() {
  const ipcChannel = eventChannel(emitter => {
    global.ipcRenderer.on('get-wallets-success', wallets => {
      if (wallets.length > 1) {
        emitter(
          modalActions.info({
            title: 'Loaded wallet',
            body: `We found ${
              wallets.length
            } wallets in your operating system keystore but we only support one. We just took the first (${
              wallets[0].account
            }). If that is the wrong one, backup & remove the wrong ones. You can find them in your operating systems keystore (Keychain Access on Mac) and search for "melon.fund"`,
          }),
        );
      }

      if (wallets > 0) {
        emitter({ loadFromKeytar: wallets[0] });
      } else {
        console.log('No wallets found in OS keystore');
      }
    });

    global.ipcRenderer.on('get-wallets-error', error => {
      console.error(error);
      emitter(
        modalActions.error(`There was an error loading your wallet. ${error}`),
      );
    });

    global.ipcRenderer.on('store-wallet-success', address => {
      emitter(
        modalActions.info({
          title: 'Wallet securely stored',
          body: `Your wallet (${address}) is securely stored in your operating systems keystore`,
        }),
      );
    });

    global.ipcRenderer.on('store-wallet-error', error => {
      console.error(error);
      emitter(
        modalActions.error(`There was an error storing your wallet. ${error}`),
      );
    });

    global.ipcRenderer.on('delete-wallet-success', (address, deleted) => {
      deleted
        ? emitter(
            modalActions.info({
              title: 'Wallet deleted',
              body: `Your wallet (${address}) is securely stored in your operating systems keystore`,
            }),
          )
        : emitter(
            modalActions.error(
              `No wallet found in OS keystore with address. ${address}`,
            ),
          );
    });

    global.ipcRenderer.on('delete-wallet-error', error => {
      console.error(error);
      emitter(
        modalActions.error(`There was an error deleting your wallet. ${error}`),
      );
    });

    return () => {
      global.ipcRenderer.removeAllListener('get-wallets-success');
      global.ipcRenderer.removeAllListener('get-wallets-error');
      global.ipcRenderer.removeAllListener('store-wallet-success');
      global.ipcRenderer.removeAllListener('store-wallet-error');
      global.ipcRenderer.removeAllListener('delete-wallet-success');
      global.ipcRenderer.removeAllListener('delete-wallet-error');
    };
  });

  while (true) {
    const action = yield take(ipcChannel);

    if (action.loadFromKeytar) {
      yield fork(loadFromKeytar, action.loadFromKeytar);
    } else {
      yield put(action);
    }
  }
}

function* wallet() {
  yield takeLatest(types.RESTORE_FROM_MNEMONIC_REQUESTED, restoreWalletSaga);
  yield takeLatest(types.DELETE_WALLET_REQUESTED, deleteWallet);
  yield takeLatest(types.IMPORT_WALLET_REQUESTED, importWallet);
  yield takeLatest(types.DOWNLOAD_JSON, downloadJSON);
  yield takeLatest(routeTypes.WALLET_GENERATE, generateMnemonic);
  if (global.isElectron) yield fork(keytarChannel);
}

export default wallet;
