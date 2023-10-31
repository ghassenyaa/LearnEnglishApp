import React from 'react';
import './_languagesCourse.scss';
import data from './../../utilities/constants';
import DashCourses from '../Dashboard/dashcourses/DashCourses';
import { useLocation } from 'react-router-dom';
const LanguageCourse = () => {
  const location = useLocation();
  const data2 = location.state;
  return (
    <>
      <div className="languages-cards-title"> {data2?.language}:</div>
      <div className="languages-courses-wrapper">
        {data.dash_courses.map((item) => (
          <DashCourses key={item.id} title={item.title} icon={item.icon} color={item.color} />
        ))}
      </div>
    </>
  );
};
export default LanguageCourse;
