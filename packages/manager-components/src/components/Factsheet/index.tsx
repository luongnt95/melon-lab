import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Icon from '~/blocks/Icon';
import Loading from '~/blocks/Loading';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface FactsheetProps {
  aum?: string;
  creationDate?: string;
  managementReward?: string;
  name?: string;
  performanceReward?: string;
  personalStake?: string;
  sharePrice?: string;
  totalSupply?: string;
  rank?: string;
  numberOfFunds?: string;
  tweetHref?: string;
  scrollTo?: (id) => void;
  loading?: boolean;
  dataValid?: boolean;
  expectedPrize?: string;
  quoteAsset?: string;
  shutdown?: string;
  isCompetition?: boolean;
}

const Factsheet: StatelessComponent<FactsheetProps> = ({
  aum,
  creationDate,
  managementReward,
  name,
  performanceReward,
  personalStake,
  sharePrice,
  totalSupply,
  rank,
  numberOfFunds,
  tweetHref,
  scrollTo,
  loading,
  dataValid,
  expectedPrize,
  quoteAsset,
  shutdown,
  isCompetition,
}) => {
  const scrolltoHoldings = () => {
    if (scrollTo) {
      scrollTo('holdings');
    }
  };

  return (
    <div className="factsheet">
      <style jsx>{styles}</style>
      <h3 className="factsheet__title">
        {name}
        <a
          className="factsheet__title-link"
          href={tweetHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon width="12px" height="12px" name="icons_twitter" />
        </a>
      </h3>
      {loading ? (
        <Spinner size="small" />
      ) : (
          <div>
            Creation date:{' '}
            <Loading loading={creationDate === '...'}>{creationDate}</Loading>
            <br />
            <Button onClick={scrolltoHoldings} style="clear">
              AUM:{' '}
              <Loading dataAvailable={dataValid} loading={aum === '...'}>
                {aum}
              </Loading>{' '}
              {quoteAsset}
            </Button>
            <Button onClick={scrolltoHoldings} style="clear">
              Share price:{' '}
              <Loading dataAvailable={dataValid} loading={sharePrice === '...'}>
                {sharePrice}
              </Loading>{' '}
              {quoteAsset}/Share
          </Button>
            <a href="#/ranking">
              Ranking: <Loading loading={rank === '...'}>{rank}</Loading> out of{' '}
              <Loading loading={numberOfFunds === '...'}>{numberOfFunds}</Loading>
            </a>
            <br />Total number of shares:{' '}
            <Loading loading={totalSupply === '...'}>{totalSupply}</Loading>
            <br />Shares owned by me:{' '}
            <Loading loading={personalStake === '...'}>{personalStake}</Loading>
            <hr />
            Management Reward:{' '}
            <Loading loading={managementReward === '...'}>
              {managementReward}
            </Loading>%
          <br />Performance Reward:{' '}
            <Loading loading={performanceReward === '...'}>
              {performanceReward}
            </Loading>%
          <hr />
            <a
              href="https://ipfs.io/ipfs/Qmc9JRw4zarrs6gJwu6tC58UAgeEujNg9VMWcH8MUEd5TW/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Investors/Managers
            </a>
            <hr />
            {!isCompetition ? (
              <Button onClick={shutdown} style="clear">
                Irreversibly shut down fund
            </Button>
            ) : (
                <div />
              )}
          </div>
        )}
    </div>
  );
};

export default Factsheet;
