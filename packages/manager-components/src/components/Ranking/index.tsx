import React, { StatelessComponent } from 'react';
import Card from '~/blocks/Card';
import Dropdown from '~/blocks/Dropdown';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface RankingProps {
  Link: React.ComponentType<any>,
  LinkProps?: { [key: string]: any },
  loading?: boolean;
  funds?: any;
  ordering?: string;
  search?: string;
  setSearch: (search: string) => void;
  setOrdering: (field: string) => void;
  usersFund?: string;
}

export const Ranking: StatelessComponent<RankingProps> = ({
  Link,
  LinkProps = {},
  loading,
  funds,
  ordering,
  search,
  setSearch,
  setOrdering,
  usersFund,
}) => {
  const onOrdering = (field, e) => {
    if (setOrdering) {
      ordering === field.value
        ? setOrdering(field.value)
        : setOrdering(field.value);
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ranking__sort">
              <Dropdown
                {...sorting}
                label="Sort by"
                value={ordering}
                onChange={onOrdering}
              />
            </div>
          </div>
          <div className="ranking__funds">
            {funds.length && funds.map(fund => (
              <Link {...LinkProps} key={fund.address} address={fund.address}>
                <Card
                  isActive={fund.address === usersFund && true}
                  {...fund}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
