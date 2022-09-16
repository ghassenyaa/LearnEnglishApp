import React from 'react';
import './_statisticcard.scss';
const StatisticCard = (props) => {
  const { title, nbr } = props;
  return (
    <div className="statistics-card">
      <div className="statistics-title">{title}</div>
      <div className="statistics-nbr">
        <span>{nbr}</span>
      </div>
    </div>
  );
};

export default StatisticCard;
