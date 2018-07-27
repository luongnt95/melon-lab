import React, { Fragment } from 'react';
import GetStarted from '../../containers/GetStarted';
import RankingComponent from '@melonproject/manager-components/components/Ranking';

const Ranking = ({
  rankingList,
  getFundLinkAction,
  loading,
  usersFund,
  search,
  onFilterChange,
  ordering,
  setOrdering,
}) => {
  return (
    <Fragment>
      <GetStarted />
      <RankingComponent
        getFundLinkAction={getFundLinkAction}
        rankingList={rankingList}
        ordering={ordering}
        setOrdering={setOrdering}
        onFilterChange={onFilterChange}
        search={search}
        usersFund={usersFund}
        loading={loading}
        search={search}
      />
    </Fragment>
  );
};

export default Ranking;
