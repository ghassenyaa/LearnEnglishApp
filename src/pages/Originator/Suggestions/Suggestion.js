import React from 'react';
import './_suggestion.scss';
import { useState } from 'react';
import { Radio } from 'antd';
import Box from './../../../components/Box/Box';
import {
  saveCorrectChoise1,
  saveCorrectChoise2,
  saveCorrectChoise3,
  saveCorrectChoise,
} from '../../../slices/files';
import { getblockId } from '../../../slices/select';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

const Suggestion = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [value1, setValueone] = useState('');
  const [value2, setValuetwo] = useState('');

  const { blockId } = props;

  return (
    <>
      <Box className="suggestion-container">
        <Radio value={0}>
          <input
            name="input"
            id="1"
            className="inputonecorrectchoise"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Radio>
      </Box>
      <Box className="suggestion-container">
        <Radio value={1}>
          <input
            name="input"
            id="2"
            className="inputonecorrectchoise"
            onChange={(e) => {
              setValueone(e.target.value);
            }}
          />
        </Radio>
      </Box>
      <Box className="suggestion-container">
        <Radio value={2}>
          <input
            name="input"
            id="3"
            className="inputonecorrectchoise"
            onChange={(e) => {
              setValuetwo(e.target.value);
            }}
          />
        </Radio>
      </Box>
      <div className="btn-confirm">
        <Button
          className="ta-btn primary btn-rounded btn-lg btn-content"
          onClick={() => {
            dispatch(saveCorrectChoise1(value));
            dispatch(saveCorrectChoise2(value1));
            dispatch(saveCorrectChoise3(value2));
            dispatch(saveCorrectChoise({ content: value, id: 0 }));
            dispatch(saveCorrectChoise({ content: value1, id: 1 }));
            dispatch(saveCorrectChoise({ content: value2, id: 2 }));
            dispatch(getblockId({ blockId: blockId }));
          }}
        >
          <span> تاكيد</span>
        </Button>
      </div>
    </>
  );
};

export default Suggestion;
