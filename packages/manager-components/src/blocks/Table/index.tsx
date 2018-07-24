import classNames from 'classnames';
import React, { Fragment, StatelessComponent } from 'react';
import styles from './styles.css';

export interface TableProps {
  tableClass?: string;
}

export interface CellProps {
  cellClass?: string;
}

export interface RowProps {
  rowClass?: string;
  isHead?: boolean;
}

const Table: StatelessComponent<TableProps> = ({ children }) => (
  <Fragment>
    <style jsx>{styles}</style>
    <table className="table">{children}</table>
  </Fragment>
);

const TableBody: StatelessComponent = ({ children }) => (
  <Fragment>
    <style jsx>{styles}</style>
    <tbody className="table__body">{children}</tbody>
  </Fragment>
);

const TableHead: StatelessComponent = ({ children }) => (
  <Fragment>
    <style jsx>{styles}</style>
    <thead className="table__head">{children}</thead>
  </Fragment>
);

const Row: StatelessComponent<RowProps> = ({ children, isHead }) => {
  const classnameCell = classNames({
    'table__row--head': isHead,
    'table__row--body': !isHead,
  });

  return (
    <Fragment>
      <style jsx>{styles}</style>
      <tr className={classnameCell}>{children}</tr>
    </Fragment>
  );
};

const CellBody: StatelessComponent<CellProps> = ({ children, cellClass }) => {
  const classnameCellBody = classNames('table__cell', {
    [`${cellClass}`]: cellClass,
  });

  return (
    <Fragment>
      <style jsx>{styles}</style>
      <td className={classnameCellBody}>{children}</td>
    </Fragment>
  );
};

const CellHead: StatelessComponent<CellProps> = ({ children, cellClass }) => {
  const classnameCellHead = classNames('table__cell', {
    [`${cellClass}`]: cellClass,
  });

  return (
    <Fragment>
      <style jsx>{styles}</style>
      <th className={classnameCellHead}>{children}</th>
    </Fragment>
  );
};

export default Table;
export { Table, TableBody, TableHead, CellBody, CellHead, Row };
