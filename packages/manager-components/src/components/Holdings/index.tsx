import React, { StatelessComponent } from 'react';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface HoldingsProps {
  holdings?: any;
  selectAsset?: any;
  isReadyToTrade?: boolean;
  dataValid?: boolean;
  quoteAsset?: any;
}

export const Holdings: StatelessComponent<HoldingsProps> = ({
  holdings,
  selectAsset,
  isReadyToTrade,
  dataValid,
  quoteAsset,
}) => {
  return (
    <div className="holdings">
      <style jsx>{styles}</style>
      <h3>Fund Holdings</h3>
      <div className="holdings__table-wrap">
        <Table>
          <TableHead>
            <Row isHead={true}>
              <CellHead>Asset</CellHead>
              <CellHead>Quantity</CellHead>
              <CellHead>% of portfolio</CellHead>
              <CellHead>Price (MLN)</CellHead>
              <CellHead />
            </Row>
          </TableHead>
          <TableBody>
            {holdings.map(asset => (
              <Row key={asset.name}>
                <CellBody>{asset.name}</CellBody>
                <CellBody>{asset.balance}</CellBody>
                <CellBody>{asset.percentage}</CellBody>
                <CellBody>{asset.price}</CellBody>
                <CellBody cellClass="holdings__action-cell">
                  {asset.name === quoteAsset ? (
                    <span className="holdings__quote-asset" />
                  ) : asset.name !== quoteAsset &&
                  isReadyToTrade &&
                  dataValid ? (
                    <Button
                      size="small"
                      onClick={() =>
                        selectAsset(asset.name, isReadyToTrade, quoteAsset)
                      }
                    >
                      <span className="interactive">Buy/Sell</span>
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      onClick={() =>
                        selectAsset(asset.name, isReadyToTrade, quoteAsset)
                      }
                    >
                      <span className="interactive">See Orderbook</span>
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
