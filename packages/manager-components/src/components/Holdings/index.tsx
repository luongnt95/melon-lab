import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Loading from '~/blocks/Loading';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';

import styles from './styles.css';

export interface Holding {
  balance: string;
  symbol: string;
  fraction: string;
  price: string;
}

export interface HoldingsProps {
  holdings?: Holding[];
  isReadyToTrade?: boolean;
  quoteAsset?: string;
  selectAsset?: (assetName, isReadyToTrade, quoteAsset) => void;
}

export const Holdings: StatelessComponent<HoldingsProps> = ({
  holdings,
  isReadyToTrade,
  quoteAsset,
  selectAsset,
}) => {
  const onClick = (e: any, assetName: string): void =>
    selectAsset && selectAsset(assetName, isReadyToTrade, quoteAsset);

  return (
    <div className="holdings" id="holdings">
      <style jsx>{styles}</style>
      <h3>Fund Holdings</h3>
      <div className="holdings__table-wrap">
        <Table>
          <TableHead>
            <Row isHead={true}>
              <CellHead>Asset</CellHead>
              <CellHead>Quantity</CellHead>
              <CellHead textAlign="right">% of portfolio</CellHead>
              <CellHead textAlign="right">Price (MLN)</CellHead>
              <CellHead textAlign="right" />
            </Row>
          </TableHead>
          <TableBody>
            {holdings &&
              holdings.map(asset => (
                <Row key={asset.symbol} size="small">
                  <CellBody>{asset.symbol}</CellBody>
                  <CellBody>{asset.balance}</CellBody>
                  <CellBody textAlign="right">{asset.fraction}%</CellBody>
                  <CellBody textAlign="right">{asset.price}</CellBody>
                  <CellBody textAlign="right" cellClass="holdings__action-cell">
                    {asset.symbol === quoteAsset ? (
                      <span className="holdings__quote-asset" />
                    ) : asset.symbol !== quoteAsset && isReadyToTrade ? (
                      <Button
                        size="small"
                        buttonValue={asset.symbol}
                        onClick={onClick}
                        style="secondary"
                      >
                        Buy/Sell
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        buttonValue={asset.symbol}
                        onClick={onClick}
                        style="secondary"
                      >
                        See Orderbook
                      </Button>
                    )}
                  </CellBody>
                </Row>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Holdings;
