import BigNumber from 'bignumber.js';
import React, { StatelessComponent } from 'react';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface OrderbookProps {
  orderbook;
  loading;
  isReadyToTrade;
  onClick: (index) => void;
  baseToken?: string;
  quoteToken?: string;
}

const getPercentage = (cumulativeVolume, totalVolume) => {
  const percentage = new BigNumber(cumulativeVolume)
    .div(totalVolume)
    .times(100);
  return percentage;
};

export const Orderbook: StatelessComponent<OrderbookProps> = ({
  orderbook,
  loading,
  isReadyToTrade = true,
  onClick,
  baseToken,
  quoteToken,
}) => {
  return (
    <div className="orderbook">
      <style jsx>{styles}</style>
      <h3>
        Orderbook for {baseToken}/{quoteToken}
      </h3>
      {loading ? (
        <div className="orderbook__loading">
          <Spinner />
        </div>
      ) : (
        <div className="orderbook__tables">
          <div className="orderbook__table orderbook__table-buy">
            <div>
              <div className="orderbook__head">
                <div className="orderbook__head-row">
                  <div className="orderbook__head-cell">Cum. Vol.</div>
                  <div className="orderbook__head-cell">Vol.</div>
                  <div className="orderbook__head-cell">Bid</div>
                </div>
              </div>
              <div className="orderbook__body">
                {orderbook &&
                  orderbook.buyEntries.map((entry, index) => {
                    const volume = Number.parseFloat(entry.volume).toFixed(4);
                    const howMuch = Number.parseFloat(
                      entry.order.buy.howMuch,
                    ).toFixed(4);
                    const price = Number.parseFloat(entry.order.price).toFixed(
                      4,
                    );

                    const onClickBuyOrder = () => {
                      if (isReadyToTrade && onClick) {
                        onClick(orderbook.buyEntries.slice(0, index + 1));
                      }
                    };

                    const prevEntry = orderbook.buyEntries[index - 1];
                    const percentageDiff =
                      prevEntry &&
                      getPercentage(
                        new BigNumber(entry.volume).minus(prevEntry.volume),
                        orderbook.totalBuyVolume,
                      );

                    const prevEntryPercentage =
                      prevEntry &&
                      getPercentage(prevEntry.volume, orderbook.totalBuyVolume);

                    const entryPercentage =
                      entry &&
                      getPercentage(entry.volume, orderbook.totalBuyVolume);

                    return (
                      <div
                        className="orderbook__body-row"
                        key={entry.order.id}
                        onClick={onClickBuyOrder}
                        style={{ cursor: isReadyToTrade ? 'pointer' : 'auto' }}
                      >
                        <div className="orderbook__body-cell">{volume}</div>
                        <div className="orderbook__body-cell">{howMuch}</div>
                        <div className="orderbook__body-cell">{price}</div>
                        <div className="orderbook__bar orderbook__bar--buy">
                          <span
                            className="orderbook__bar-item"
                            style={{
                              width: `${entryPercentage}%`,
                            }}
                          />
                          <span
                            className="orderbook__bar-border"
                            style={{
                              width: `calc(${percentageDiff}%)`,
                              right: `calc(${entryPercentage}% - ${percentageDiff}% ${prevEntryPercentage >
                                1 && '- 1px'})`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="orderbook__table orderbook__table-sell">
            <div>
              <div className="orderbook__head">
                <div className="orderbook__head-row">
                  <div className="orderbook__head-cell">Ask</div>
                  <div className="orderbook__head-cell">Vol.</div>
                  <div className="orderbook__head-cell">Cum. Vol.</div>
                </div>
              </div>
              <div className="orderbook__body">
                {orderbook &&
                  orderbook.sellEntries.map((entry, index) => {
                    const volume = Number.parseFloat(entry.volume).toFixed(4);
                    const howMuch = Number.parseFloat(
                      entry.order.buy.howMuch,
                    ).toFixed(4);
                    const price = Number.parseFloat(entry.order.price).toFixed(
                      4,
                    );

                    const onClickSellOrder = () => {
                      if (isReadyToTrade && onClick) {
                        onClick(orderbook.sellEntries.slice(0, index + 1));
                      }
                    };

                    const prevEntry = orderbook.sellEntries[index - 1];
                    const percentageDiff =
                      prevEntry &&
                      getPercentage(
                        new BigNumber(entry.volume).minus(prevEntry.volume),
                        orderbook.totalBuyVolume,
                      );

                    const prevEntryPercentage =
                      prevEntry &&
                      getPercentage(prevEntry.volume, orderbook.totalBuyVolume);

                    const entryPercentage =
                      entry &&
                      getPercentage(entry.volume, orderbook.totalBuyVolume);

                    return (
                      <div
                        className="orderbook__body-row"
                        key={entry.order.id}
                        onClick={onClickSellOrder}
                        style={{ cursor: isReadyToTrade ? 'pointer' : 'auto' }}
                      >
                        <div className="orderbook__body-cell">{price}</div>
                        <div className="orderbook__body-cell">{howMuch}</div>
                        <div className="orderbook__body-cell">{volume}</div>

                        <div className="orderbook__bar orderbook__bar--sell">
                          <span
                            className="orderbook__bar-item"
                            style={{
                              width: `${entryPercentage}%`,
                            }}
                          />
                          <span
                            className="orderbook__bar-border"
                            style={{
                              width: `calc(${percentageDiff}%)`,
                              left: `calc(${entryPercentage}% - ${percentageDiff}% ${prevEntryPercentage >
                                1 && '- 1px'})`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orderbook;
