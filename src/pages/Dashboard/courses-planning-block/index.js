import React from 'react';
import DashCourses from '../dashcourses/DashCourses';
import data from '../../../utilities/constants';
import LanguageCard from '../cards/LanguageCard';
import './_index.scss';
const CoursesPlanning = () => {
  return (
    <div className="courses-planning-wrapper">
      <div className="courses-planning-block">
        <>
          <div className="courses-header">
            <div className="title-viewall-wrapper">
              <div className="title">دروس:</div>
            </div>
          </div>
          <div className="cards-wrapper">
            {data.languages_list.slice(0, 4).map((item, index) => (
              <LanguageCard
                key={item.id}
                language={item.name}
                index={index}
                item={item}
                coursesnbr={item.coursesnumber}
                percentage={item.percentage}
                icon={item.img}
                color1={item.color1}
                color2={item.color2}
              />
            ))}
          </div>
        </>
        <div className="planning">
          <div className="title-datepicker-wrapper">
            <div className="title">تخطيط:</div>
          </div>
          <div className="courses-wrapper">
            {data.dash_courses.map((item) => (
              <DashCourses key={item.id} title={item.title} icon={item.icon} color={item.color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoursesPlanning;
