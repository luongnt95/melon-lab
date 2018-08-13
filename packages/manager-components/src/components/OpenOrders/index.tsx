import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';

import styles from './styles.css';

export interface Order {
  buyHowMuch: string;
  buySymbol: string;
  id: number;
  price: string;
  sellHowMuch: string;
  sellSymbol: string;
  timestamp: string;
  type: string;
}

export interface OpenOrdersProps {
  orders?: Order[];
  onClick?: (id, buySymbol, sellSymbol) => void;
  isReadyToTrade?: boolean;
  isManager?: boolean;
}

export const OpenOrders: StatelessComponent<OpenOrdersProps> = ({
  orders,
  onClick,
  isReadyToTrade,
  isManager,
}) => {
  const onCancel = (e, data) => {
    if (onClick) {
      onClick(data.id, data.buySymbol, data.sellSymbol);
    }
  };

  const classnameTypeCell = type =>
    classNames(
      'open-orders__cell',
      {
        'open-orders__cell--red': type === 'sell',
      },
      {
        'open-orders__cell--green': type === 'buy',
      },
    );

  return (
    <div className="open-orders">
      <style jsx>{styles}</style>
      <h3>Open orders</h3>
      <div className="open-orders__table-wrap">
        {orders.length > 0 ? (
          <Table>
            <TableHead>
              <Row isHead={true} size={isManager && 'small'}>
                <CellHead>Time</CellHead>
                <CellHead>Id</CellHead>
                <CellHead>Type</CellHead>
                <CellHead>Buy</CellHead>
                <CellHead>Sell</CellHead>
                <CellHead>Price</CellHead>
                <CellHead>Buy Quantity</CellHead>
                <CellHead>Sell Quantity</CellHead>
                {isManager && <CellHead />}
              </Row>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map(order => (
                  <Row key={order.id} size={isManager && 'small'}>
                    <CellBody>{order.timestamp}</CellBody>
                    <CellBody>{order.id}</CellBody>
                    <CellBody>
                      <span className={classnameTypeCell(order.type)}>
                        {order.type}
                      </span>
                    </CellBody>
                    <CellBody>{order.sellSymbol}</CellBody>
                    <CellBody>{order.buySymbol}</CellBody>
                    <CellBody>{order.price}</CellBody>
                    <CellBody>{order.sellHowMuch}</CellBody>
                    <CellBody>{order.buyHowMuch}</CellBody>
                    {isManager && (
                      <CellBody>
                        <Button
                          size="small"
                          style="secondary"
                          buttonValue={{
                            id: order.id,
                            buySymbol: order.buySymbol,
                            sellSymbol: order.sellSymbol,
                          }}
                          onClick={onCancel}
                          disabled={!isReadyToTrade}
                        >
                          Cancel
                        </Button>
                      </CellBody>
                    )}
                  </Row>
                ))}
            </TableBody>
          </Table>
        ) : (
          <p>No open orders</p>
        )}
      </div>
    </div>
  );
};

export default OpenOrders;
