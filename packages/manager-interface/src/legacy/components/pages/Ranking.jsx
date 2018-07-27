import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Image, Table } from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import Highlight from 'react-highlighter';
import GetStarted from '../../containers/GetStarted';
import RankingNew from '@melonproject/manager-components/components/Ranking';
import { curry, map, assoc } from 'ramda';

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
      <RankingNew
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
