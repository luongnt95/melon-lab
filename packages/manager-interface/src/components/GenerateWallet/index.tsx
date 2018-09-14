import GenerateWallet from '~/components/GenerateWallet/container';
import { compose, withHandlers, withProps } from 'recompose';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Router from 'next/router';

const withGenerateWalletHandlers = withHandlers({
  onSubmit: props => values => {
    Router.push({
      pathname: '/wallet/restore',
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
