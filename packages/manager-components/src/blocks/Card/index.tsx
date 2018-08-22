import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface CardProps {
  rank?: number;
  name?: string;
  sharePrice?: string;
  inception?: string;
  address?: string;
  onClick?: (id) => void;
  isActive?: boolean;
}

const Card: StatelessComponent<CardProps> = ({
  rank,
  name,
  sharePrice,
  inception,
  onClick,
  address,
  isActive,
}) => {
  const cardClassNames = classNames('card', {
    'card--active': isActive,
  });

  const onCardClick = () => {
    if (onClick) {
      onClick(address);
    }
  };

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
