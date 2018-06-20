import ReactModal from 'react-modal';
import AppContainer from '~/legacy/containers/App';

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#__next');

  window.onbeforeunload = () =>
    "You're session will be terminated. Did you save your mnemonic and/or JSON wallet?";
}

export default AppContainer;
