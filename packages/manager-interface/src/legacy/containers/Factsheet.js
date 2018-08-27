import moment from 'moment';
import { connect } from 'react-redux';
import Factsheet from '@melonproject/manager-components/components/Factsheet';
import displayNumber from '../utils/displayNumber';
import { actions as appActions } from '../actions/app';
import { actions as administrationActions } from '../actions/administration';
import { networks } from '@melonproject/melon.js';

const buildTwitterUrl = (isOwner, fundAddress, fundName, sharePrice, track) => {
  const text = isOwner
    ? track !== 'live'
      ? `My #MelonFund "${fundName}" has a share price currently of ${displayNumber(
        sharePrice,
      )}. Have a look:`
      : `Check out my on-chain decentralized hedge fund "${fundName}". It currently has a share price of ${displayNumber(
        sharePrice,
      )}. Have a look:`
    : track !== 'live'
      ? `The #MelonFund "${fundName}" has a share price currently of ${displayNumber(
        sharePrice,
      )}. Have a look:`
      : `Check out this on-chain decentralized hedge fund "${fundName}". It currently has a share price of ${displayNumber(
        sharePrice,
      )}. Have a look:`;

  const url =
    track === 'live'
      ? `https://ipfs.io/ipns/olympiad.melon.fund/#${fundAddress}`
      : `https://ipfs.io/ipns/melon.fund/#${fundAddress}`;
  const hashtags = 'TechnologyRegulatedFunds,Melon,MelonFund';
  const via = 'melonport';
  const related = 'melonport';

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
    hashtags,
  )}&via=${encodeURIComponent(via)}&related=${encodeURIComponent(related)}`;
};

const mapStateToProps = state => ({
  aum: displayNumber(state.fund.gav),
  creationDate:
  state.fund.inception && state.fund.inception !== '...'
    ? moment(state.fund.inception).format('D. MMM YYYY HH:mm')
    : '...',
  managementReward: displayNumber(state.fund.managementReward),
  name: state.fund.name,
  performanceReward: displayNumber(state.fund.performanceReward),
  personalStake: displayNumber(state.fund.personalStake),
  sharePrice: displayNumber(state.fund.sharePrice),
  totalSupply: displayNumber(state.fund.totalSupply),
  rank: state.fund.rank,
  dataValid: state.ethereum.isDataValid,
  numberOfFunds: state.fund.numberOfFunds,
  tweetHref: buildTwitterUrl(
    state.fund.owner === state.ethereum.account,
    state.fund.address,
    state.fund.name,
    state.fund.sharePrice,
    state.app.track,
  ),
  loading: state.fund.loading,
  expectedPrize: displayNumber(state.fund.expectedPrize),
  quoteAsset: state.app.assetPair.quote,
  isCompetition: state.app.isCompetition,
  track: state.app.track,
  reportUrl: `https://${
  state.ethereum.network === networks.KOVAN ? 'melon' : 'olympiad'
  }-reporting.now.sh/report/${state.fund.address}`
});

const mapDispatchToProps = dispatch => ({
  scrollTo: target => dispatch(appActions.scrollTo(target)),
  shutdown: () => dispatch(administrationActions.shutdown()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Factsheet);
