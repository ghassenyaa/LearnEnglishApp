import React, { useState } from 'react';
import Logo from '../../../components/Logo/index';
import '../_sidebar.scss';

const Header = ({ handleDrawerToggle, mobileOpen }) => {
  return (
    <div className="header">
      <Logo handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
    </div>
  );
};

export default Header;
