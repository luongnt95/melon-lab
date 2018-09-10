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
}) => {
  // TODO: Compute state like "isReadyToInteract".
  const state = {};

  return (
    <Query query={ethereumQuery} pollInterval={5000} ssr={false}>
      {children(state)}
    </Query>
  );
};

export default EthereumState;
