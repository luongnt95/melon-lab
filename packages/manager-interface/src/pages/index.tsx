import ReactModal from 'react-modal';
import AppContainer from '~/legacy/containers/App';

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#__next');

  if (process.env.NODE_ENV !== "development") {
    window.onbeforeunload = () =>
      "You're session will be terminated. Did you save your mnemonic and/or JSON wallet?";
  }
}

export default AppContainer;
