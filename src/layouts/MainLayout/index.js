import React from 'react';
import PropTypes from 'prop-types';
const MainLayout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};
MainLayout.propTypes = {};
export default MainLayout;
