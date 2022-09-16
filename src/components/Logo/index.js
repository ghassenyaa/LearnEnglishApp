import React from 'react';
import { Link } from 'react-router-dom';
import ImLogo from './../../assets/icons/logo.svg';
import './_logo.scss';
import { useSelector } from 'react-redux';

const Logo = ({ handleDrawerToggle, mobileOpen }) => {
  const menuCollaps = useSelector((state) => state.courses.menuCollapse);
  return (
    <Link
      to="/"
      className="logo"
      onClick={() => {
        if (mobileOpen === true) {
          handleDrawerToggle();
        }
      }}
    >
      <div className="logo_sidebar">
        {!menuCollaps && (
          <>
            <img alt="logo" className="image_sidebar" src={ImLogo} />{' '}
            <span className="first_text_takiacademy">TakiAcademy</span>
            <span className="secend_text_learn_english">Learn English</span>
          </>
        )}
        {menuCollaps && (
          <>
            <img alt="logo" className="image_sidebar_after" src={ImLogo} />{' '}
            <div className="firstandsecande_text">
              {' '}
              <span className="first_text_takiacademy">TakiAcademy</span>
              <span className="secend_text_learn_english">Learn English</span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default Logo;
