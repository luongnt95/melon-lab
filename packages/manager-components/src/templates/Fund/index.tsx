import React from 'react';

import styles from './styles.css';

const Fund = ({
  tradeInfo,
  holdings,
  orderForm,
  orderbook,
  openOrders,
  recentTrades,
}) => {
  return (
    <div className="trade">
      <style jsx>{styles}</style>
      <div className="trade__info">
        {React.Children.map(
          tradeInfo,
          child => child && <div className="trade__info-item">{child}</div>,
        )}
      </div>
      <div className="trade__holdings">{holdings}</div>
      <div className="trade__order">
        <div className="trade__order-book" id="orderbook">
          {orderbook}
        </div>
        <div className="trade__order-form" id="trade">
          <h3>Trade</h3>
          {orderForm}
        </div>
      </div>
      <div className="trade__open-orders">{openOrders}</div>
      <div className="trade__recent-trades">{recentTrades}</div>
    </div>
  );
};

export default Fund;
