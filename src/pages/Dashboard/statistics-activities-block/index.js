import React from 'react';
import data from '../../../utilities/constants';
import StatisticCard from '../StatisticsCard/StatisticCard';
import { Bar } from 'react-chartjs-2';
import './_index.scss';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const StatisticsActivities = () => {
  return (
    <div className="statistics-activities-wrapper">
      <div className="statistics-activities-block">
        <div className="statistics">
          <div className="title">احصائيات</div>
          <div className="statistics-card-wrapper">
            {' '}
            {data.statistics.map((item) => (
              <StatisticCard key={item.id} title={item.title} nbr={item.nbr} />
            ))}
          </div>
        </div>
      </div>
      <div className="bar-wrapper">
        <div className="bar-title">أنشطة:</div>
        <Bar
          data={data.dataBar}
          width={100}
          height={95}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
};

export default StatisticsActivities;
