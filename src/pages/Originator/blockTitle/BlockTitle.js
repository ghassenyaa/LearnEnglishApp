import React from 'react';
import './_blocktitle.scss';
const BlockTitle = (props) => {
  const { icon, title } = props;
  return (
    <div className="block-title">
      {icon}
      <span> {title} </span>
    </div>
  );
};

export default BlockTitle;
