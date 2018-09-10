import { compose } from 'recompose';
import Orderbook from '@melonproject/manager-components/components/Orderbook';
import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const subscription = gql`
  subscription OrderbookQuery($baseToken: Symbol!, $quoteToken: Symbol!) {
    orderbook(
      baseTokenSymbol: $baseToken
      quoteTokenSymbol: $quoteToken
      exchanges: [OASIS_DEX, RADAR_RELAY, ERC_DEX]
    ) {
      totalBuyVolume
      totalSellVolume
      buyEntries {
        volume
        order {
          ... on OasisDexOrder {
            id
          }

          ... on ZeroExOrder {
            id: salt
            expiration
            feeRecipient
            makerFee
            takerFee
            salt
            signature {
              v
              r
              s
            }
            maker
            taker
          }

          price
          sell {
            howMuch
            symbol
          }

          buy {
            howMuch
            symbol
          }
          type
          exchange
          exchangeContractAddress
          isActive
        }
      }
      sellEntries {
        volume
        order {
          ... on OasisDexOrder {
            id
          }

          ... on ZeroExOrder {
            id: salt
            expiration
            feeRecipient
            makerFee
            takerFee
            salt
            signature {
              v
              r
              s
            }
            maker
            taker
          }

          price
          buy {
            howMuch
            symbol
          }
          sell {
            howMuch
            symbol
          }
          type
          exchange
          exchangeContractAddress
          isActive
        }
      }
    }
  }
`;

// TODO: Add network & isReadyToTrade
// const mapStateToProps = state => ({
//   isReadyToTrade: state.app.isReadyToTrade,
//   network: state.ethereum.network,
// });

// const withState = connect(
//   mapStateToProps,
// );

const withSubscription = BaseComponent => baseProps => (
  <Subscription
    subscription={subscription}
    variables={{
      // @TODO: Move "..." to the rendering part
      baseToken: baseProps.baseAsset,
      quoteToken: baseProps.quoteAsset,
      network: baseProps.network === '42' ? 'KOVAN' : 'LIVE',
    }}
  >
    {props => (
      <BaseComponent
        {...baseProps}
        orderbook={props.data && props.data.orderbook}
        loading={props.loading}
      />
    )}
  </Subscription>
);

export default compose(
  withSubscription,
)(Orderbook);
