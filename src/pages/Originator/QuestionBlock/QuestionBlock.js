import React from 'react';
import './_questionblock.scss';
import { Radio } from 'antd';
import HalfRectangle from './../HalfRectangle/HalfRectangle';
import Suggestion from './../Suggestions/Suggestion';
import FilterListIcon from '@mui/icons-material/FilterList';
import BlockTitle from './../blockTitle/BlockTitle';

const QuestionBlock = (props) => {
  const { onChange, value, data, id } = props;

  return (
    <>
      <BlockTitle title="سؤال" icon={<FilterListIcon style={{ color: '#2E6FF1' }} />} />

      <div className="question-block-content">
        <HalfRectangle height={'203px'} />
        <Radio.Group onChange={onChange} value={value} className="suggestion-wrapper">
          <span>اصنع الاجابات المحتملة و اختر الاجابة الصحيحة</span>

          <Suggestion blockId={id} />
        </Radio.Group>
      </div>
    </>
  );
};

export default QuestionBlock;
