import React, { StatelessComponent } from 'react';
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
  onFilterChange?: any;
  ordering?: string;
  setOrdering?: any;
  search?: string;
}

export const Ranking: StatelessComponent<RankingProps> = ({
  rankingList,
  loading,
  usersFund,
  onFilterChange,
  ordering,
  setOrdering,
  search,
}) => {
  const onOrdering = (e, field) => {
    if (setOrdering) {
      ordering === `+${field}`
        ? setOrdering(`-${field}`)
        : setOrdering(`+${field}`);
    }
  };

  return (
    <div className="ranking">
      <style jsx>{styles}</style>
      <h3>Melon Funds Ranking</h3>
      {loading ? (
        <div className="ranking__loading">
          <Spinner />
        </div>
      ) : (
        <div className="ranking__table-wrap">
          <Table>
            <TableHead>
              <Row isHead={true}>
                <CellHead headFor="rank" onClick={onOrdering}>
                  Rank
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
                >
                  Share price
                </CellHead>
                <CellHead
                  headFor="inception"
                  onClick={onOrdering}
                  textAlign="right"
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
                    <CellBody>{fund.link}</CellBody>
                    <CellBody textAlign="right">{fund.sharePrice}</CellBody>
                    <CellBody textAlign="right">{fund.inception}</CellBody>
                  </Row>
                ))}

              {rankingList.length === 0 &&
                search && (
                  <Row>
                    <CellBody colSpan={4}>No Fund found</CellBody>
                  </Row>
                )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Ranking;
