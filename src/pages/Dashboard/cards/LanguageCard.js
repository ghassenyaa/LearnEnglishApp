import React from 'react';
import { Link } from 'react-router-dom';
import './_languagecard.scss';

const LanguageCard = (props) => {
  const { language, coursesnbr, icon, color1, color2, item, index } = props;
  const data = { ...props };
  return (
    <Link
      className="card"
      to={{ pathname: '/languagescourses', state: data }}
      style={{ backgroundImage: `linear-gradient(to top, ${color1} 0%, ${color2} 100%)` }}
    >
      <img src={icon} alt="icon" />
      <div className="language-percentage-wrapper">
        <div className="language">
          {language}
          <span>{coursesnbr} درس</span>
        </div>
      </div>
    </Link>
  );
};

export default LanguageCard;
