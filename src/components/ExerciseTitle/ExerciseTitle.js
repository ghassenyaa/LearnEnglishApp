import React from 'react';
import './_exerciseTitle.scss';
const ExerciseTitle = (props) => {
  return (
    <div className={props.className ? `exercise-title  ${props.className}` : 'exercise-title '}>
      {' '}
      <span>{props.coloredtitle}</span>
      {props.resttitle}
    </div>
  );
};
export default ExerciseTitle;
