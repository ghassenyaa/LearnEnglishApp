import React from 'react';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import './tipwords.scss';
import { useDispatch } from 'react-redux';
const TipWords = (props) => {
  const { word } = props;
  const dispatch = useDispatch();
  return <div className="hidden-word-card">{word}</div>;
};

export default TipWords;
