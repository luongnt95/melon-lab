import GenerateWallet from '~/components/GenerateWallet/container';
import { compose, withHandlers, withProps } from 'recompose';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Router from 'next/router';
import {
  encryptWallet,
  importWalletFromMnemonic,
} from '@melonproject/melon.js';

const withGenerateWalletHandlers = withHandlers({
  onSubmit: props => async values => {
    const wallet = importWalletFromMnemonic(values.mnemonic);
    const encryptedWalletString = await encryptWallet(wallet, values.password);

    localStorage.setItem('wallet:melon.fund', encryptedWalletString);

    Router.push({
      pathname: '/wallet',
    });
  },
});

const withGenerateWalletProps = withProps(props => {
  return {
    initialValues: {
      mnemonic: '',
      password: '',
    },
  };
});

const generateWalletQuery = gql`
  query GenerateWalletQuery {
    mnemonic @client
  }
`;

const withGenerateWallet = BaseComponent => baseProps => (
  <Query query={generateWalletQuery} ssr={false}>
    {props => (
      <BaseComponent
        mnemonic={props.data && props.data.mnemonic}
        initialValues={baseProps.initialValues}
        loading={props.loading}
      />
    )}
  </Query>
);

export default compose(
  withGenerateWallet,
  withGenerateWalletProps,
  withGenerateWalletHandlers,
)(GenerateWallet);
