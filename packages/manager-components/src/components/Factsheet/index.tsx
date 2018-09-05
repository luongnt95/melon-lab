import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Icon from '~/blocks/Icon';
import Loading from '~/blocks/Loading';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface FactsheetProps {
  gav?: string;
  creationDate?: string;
  dataValid?: boolean;
  isCompetition?: boolean;
  loading?: boolean;
  managementReward?: string;
  name?: string;
  numberOfFunds?: string;
  performanceReward?: string;
  personalStake?: string;
  quoteAsset?: string;
  rank?: string;
  reportUrl?: string;
  scrollTo?: (id) => void;
  sharePrice?: string;
  shutdown: () => void;
  totalSupply?: string;
  tweetHref?: string;
  address?: string;
  track?: string;
  owner?: boolean;
  account?: string;
}

const Factsheet: StatelessComponent<FactsheetProps> = ({
  gav,
  creationDate,
  dataValid,
  isCompetition,
  loading,
  managementReward,
  name,
  numberOfFunds,
  performanceReward,
  personalStake,
  quoteAsset,
  rank,
  reportUrl,
  scrollTo,
  sharePrice,
  shutdown,
  totalSupply,
  address,
  track,
  owner,
  account,
}) => {
  const scrolltoHoldings = () => scrollTo && scrollTo('holdings');

  const isOwner = owner === account;

  const buildTwitterUrl = () => {
    const text = isOwner
      ? track !== 'live'
        ? `My #MelonFund "${name}" has a share price currently of ${sharePrice}. Have a look:`
        : `Check out my on-chain decentralized hedge fund "${name}". ` +
          `It currently has a share price of ${sharePrice}. Have a look:`
      : track !== 'live'
        ? `The #MelonFund "${name}" has a share price currently of ${sharePrice}. Have a look:`
        : `Check out this on-chain decentralized hedge fund "${name}". ` +
          `It currently has a share price of ${sharePrice}. Have a look:`;

    const url =
      track === 'live'
        ? `https://olympiad.melon.fund/#${address}`
        : `https://melon.fund/#${address}`;
    const hashtags = 'TechnologyRegulatedFunds,Melon,MelonFund';
    const via = 'melonport';
    const related = 'melonport';

    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
      hashtags,
    )}&via=${encodeURIComponent(via)}&related=${encodeURIComponent(related)}`;
  };

  return (
    <div className="factsheet">
      <style jsx>{styles}</style>
      <h3 className="factsheet__title">
        {name}
        <a
          className="factsheet__title-link"
          href={buildTwitterUrl()}
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
            <Loading dataAvailable={dataValid} loading={gav === '...'}>
              {gav.toFixed(4)}
            </Loading>{' '}
            {quoteAsset}
          </Button>
          <Button onClick={scrolltoHoldings} style="clear">
            Share price:{' '}
            <Loading dataAvailable={dataValid} loading={sharePrice === '...'}>
              {sharePrice.toFixed(4)}
            </Loading>{' '}
            {quoteAsset}
            /Share
          </Button>
          <a href="/">
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
          <a href={reportUrl} target="_blank" rel="noopener noreferrer">
            Generate fund report
          </a>
          <hr />
          {!isCompetition &&
            isOwner && (
              <Button onClick={shutdown} style="clear">
                Irreversibly shut down fund
              </Button>
            )}
        </div>
      )}
    </div>
  );
};

export default Factsheet;
