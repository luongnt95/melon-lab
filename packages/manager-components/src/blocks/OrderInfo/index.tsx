import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface OrderInfoProps {
  lastPrice: number;
  bid: number;
  ask: number;
  tokens: {
    [key: string]: {
      name: string;
      balance: number;
    };
  };
}

const OrderInfo: StatelessComponent<OrderInfoProps> = ({
  lastPrice,
  bid,
  ask,
  tokens,
}) => {
  return (
    <div className="order-info">
      <style jsx>{styles}</style>
      <div className="order-info__prices">
        <div className="order-info__last-price">
          {lastPrice} <span className="order-info__price-desc">Last Price</span>
        </div>
        <div className="order-info__bid">
          {bid} <span className="order-info__price-desc">Bid</span>
        </div>
        <div className="order-info__ask">
          {ask} <span className="order-info__price-desc">Ask</span>
        </div>
      </div>
      <div className="order-info__balances">
        <div className="order-info__balance">
          <span className="order-info__balance-desc">
            {tokens.baseToken.name}:
          </span>{' '}
          {tokens.baseToken.balance}
        </div>
        <div className="order-info__balance">
          <span className="order-info__balance-desc">
            {tokens.quoteToken.name}:
          </span>{' '}
          {tokens.quoteToken.balance}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
