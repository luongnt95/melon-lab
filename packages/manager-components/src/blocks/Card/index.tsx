import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface CardProps {
  address?: string;
  inception?: string;
  isActive?: boolean;
  name?: string;
  onClick?: (id) => void;
  rank?: number;
  sharePrice?: string;
  reportUrl?: string;
}

const Card: StatelessComponent<CardProps> = ({
  address,
  inception,
  isActive,
  name,
  onClick,
  rank,
  sharePrice,
  reportUrl,
}) => {
  const cardClassNames = classNames('card', {
    'card--active': isActive,
  });

  const onCardClick = e =>
    e.target.tagName !== 'A' && onClick && onClick(address);

  return (
    <div onClick={onCardClick} className={cardClassNames}>
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
            <div className="card__report">
              <a className="card__report-link" href={reportUrl} target="_blank">
                Show Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
