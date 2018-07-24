import React, { StatelessComponent } from 'react';
import classNames from 'classnames';
import {
  Table,
  TableBody,
  TableHead,
  CellBody,
  CellHead,
  Row,
} from '~/blocks/Table';

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
      <Table>
        <TableHead>
          <Row
            isHead={true}
            className="recent-trades__row recent-trades__row-head"
          >
            <CellHead className="recent-trades__cell">Time</CellHead>
            <CellHead className="recent-trades__cell">Type</CellHead>
            <CellHead className="recent-trades__cell">
              Price ({baseTokenSymbol}/{quoteTokenSymbol})
            </CellHead>
            <CellHead className="recent-trades__cell">
              Amount ({baseTokenSymbol})
            </CellHead>
          </Row>
        </TableHead>
        <TableBody>
          {trades.reverse().map((trade, index) => (
            <Row
              className="recent-trades__row recent-trades__row-body"
              key={index}
            >
              <CellBody>{trade.timestamp}</CellBody>
              <CellBody>
                <span className={classnameTypeCell(trade.type)}>
                  {trade.type}
                </span>
              </CellBody>
              <CellBody>{trade.price}</CellBody>
              <CellBody>{trade.quantity}</CellBody>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentTrades;
