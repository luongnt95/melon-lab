import React, { StatelessComponent } from 'react';
import classNames from 'classnames';

import styles from './styles.css';

export interface RecentTradesProps {
  baseTokenSymbol: string;
  quoteTokenSymbol: string;
  trades: any;
}

export const RecentTrades: StatelessComponent<RecentTradesProps> = ({
  baseTokenSymbol,
  quoteTokenSymbol,
  trades,
}) => {
  const classnameTypeCell = type =>
    classNames(
      'recent-trades__cell',
      {
        'recent-trades__cell--red': type === 'sell',
      },
      {
        'recent-trades__cell--green': type === 'buy',
      },
    );

  return (
    <div className="recent-trades">
      <style jsx>{styles}</style>
      <h3>
        Recent trades for {baseTokenSymbol}/{quoteTokenSymbol}
      </h3>
      <table className="recent-trades__table">
        <thead>
          <tr className="recent-trades__row recent-trades__row-head">
            <th className="recent-trades__cell">Time</th>
            <th className="recent-trades__cell">Type</th>
            <th className="recent-trades__cell">
              Price ({baseTokenSymbol}/{quoteTokenSymbol})
            </th>
            <th className="recent-trades__cell">Amount ({baseTokenSymbol})</th>
          </tr>
        </thead>
        <tbody>
          {trades.reverse().map((trade, index) => (
            <tr className="recent-trades__row recent-trades__row-body" key={index}>
              <td className="recent-trades__cell">{trade.timestamp}</td>
              <td className={classnameTypeCell(trade.type)}>{trade.type}</td>
              <td className="recent-trades__cell">{trade.price}</td>
              <td className="recent-trades__cell">{trade.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTrades;
