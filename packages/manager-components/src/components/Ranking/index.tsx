import React, { StatelessComponent } from 'react';
import Highlight from 'react-highlighter';
import Button from '~/blocks/Button';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';
import {
  CellBody,
  CellHead,
  Row,
  Table,
  TableBody,
  TableHead,
} from '~/blocks/Table';

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
  const onOrdering = (e, field) => {
    if (setOrdering) {
      ordering === `+${field}`
        ? setOrdering(`-${field}`)
        : setOrdering(`+${field}`);
    }
  };

  const onFundClick = (e, address) => {
    if (goToFund) {
      goToFund(address);
    }
  };

  const isActiveCol = colName => {
    if (ordering && ordering.includes(colName)) {
      if (ordering.includes('+')) {
        return 'asc';
      } else {
        return 'desc';
      }
    }
    return false;
  };

  return (
    <div className="ranking">
      <style jsx>{styles}</style>
      <h3>Melon Funds Ranking</h3>
      {loading ? (
        <div className="ranking__loading">
          <Spinner icon />
        </div>
      ) : (
        <div className="ranking__table-wrap">
          <Table>
            <TableHead>
              <Row isHead={true}>
                <CellHead
                  headFor="rank"
                  onClick={onOrdering}
                  sorted={isActiveCol('rank')}
                >
                  #
                </CellHead>
                <CellHead>
                  <Input
                    name="search"
                    placeholder="Search fund"
                    onChange={onFilterChange && onFilterChange}
                  />
                </CellHead>
                <CellHead
                  headFor="price"
                  onClick={onOrdering}
                  textAlign="right"
                  sorted={isActiveCol('price')}
                >
                  Share price
                </CellHead>
                <CellHead
                  headFor="inception"
                  onClick={onOrdering}
                  textAlign="right"
                  sorted={isActiveCol('inception')}
                >
                  Inception Date
                </CellHead>
              </Row>
            </TableHead>
            <TableBody>
              {rankingList.length > 0 &&
                rankingList.map(fund => (
                  <Row
                    key={fund.address}
                    active={fund.address === usersFund && true}
                    size="large"
                  >
                    <CellBody>{fund.rank}</CellBody>
                    <CellBody>
                      <Button
                        style="clear"
                        onClick={onFundClick}
                        buttonValue={fund.address}
                      >
                        <Highlight search={search}>{fund.name}</Highlight>
                      </Button>
                    </CellBody>
                    <CellBody textAlign="right">{fund.sharePrice}</CellBody>
                    <CellBody textAlign="right">{fund.inception}</CellBody>
                  </Row>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Ranking;
