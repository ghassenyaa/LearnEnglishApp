import React from 'react';
import { useEffect } from 'react';
import Exercise from '../../components/Exercise/Exercise';
import SortableList from 'react-easy-sort';
import { useDispatch, useSelector } from 'react-redux';
import { openModals } from '../../slices/modalsaddUser';
import { putCourses } from './../../slices/courses';
import { putExercises } from './../../slices/exercises';
import { fetchQuestionBlockType } from './../../slices/questionBlockTypes';
import { SelectInput } from './../../slices/selectInput';
import './_column.scss';
const Column = (props) => {
  const {
    showbtn,
    btnContent,
    className,
    id,
    linkbtn,
    title,
    imgclassNameid,
    column,
    height,
    showimgexercise,
    deleteStatus,
    deleteitem,
    showMoreDetailsIcon,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestionBlockType());
  }, [dispatch]);
  return (
    <>
      <SortableList onSortEnd={props.onSortEnd}>
        <div className={className ? `cards ${className}` : 'cards'} style={{ height: height }}>
          {column?.map((item, index) => {
            let label;

            if (item.label === 'tipBlock') {
              label = 'نصيحة';
            }
            if (item.label === 'audioBlock') {
              label = 'صوت';
            }
            if (item.label === 'textBlock') {
              label = 'نص';
            }
            if (item.label === 'descriptionBlock') {
              label = 'وصف';
            }
            if (item.label === 'oneCorrectChoice') {
              label = 'اختيار  صحيح';
            }
            if (item.label === 'trueFalseBlock') {
              label = 'صحيحةاو خاطئة';
            }
            if (item.label === 'phraseBuilder') {
              label = 'انشاء جملة';
            }
            if (item.label === 'imageBlock') {
              label = 'صورة';
            }
            if (item.label === 'dragAndDrop') {
              label = 'توصيل البطاقات';
            }
            if (item.label === 'fillInTheBlanks') {
              label = 'إملأ الفراغات';
            }
            if (item.label === 'writeInTheBlanks') {
              label = 'اكتب في الفراغات ';
            }
            if (item.label === 'titleBlock') {
              label = 'العنوان';
            }
            if (item.label === 'conversationBlock') {
              label = 'اجراء محادثة';
            }
            if (item.label === 'secondDialogBlock') {
              label = 'الحوار الثاني';
            }
            if (item.label === 'dialogBuilderBlock') {
              label = 'منشئ الحوار';
            }
            if (item.label === 'matchPairBlock') {
              label = 'اربط بسهم';
            }

            return (
              <Exercise
                id={item?._id}
                key={item?._id}
                updateId={id}
                deleteitem={deleteitem}
                showMoreDetailsIcon={showMoreDetailsIcon}
                index={index}
                deleteStatus={deleteStatus}
                order={item?.order}
                checkboxclick={SelectInput}
                showbtn={showbtn}
                name={
                  id === 'course'
                    ? item?.title + ':' + item?.subtitle
                    : id === 'question'
                    ? label
                    : item?.title
                }
                btncontent={btnContent}
                description={item?.intro}
                img={item?.thumbnail}
                className={className}
                linkbtn={linkbtn}
                title={title}
                showimgexercise={showimgexercise}
                onClick={() =>
                  id === 'exercises'
                    ? dispatch(
                        openModals('update-Modal', {
                          ...item,
                          putExercises,
                          id: 'exercises',
                        })
                      )
                    : id === 'course'
                    ? dispatch(openModals('update-Modal', { ...item, putCourses, id: 'courses' }))
                    : ''
                }
                imgclassNameid={imgclassNameid}
              />
            );
          })}
        </div>
      </SortableList>
    </>
  );
};
export default Column;
