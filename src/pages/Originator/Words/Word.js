import React from 'react';
import './_word.scss';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Box from './../../../components/Box/Box';
const Word = (props) => {
  return (
    <Box className="word-box">
      <Box className="nbr-box">
        <KeyboardArrowDownOutlinedIcon />0{props.id}
      </Box>
      <span> {props.word}</span>
    </Box>
  );
};

export default Word;
