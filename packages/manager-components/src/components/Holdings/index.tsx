import React, { Fragment, StatelessComponent } from 'react';
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
  const onClick = (e, assetName) => {
    selectAsset(assetName, isReadyToTrade, quoteAsset);
  };

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
            {holdings && holdings.map(asset => (
              <Row key={asset.name} size="small">
                <CellBody>{asset.name}</CellBody>
                <CellBody>{asset.balance}</CellBody>
                <CellBody>
                  {dataValid && <Fragment>{asset.percentage}</Fragment>}
                </CellBody>
                <CellBody>
                  {dataValid && <Fragment>{asset.price}</Fragment>}
                </CellBody>
                <CellBody cellClass="holdings__action-cell">
                  {asset.name === quoteAsset ? (
                    <span className="holdings__quote-asset" />
                  ) : asset.name !== quoteAsset &&
                  isReadyToTrade &&
                  dataValid ? (
                    <Button
                      size="small"
                      buttonValue={asset.name}
                      onClick={onClick}
                    >
                      Buy/Sell
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      buttonValue={asset.name}
                      onClick={onClick}
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
