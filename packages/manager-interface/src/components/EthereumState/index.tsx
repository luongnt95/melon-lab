import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const ethereumQuery = gql`
  query EthereumQuery {
    ethereumNetwork @client
  }
`;

const EthereumState = ({
  loading,
  data,
  children,
}) => (
  <Query query={ethereumQuery} pollInterval={5000} ssr={false}>
    {(props) => {
      // TODO: Compute state like "isReadyToInteract".
      const state = {};

      return children(state);
    }}
  </Query>
);

export default EthereumState;
