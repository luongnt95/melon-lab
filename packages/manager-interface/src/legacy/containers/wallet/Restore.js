import { connect } from 'react-redux';
import { importWalletFromMnemonic } from '@melonproject/melon.js';
import { actions } from '../../actions/wallet';
import RestoreWallet from '@melonproject/manager-components/components/RestoreWallet/container';

const mapStateToProps = state => ({
  initialValues: {
    mnemonic: '',
  },
  error: state.wallet.reason,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    try {
      importWalletFromMnemonic(values.mnemonic);
      dispatch(actions.restoreFromMnemonic(values.mnemonic));
    } catch (err) {
      dispatch(actions.restoreFromMnemonicFailed('Invalid BIP39 mnemonic'));
    }
  },
});

const RestoreForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestoreWallet);

export default RestoreForm;
