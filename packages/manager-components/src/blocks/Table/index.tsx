import classNames from 'classnames';
import React, { Fragment, StatelessComponent } from 'react';
import styles from './styles.css';

export interface TableProps {
  tableClass?: string;
}

export interface CellProps {
  cellClass?: string;
  textAlign?: string;
  onClick?: (e, headFor) => void;
  headFor?: any;
  colSpan?: number;
  sorted?: string;
}

export interface RowProps {
  rowClass?: string;
  isHead?: boolean;
  size?: string;
  active?: boolean;
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

const Row: StatelessComponent<RowProps> = ({
  children,
  isHead,
  size,
  active,
}) => {
  const cellClassNames = classNames('table__row', {
    'table__row--head': isHead,
    'table__row--body': !isHead,
    'table__row--active': active,
    [`table__row--${size}`]: size,
  });

  return (
    <Fragment>
      <style jsx>{styles}</style>
      <tr className={cellClassNames}>{children}</tr>
    </Fragment>
  );
};

const CellBody: StatelessComponent<CellProps> = ({
  children,
  cellClass,
  textAlign,
  colSpan,
}) => {
  const cellBodyClassNames = classNames('table__cell', {
    [`${cellClass}`]: cellClass,
    [`table__cell--${textAlign}`]: textAlign,
  });

  return (
    <Fragment>
      <style jsx>{styles}</style>
      <td colSpan={colSpan} className={cellBodyClassNames}>
        {children}
      </td>
    </Fragment>
  );
};

const CellHead: StatelessComponent<CellProps> = ({
  children,
  cellClass,
  textAlign,
  onClick,
  headFor,
  sorted,
}) => {
  const cellHeadClassNames = classNames('table__cell', {
    [`${cellClass}`]: cellClass,
    [`table__cell--${textAlign}`]: textAlign,
    [`table__cell--clickable`]: onClick,
  });

  const onCellClick = (e: any): void => {
    if (onClick) {
      onClick(e, headFor);
    }
  };

  return (
    <Fragment>
      <style jsx>{styles}</style>
      <th onClick={onClick && onCellClick} className={cellHeadClassNames}>
        {children}
        {sorted === 'desc' && <span className="table__cell-arrow"> ↓</span>}
        {sorted === 'asc' && <span className="table__cell-arrow"> ↑</span>}
      </th>
    </Fragment>
  );
};

export default Table;
export { Table, TableBody, TableHead, CellBody, CellHead, Row };
