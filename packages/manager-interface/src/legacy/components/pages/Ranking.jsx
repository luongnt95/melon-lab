import React, { Fragment } from 'react';
import GetStarted from '../../containers/GetStarted';
import RankingComponent from '@melonproject/manager-components/components/Ranking';

const Ranking = ({
  rankingList,
  loading,
  usersFund,
  search,
  onFilterChange,
  ordering,
  setOrdering,
  goToFund,
}) => {
  return (
    <Fragment>
      <GetStarted />
      <RankingComponent
        rankingList={rankingList}
        ordering={ordering}
        setOrdering={setOrdering}
        onFilterChange={onFilterChange}
        search={search}
        usersFund={usersFund}
        loading={loading}
        search={search}
        goToFund={goToFund}
      />
    </Fragment>
  );
};

export default Ranking;
