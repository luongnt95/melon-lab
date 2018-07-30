import React, { Fragment } from 'react';
import Layout from '@melonproject/manager-components/design/Layout';
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
    <Layout>
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
    </Layout>
  );
};

export default Ranking;
