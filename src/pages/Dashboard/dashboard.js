import React from 'react';
import './_dashboard.scss';
import CoursesPlaning from './courses-planning-block';
import StatisticsActivities from './statistics-activities-block/index';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <CoursesPlaning />
      <StatisticsActivities />
    </div>
  );
};
export default Dashboard;
