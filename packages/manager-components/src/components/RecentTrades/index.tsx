import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
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
      <div className="recent-trades__table-wrap">
        <Table>
          <TableHead>
            <Row isHead={true}>
              <CellHead>Time</CellHead>
              <CellHead>Type</CellHead>
              <CellHead>
                Price ({baseTokenSymbol}/{quoteTokenSymbol})
              </CellHead>
              <CellHead>Amount ({baseTokenSymbol})</CellHead>
            </Row>
          </TableHead>
          <TableBody>
            {trades.reverse().map((trade, index) => (
              <Row key={index}>
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
    </div>
  );
};

export default RecentTrades;
