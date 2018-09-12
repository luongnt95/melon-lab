import GenerateWallet from '~/components/GenerateWallet';
import { compose, withHandlers } from 'recompose';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Router from 'next/router';

const withGenerateWalletHandlers = withHandlers({
  restore: props => asset => {
    Router.push({
      pathname: '/wallet/restore',
    });
  },
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
        loading={props.loading}
      />
    )}
  </Query>
);

export default compose(
  withGenerateWallet,
  withGenerateWalletHandlers,
)(GenerateWallet);
