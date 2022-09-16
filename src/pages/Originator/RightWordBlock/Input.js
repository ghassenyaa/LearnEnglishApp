import React, { useState } from 'react';
import { getblockId } from '../../../slices/select';

import Radio from '@mui/material/Radio';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { savecorreactword, saveWriteinTheBlanksWords } from '../../../slices/files';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Input = (props) => {
  const dispatch = useDispatch();
  const elwords = useSelector((state) => state.files.arrayWriteInTheBlanks);

  const { blockId } = props;
  const [value, setValue] = useState('');
  const [truevalue, setTrueValue] = useState('');
  let val = 0;
  let [arrayWord, setArrayWord] = useState([1]);
  let [arrayFalseWord, setArrayFalseWord] = useState([]);
  let arr = [...arrayWord];
  let array = [...arrayFalseWord];
  const [count, setCount] = useState(0);

  const [isHidden, setIsHidden] = useState(false);
  return (
    <div>
      {arrayWord.map((el) => (
        <div key={el}>
          <div className="wrapper-radio-group-view">
            <div className="wrapper-title-input">
              <span>الكلمة</span>
              <div className="wrapper-input-btn-remove-add">
                <input
                  name="rightword"
                  id="1"
                  className="input-right-word"
                  onChange={(e) => {
                    setTrueValue(e.target.value);
                  }}
                />
                <div className="wrapper-btn-add-remove">
                  <div
                    className="Removeicon"
                    onClick={() => {
                      arr.splice(0, 1);
                      setArrayWord(arr);
                    }}
                  >
                    {arrayWord.length !== 1 && <RemoveIcon />}
                  </div>
                  <div
                    className="AddBoxIcon"
                    onClick={() => {
                      setArrayWord((current) => [...current, val + 1]);
                    }}
                  >
                    <AddIcon />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">نوع الكلمة</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        onClick={() => {
                          setIsHidden(true);
                        }}
                      />
                    }
                    label="مخفي"
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        onClick={() => {
                          setIsHidden(false);
                        }}
                      />
                    }
                    label="غير مخفي"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <Button
              style={{
                backgroundColor: '#489BFF',
                color: '#FFFFFF',
                borderRadius: '30px',
                width: '150px',
              }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={() => {
                if (blockId === 'FillInTheBlanks') {
                  setCount(count + 1);
                  dispatch(
                    savecorreactword({
                      content: truevalue,
                      position: count,
                      ishidden: isHidden,
                    })
                  );
                } else if (blockId === 'WriteInTheBlanks') {
                  setCount(count + 1);
                  dispatch(
                    saveWriteinTheBlanksWords({
                      content: truevalue,
                      position: count,
                      ishidden: isHidden,
                    })
                  );
                }
              }}
            >
              <span> اضف الكلمة</span>
            </Button>
          </div>
        </div>
      ))}

      <div className="wrapper-btn-extra-words">
        <div className="wrapper-false-word">
          <div
            className="wrapper-extra-word"
            onClick={() => {
              array.splice(0, 1);
              setArrayFalseWord(array);
            }}
          >
            <RemoveIcon />
            <span>ازالة الكلمة الخاطئة</span>
          </div>
          <div
            className="wrapper-extra-word"
            onClick={() => {
              setArrayFalseWord((current) => [...current, val + 1]);
            }}
          >
            <AddIcon />
            <span>اضافة كلمة خاطئة</span>
          </div>
        </div>
        {arrayFalseWord.map((el) => (
          <div key={el}>
            <div className="input-btn-addword">
              <input
                name="rightword"
                id="2"
                className="input-false-word"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <Button
                style={{
                  backgroundColor: '#489BFF',
                  color: '#FFFFFF',
                  borderRadius: '30px',
                  width: '150px',
                }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={() => {
                  if (blockId === 'FillInTheBlanks') {
                    dispatch(savecorreactword({ content: value, position: -1, ishidden: true }));
                  } else if (blockId === 'WriteInTheBlanks') {
                    dispatch(
                      saveWriteinTheBlanksWords({ content: value, position: -1, ishidden: true })
                    );
                  }
                }}
              >
                <span> اضف الكلمة</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="btn-confirm-fillintheblanks">
        <Button
          className="ta-btn primary btn-rounded btn-lg btn-content"
          onClick={() => {
            dispatch(getblockId({ blockId: blockId }));
          }}
        >
          <span> تاكيد</span>
        </Button>
      </div>
    </div>
  );
};

export default Input;
