import React, { memo, useState, useEffect } from 'react';
import Title from '../../components/Title/Title';
import './_exercises.scss';
import ExerciseTitle from '../../components/ExerciseTitle/ExerciseTitle';
import { openModal } from './../../slices/modals';
import Column from './../Originator/Column';
import arrayMove from 'array-move';
import { useSelector, useDispatch } from 'react-redux';
import ModalProvider from './../../components/ModalsProvider/index';
import Snackbar from '../../components/Snackbar/Snackbar';
import { openSnackBar, closeSnackBar } from '../../slices/snackbar';
import SortableList from 'react-easy-sort';
import {
  fetchExercises,
  deleteExercises,
  updateexercisespostions,
  emptyArray,
  updatePosition,
} from './../../slices/exercises';
const Exercises = (props) => {
  const { exercices, updateposition, exerciseDeleteStatus, exercisePutStatus, storedlevels } =
    useSelector((state) => state.exercises);
  const positionarray = useSelector((state) => state.exercises.positionarray);
  const opensnack = useSelector((state) => {
    return state.snackbar.open;
  });
  const handleClick = () => {
    dispatch(openSnackBar(updateposition));
  };
  const [items, setItems] = useState(exercices);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modals.open);
  useEffect(() => {
    setItems(exercices);
  }, [exercices, dispatch]);
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  useEffect(() => {
    setItems(exercices);
  }, [exercices]);

  const onSortEnd = (oldIndex, newIndex) => {
    const item1 = items.find((obj) => obj._id === items[oldIndex]._id);
    const item2 = items.find((obj) => obj._id === items[newIndex]._id);
    dispatch(
      updateexercisespostions([
        {
          id: item1._id,
          oldOrder: items[oldIndex].order,
          newOrder: items[newIndex].order,
        },
        {
          id: item2._id,
          oldOrder: items[newIndex].order,
          newOrder: items[oldIndex].order,
        },
      ])
    );
    return setItems((array) => arrayMove(array, oldIndex, newIndex));
  };
  const { courseId } = useSelector((state) => state.structureBuilder);

  const constExercicesbylessons = exercices.filter((el) => el.lessonId._id == courseId.exerciseId);

  return (
    <div className="exercise-wrapper">
      <Title
        title={storedlevels}
        btnContent={'اضف  تمرين جديد'}
        showbtn={true}
        onClickbtn={() => {
          dispatch(updatePosition({ orders: positionarray }));
          dispatch(emptyArray());
          handleClick();
        }}
        onClick={openModal()}
        savebtncontent={'حفظ اماكن التمارين'}
      />
      <Snackbar open={opensnack} handleClose={() => dispatch(closeSnackBar())} />
      <Snackbar open={opensnack} handleClose={closeSnackBar()} />
      <ExerciseTitle coloredtitle={'الدرس 1:'} className="exertitle" />
      <SortableList onSortEnd={onSortEnd}>
        <Column
          columnId="Exercises_List"
          height={'100%'}
          column={constExercicesbylessons}
          btnContent="افتح المشئ"
          showbtn={true}
          onSortEnd={onSortEnd}
          linkbtn="/originator"
          imgclassNameid="img"
          updateexercise={exercisePutStatus}
          showimgexercise={false}
          deleteStatus={exerciseDeleteStatus}
          id="exercises"
          deleteitem={deleteExercises}
        />
      </SortableList>
      {open && <ModalProvider id="exercises" />}
    </div>
  );
};
export default memo(Exercises);
