import GenerateWallet from '~/components/GenerateWallet/container';
import { compose, withHandlers, withProps } from 'recompose';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Router from 'next/router';

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

const storeWalletMutation = gql`
  mutation storeWalletMutation {
    storeWallet(mnemonic: $mnemonic, password: $password) @client
  }
`;

const withGenerateWallet = BaseComponent => baseProps => (
  <Mutation mutation={storeWalletMutation}>
    {(storeWallet, mutationProps) => (
      <Query query={generateWalletQuery} ssr={false}>
        {props => (
          <BaseComponent
            mnemonic={props.data && props.data.mnemonic}
            initialValues={baseProps.initialValues}
            onSubmit={values =>
              storeWallet({
                variables: {
                  mnemonic: values.mnemonic,
                  password: values.password,
                },
              }).then(() =>
                Router.push({
                  pathname: '/wallet',
                }),
              )
            }
            loading={props.loading || mutationProps.loading}
          />
        )}
      </Query>
    )}
  </Mutation>
);

export default compose(
  withGenerateWallet,
  withGenerateWalletProps,
)(GenerateWallet);
