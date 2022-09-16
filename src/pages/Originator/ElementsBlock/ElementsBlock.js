import React, { useState } from 'react';
import './_elementblock.scss';
import HalfRectangle from './../HalfRectangle/HalfRectangle';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { getblockId } from '../../../slices/select';
import Button from '@material-ui/core/Button';
import { saveQuestionDrag, saveAnswersDrag, saveCorrectAnswers } from '../../../slices/files';
const ElementsBlock = (props) => {
  const [inputvaluequestion, setInputValueQuestion] = useState('');
  const [inputvalueanswer, setInputValueAnswer] = useState('');
  const dispatch = useDispatch();
  const { answerId, questionId, questionsDrag, answersDrag, correctAnswers } = useSelector(
    (state) => state.files
  );
  const { blockId } = props;

  return (
    <div className="card-delivery-block">
      <HalfRectangle height={'250px'} />

      <div className="wrapper-btn-input-view">
        <span>السؤال</span>
        <div className="wrapper-input-btnconfirm-question">
          <input
            type="text"
            placeholder=" ادخل السوال هنا ..."
            onChange={(e) => {
              setInputValueQuestion(e.target.value);
            }}
            value={inputvaluequestion}
            style={{ border: '1px solid #dee4ed' }}
          />
          <button
            onClick={() => {
              dispatch(saveQuestionDrag({ id: nanoid(23), content: inputvaluequestion }));
            }}
          >
            اضف السوال
          </button>
        </div>

        <span>الاجابة</span>
        <div className="wrapper-input-btnconfirm-answers">
          <input
            type="text"
            placeholder=" ادخل الاجابة الصحيحة هنا ..."
            onChange={(e) => {
              setInputValueAnswer(e.target.value);
            }}
            value={inputvalueanswer}
            style={{ border: '1px solid #dee4ed' }}
          />
          <button
            onClick={() => {
              dispatch(saveAnswersDrag({ id: nanoid(23), content: inputvalueanswer }));
            }}
          >
            اضف الاجابة
          </button>
        </div>

        <Button
          id="button-confirm-card-delevry"
          className="ta-btn primary btn-rounded btn-lg btn-content"
          onClick={() => {
            dispatch(saveCorrectAnswers({ questionId: questionId, answersId: answerId }));
            dispatch(getblockId({ blockId: blockId }));
          }}
        >
          <span>تاكيد</span>
        </Button>
      </div>
    </div>
  );
};

export default ElementsBlock;
