import React from 'react';
import './_regulationsblock.scss';
import Regulations from '../Regulations/Regulations';
import RightWrongBlock from '../RightOrWrongBlock/RightWrongBlock';
import Input from '../Input/Input';
import PhraseBuilder from '../PhraseBuilder/phraseBuilder';
import CardDelivery from '../CardDelivery/CardDelivery';
import AdviceBlock from '../AdviceBlock/AdviceBlock';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import RightWord from '../RightWordBlock/RightWord';
import { saveCorrectAnswerId } from '../../../slices/files';
import { useDispatch, useSelector } from 'react-redux';
import RankingBlock from '../RankingBlock/RankingBlock';
import DiscussionBlock from '../DiscussionBlock/DiscussionBlock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
const RegulationsBlock = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const onChange = (e) => {
    setValue(e.target.value);
    dispatch(saveCorrectAnswerId(e.target.value));
  };
  const { label } = useSelector((state) => state.selectinput);
  const { data } = props;
  return (
    <div className="item3">
      <div className="item3-title"> ضوابط</div>
      {data.Regulations_list.map((item, index) => {
        const reg1 = label.find((elt) => elt.label === item.label);
        if (item.label === reg1?.label) {
          return (
            <Input
              key={index}
              label={item.label}
              placeholder={item.placeholder}
              img={item.img}
              withoutimg={true}
            />
          );
        }
      })}
      {label.find((elt) => elt.label === 'صحيحةاو خاطئة')?.label && (
        <RightWrongBlock onChange={onChange} value={value} blockId={'TrueFalseBlock'} />
      )}
      {data.Regulations_list2.map((item, index) => {
        const reg2 = label.find((elt) => elt.label === item.label);
        if (item.label === reg2?.label)
          return (
            <Input
              key={index}
              label={item.label}
              placeholder={item.placeholder}
              img={item.img}
              withoutimg={true}
            />
          );
      })}
      {label.find((elt) => elt.label === 'توصيل البطاقات')?.label && (
        <CardDelivery id={'DragAndDropBlock'} data={data} />
      )}
      {label.find((elt) => elt.label === 'نصيحة')?.label && <AdviceBlock id={'tipBlock'} />}
      {label.find((elt) => elt.label === 'اختيار  صحيح')?.label && (
        // <RightWord
        //   title="الكلمة الصحيحة"
        //   icon={<CheckCircleIcon style={{ color: '#2E6FF1' }} />}
        //   showanswer={true}
        //   height={'281px'}
        // />
        <QuestionBlock onChange={onChange} value={value} data={data} id={'OneCorrectChoise'} />
      )}
      {label.find((elt) => elt.label === 'انشاء جملة') && <PhraseBuilder />}
      {/* <RankingBlock data={data} /> */}
      {label.find((elt) => elt.label === 'إملأ الفراغات')?.label && (
        <RightWord
          title="املا الفراغات"
          icon={<BorderColorIcon style={{ color: '#2E6FF1' }} />}
          showanswer={false}
          className="right-word-block-answer-btn"
          height={'311px'}
          id={'FillInTheBlanks'}
        />
      )}
      {label.find((elt) => elt.label === 'اكتب في الفراغات ')?.label && (
        <RightWord
          title="اكتب في الفراغات"
          icon={<BorderColorIcon style={{ color: '#2E6FF1' }} />}
          showanswer={false}
          className="right-word-block-answer-btn"
          height={'311px'}
          id={'WriteInTheBlanks'}
        />
      )}
      {label.find((elt) => elt.label === 'اجراء محادثة')?.label && (
        <DiscussionBlock id="conversationBlock" />
      )}
      {label.find((elt) => elt.label === 'الحوار الثاني')?.label && (
        <DiscussionBlock id="secondDialogblock" />
      )}
      {label.find((elt) => elt.label === 'منشئ الحوار')?.label && (
        <DiscussionBlock id="dialogBuilderBlock" />
      )}
      {/* } */}
    </div>
  );
};

export default RegulationsBlock;
