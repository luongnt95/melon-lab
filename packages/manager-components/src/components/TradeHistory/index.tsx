import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';

import styles from './styles.css';

export interface TradeHistoryProps {
  trades?: any;
}

export const TradeHistory: StatelessComponent<TradeHistoryProps> = ({
  trades,
}) => {
  return (
    <div className="trade-history">
      <style jsx>{styles}</style>
      <h3>Fund Trading History (Last 24 hours)</h3>
      <Table>
        <TableHead>
          <Row isHead>
            <CellHead>Time</CellHead>
            <CellHead>Type</CellHead>
            <CellHead textAlign="right">Price</CellHead>
            <CellHead>Buy</CellHead>
            <CellHead>Sell</CellHead>
            <CellHead textAlign="right">Amount</CellHead>
          </Row>
        </TableHead>
        <TableBody>
          {trades &&
            trades.map((trade, i) => (
              <Row key={`trade-${i}`}>
                <CellBody>{trade.timestamp}</CellBody>
                <CellBody>
                  <span
                    className={
                      trade.type === 'buy'
                        ? 'trade-history__type--buy'
                        : 'trade-history__type--sell'
                    }
                  >
                    {trade.type}
                  </span>
                </CellBody>
                <CellBody textAlign="right">{trade.price}</CellBody>
                <CellBody>{trade.buyToken}</CellBody>
                <CellBody>{trade.sellToken}</CellBody>
                <CellBody textAlign="right">{trade.quantity}</CellBody>
              </Row>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradeHistory;
