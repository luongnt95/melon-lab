import ReactModal from 'react-modal';
import AppContainer from '~/legacy/containers/App';

const debug = require('debug')('melon-lab:manager-interface:index');

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#__next');

  debug('Starting frontend:', {
    env: {
      DEBUG: process.env.DEBUG,
      ELECTRON_PACKAGE: process.env.ELECTRON_PACKAGE,
      GRAPHQL_REMOTE_HTTP: process.env.GRAPHQL_REMOTE_HTTP,
      TRACK: process.env.TRACK,
    },
    isElectron: global.isElectron,
  });

  if (process.env.NODE_ENV !== 'development' && !global.isElectron) {
    window.onbeforeunload = () =>
      "You're session will be terminated. Did you save your mnemonic and/or JSON wallet?";
  }
}

export default AppContainer;
