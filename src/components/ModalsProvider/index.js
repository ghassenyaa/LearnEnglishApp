import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modals/Modal';
import { closeModal } from '../../slices/modals';
import { postChapters } from '../../slices/chapters';
import { postCourses } from '../../slices/courses';
import { postLanguages } from '../../slices/languages';
import { postExercises } from '../../slices/exercises';
import { postLevels } from '../../slices/levels';
import { closeSnackBar } from '../../slices/snackbar';
import { savePerson } from './../../slices/persons';
const ModalsProvider = (props) => {
  const open = useSelector((state) => state.modals.open);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
    dispatch(closeSnackBar());
  };

  const { id } = props;
  const levelsdata = {
    id: 'level',
    title: 'اضف مستوى جديد',
    label: 'اسم المستوى',
    inputwarning: 'اسم المستوى مطلوب',
    addcomponent: postLevels,
  };
  const persons = {
    id: 'persons',
    title: 'اضف شخص جديد',
    label: 'اسم الشخص',
    addcomponent: savePerson,
  };
  const coursesdata = {
    id: 'course',
    title: 'اضف درس جديد',
    label: 'اسم الدرس',
    inputwarning: 'اسم الدرس مطلوب',
    addcomponent: postCourses,
  };
  const chaptersdata = {
    id: 'chapter',
    title: 'اضف فصل جديد',
    label: 'اسم الفصل',
    inputwarning: 'اسم القصل مطلوب',
    addcomponent: postChapters,
  };
  const languagedata = {
    id: 'language',
    title: 'اضف لغة جديدة',
    label: ' اللغة',
    inputwarning: ' اللغة مطلوبة',
    addcomponent: postLanguages,
  };
  const exercisedata = {
    id: 'exercises',
    title: 'اضف تمرين جديد',
    label: 'اسم التمرين',
    addcomponent: postExercises,
    inputwarning: ' التمرين مطلوب',
  };
  return (
    <>
      <Modal
        open={open}
        data={
          id === 'chapters'
            ? chaptersdata
            : id === 'courses'
            ? coursesdata
            : id === 'language'
            ? languagedata
            : id === 'levels'
            ? levelsdata
            : id === 'exercises'
            ? exercisedata
            : id === 'persons'
            ? persons
            : ''
        }
        handleClose={handleClose}
        closeSnackBar={closeSnackBar()}
      />
    </>
  );
};
export default memo(ModalsProvider);
