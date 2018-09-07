import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface CardProps {
  inception?: string;
  isActive?: boolean;
  name?: string;
  rank?: number;
  sharePrice?: string;
  reportUrl?: string;
  onClick?: React.MouseEventHandler;
}

const Card: StatelessComponent<CardProps> = ({
  inception,
  isActive,
  name,
  rank,
  sharePrice,
  reportUrl,
  onClick,
}) => {
  const cardClassNames = classNames('card', {
    'card--active': isActive,
  });

  return (
    <div onClick={onClick} className={cardClassNames}>
      <style jsx>{styles}</style>
      <div className="card__rank">
        <span className="card__rank-symbol">#</span>
        {rank}
      </div>
      <div className="card__info-cell">
        <div className="card__info-wrap">
          <div className="card__name">{name}</div>
          <div className="card__info">
            <div className="card__share-price">
              <span className="card__label">Share price</span> {sharePrice}
            </div>
            <div className="card__inception-date">
              <span className="card__label">Inception Date</span> {inception}
            </div>
          </div>
          <div className="card__report">
            <a className="card__report-link" href={reportUrl} target="_blank">
              Show Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
