import React from 'react';
import './_box.scss';
const Box = (props) => {
  return (
    <div className={props.className ? `box ${props.className}` : 'box'}> {props.children}</div>
  );
};

export default Box;
