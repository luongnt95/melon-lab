import React, { StatelessComponent } from 'react';
import Card from '~/blocks/Card';
import Dropdown from '~/blocks/Dropdown';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface RankingProps {
  rankingList?: any;
  loading?: boolean;
  usersFund?: string;
  onFilterChange?: () => void;
  ordering?: string;
  setOrdering?: (field) => void;
  search?: string;
  goToFund: (address) => void;
}

export const Ranking: StatelessComponent<RankingProps> = ({
  rankingList,
  loading,
  usersFund,
  onFilterChange,
  ordering,
  setOrdering,
  search,
  goToFund,
}) => {
  const onOrdering = (field, e) => {
    if (setOrdering) {
      ordering === field.value
        ? setOrdering(field.value)
        : setOrdering(field.value);
    }
  };

  const onFundClick = address => {
    if (goToFund) {
      goToFund(address);
    }
  };

  const sorting = {
    options: [
      {
        name: 'Highest rank',
        value: '+rank',
      },
      {
        name: 'Lowest rank',
        value: '-rank',
      },
      {
        name: 'Highest price',
        value: '-price',
      },
      {
        name: 'Lowest price',
        value: '+price',
      },
      {
        name: 'Newest',
        value: '-inception',
      },
      {
        name: 'Oldest',
        value: '+inception',
      },
    ],
  };

  return (
    <div className="ranking">
      <style jsx>{styles}</style>
      <h3>Funds Ranking</h3>
      {loading ? (
        <div className="ranking__loading">
          <Spinner icon />
        </div>
      ) : (
        <div className="ranking__table-wrap">
          <div className="ranking__filters">
            <div className="ranking__search">
              <Input
                name="search"
                placeholder="Search fund"
                onChange={onFilterChange && onFilterChange}
              />
            </div>
            <div className="ranking__sort">
              <Dropdown {...sorting} onChange={onOrdering} />
            </div>
          </div>
          <div className="ranking__funds">
            {rankingList.length > 0 &&
              rankingList.map(fund => (
                <Card
                  isActive={fund.address === usersFund && true}
                  onClick={onFundClick}
                  key={fund.address}
                  {...fund}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
