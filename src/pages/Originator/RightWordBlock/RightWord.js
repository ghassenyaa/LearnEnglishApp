import React, { useEffect, useState } from 'react';
import './_rightword.scss';
import HalfRectangle from '../HalfRectangle/HalfRectangle';
import BlockTitle from './../blockTitle/BlockTitle';
import Input from './Input';

const RightWord = (props) => {
  const { title, icon, id } = props;
  return (
    <>
      <BlockTitle title={title} icon={icon} />

      <div className="right-word-block">
        <HalfRectangle height={'fit content'} />
        <Input blockId={id} />
      </div>
    </>
  );
};

export default RightWord;
