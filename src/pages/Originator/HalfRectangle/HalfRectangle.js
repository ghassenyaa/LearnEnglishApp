import React from 'react';
import './_halfrectangle.scss';
const HalfRectangle = (props) => {
  const { height } = props;
  return <div className="half-rect" style={{ height: height }} />;
};

export default HalfRectangle;
