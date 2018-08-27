import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Icon from '~/blocks/Icon';
import Loading from '~/blocks/Loading';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface FactsheetProps {
  aum?: string;
  creationDate?: string;
  dataValid?: boolean;
  expectedPrize?: string;
  isCompetition?: boolean;
  loading?: boolean;
  managementReward?: string;
  name?: string;
  numberOfFunds?: string;
  performanceReward?: string;
  personalStake?: string;
  quoteAsset?: string;
  rank?: string;
  scrollTo?: (id) => void;
  sharePrice?: string;
  shutdown: () => void;
  totalSupply?: string;
  tweetHref?: string;
  reportUrl?: string;

}

const Factsheet: StatelessComponent<FactsheetProps> = ({
  aum,
  creationDate,
  dataValid,
  expectedPrize,
  isCompetition,
  loading,
  managementReward,
  name,
  numberOfFunds,
  performanceReward,
  personalStake,
  quoteAsset,
  rank,
  scrollTo,
  sharePrice,
  shutdown,
  totalSupply,
  tweetHref,
  reportUrl,

}) => {
  const scrolltoHoldings = () => scrollTo && scrollTo('holdings');

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
        <Spinner icon size="small" />
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
              {quoteAsset}
              /Share
          </Button>
            <a href="#/ranking">
              Ranking: <Loading loading={rank === '...'}>{rank}</Loading> out of{' '}
              <Loading loading={numberOfFunds === '...'}>{numberOfFunds}</Loading>
            </a>
            <br />
            Total number of shares:{' '}
            <Loading loading={totalSupply === '...'}>{totalSupply}</Loading>
            <br />
            Shares owned by me:{' '}
            <Loading loading={personalStake === '...'}>{personalStake}</Loading>
            <hr />
            Management Reward:{' '}
            <Loading loading={managementReward === '...'}>
              {managementReward}
            </Loading>
            %<br />
            Performance Reward:{' '}
            <Loading loading={performanceReward === '...'}>
              {performanceReward}
            </Loading>
            %<hr />
            <a
              href="https://ipfs.io/ipfs/Qmc9JRw4zarrs6gJwu6tC58UAgeEujNg9VMWcH8MUEd5TW/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Investors/Managers
          </a>
            <hr />
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Generate fund report
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
