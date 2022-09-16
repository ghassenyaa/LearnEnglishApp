import React, { useState } from 'react';
import './_rightwrongblock.scss';
import { Radio } from 'antd';
import BlockTitle from './../blockTitle/BlockTitle';
import HalfRectangle from './../HalfRectangle/HalfRectangle';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import Input from './../Input/Input';
import { saveTrueanswers, savetruefalseblock } from '../../../slices/files';
import { useDispatch, useSelector } from 'react-redux';
import { getblockId } from '../../../slices/select';
import Button from '@material-ui/core/Button';
const RightWrongBlock = (props) => {
  const dispatch = useDispatch();
  const { onChange, value, blockId } = props;
  const { question, answer, trueAnswer } = useSelector((state) => state.files);

  return (
    <div className="right-wrong-block">
      <BlockTitle
        title="صحيحة او خاطئة"
        icon={<ThumbsUpDownOutlinedIcon style={{ color: '#2E6FF1' }} />}
      />
      <div className="right-wrong-block-content">
        <HalfRectangle height={'300px'} />
        <div className="right-wrong-block-content-wrapper">
          <div className="right-answer">الاجابة الملائمة (للفيديوا و الصورة....)</div>{' '}
          <Radio.Group onChange={onChange} value={value} className="btn-wrapper">
            <button
              onClick={() => {
                dispatch(saveTrueanswers(true));
              }}
            >
              <Radio value={1}>
                <span>صحيح</span>
              </Radio>
            </button>
            <button
              onClick={() => {
                dispatch(saveTrueanswers(false));
              }}
            >
              <Radio value={2}>
                <span>خاطئ</span>
              </Radio>
            </button>
          </Radio.Group>
          <Input label={'السوال'} placeholder={'اضف  السوال'} withoutimg={false} />
          <Input label={'اجابة'} placeholder={'اضف اجابة '} withoutimg={false} />
        </div>
      </div>

      <Button
        id="button"
        className="ta-btn primary btn-rounded btn-lg btn-content"
        onClick={() => {
          dispatch(savetruefalseblock({ text1: question, text2: answer, answer: trueAnswer }));
          dispatch(getblockId({ blockId: blockId }));
        }}
      >
        تاكيد
      </Button>
    </div>
  );
};

export default RightWrongBlock;
