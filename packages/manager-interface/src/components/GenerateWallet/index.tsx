import GenerateWallet from '~/components/GenerateWallet';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const generateWalletQuery = gql`
  query GenerateWalletQuery {
    mnemonic @client
    canonicalPriceFeedAddress @client
  }
`;

const withGenerateWallet = BaseComponent => baseProps => (
  <Query query={generateWalletQuery} ssr={false}>
    {props =>
      console.log(props) || (
        <BaseComponent
          mnemonic={props.data && props.data.mnemonic}
          loading={props.loading}
        />
      )
    }
  </Query>
);

export default compose(withGenerateWallet)(GenerateWallet);
