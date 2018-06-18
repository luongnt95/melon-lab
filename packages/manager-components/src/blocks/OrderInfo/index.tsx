import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface OrderInfoProps {
  lastPrice?: number;
  bid?: number;
  ask?: number;
  balances?: Array<[object]>;
}

const Balanaces = balances =>
  balances.items.map(balance => (
    <div key={balance.name} className="order-info__balance">
      <span className="order-info__balance-desc">{balance.name}:</span>{' '}
      {balance.value}
    </div>
  ));

const OrderInfo: StatelessComponent<OrderInfoProps> = ({
  lastPrice,
  bid,
  ask,
  balances,
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
        {balances && balances.length > 0 && <Balanaces items={balances} />}
      </div>
    </div>
  );
};

export default OrderInfo;
