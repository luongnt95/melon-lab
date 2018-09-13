import RestoreWallet from '~/components/RestoreWallet/container';
import { compose, withProps, withHandlers } from 'recompose';

const withRestoreWalletHandlers = withHandlers({
  onSubmit: props => mnemonic => {
    console.log('click submit');
  },
});

const withRestoreWalletProps = withProps(props => {
  return {
    form: {
      mnemonic: '',
    },
  };
});

const withRestoreWallet = BaseComponent => baseProps => (
  <BaseComponent initialValues={baseProps.form} onSubmit={baseProps.onSubmit} />
);

export default compose(
  withRestoreWalletProps,
  withRestoreWalletHandlers,
  withRestoreWallet,
)(RestoreWallet);
