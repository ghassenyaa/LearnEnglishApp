import React, { useState, memo, useEffect } from 'react';
import './_cours.scss';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../slices/modals';
import { useLocation } from 'react-router-dom';
import Title from '../../components/Title/Title';
import ModalProvider from './../../components/ModalsProvider/index';
import Column from './../Originator/Column';
import { openSnackBar, closeSnackBar } from '../../slices/snackbar';
import SortableList from 'react-easy-sort';
import {
  fetchCourses,
  updatePosition,
  updatecoursespostions,
  emptyArray,
  deleteCourses,
} from './../../slices/courses';
import Snackbar from '../../components/Snackbar/Snackbar';
import 'react-toastify/dist/ReactToastify.css';
import arrayMove from 'array-move';
const Cours = () => {
  const location = useLocation();
  const linkdata = location.state;

  const dispatch = useDispatch();
  const {
    lessons,
    coursePostError,
    courseDeleteStatus,
    coursePostStatus,
    coursePutStatus,
    updateposition,
  } = useSelector((state) => state.courses);
  const opensnack = useSelector((state) => {
    return state.snackbar.open;
  });
  const open = useSelector((state) => state.modals.open);
  const handleClick = () => {
    return updateposition === 'succeeded' && dispatch(openSnackBar(updateposition));
  };
  const positionarray = useSelector((state) => state.courses.positionarray);
  const [items, setItems] = useState(lessons);
  useEffect(() => {
    setItems(lessons);
  }, [lessons]);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const onSortEnd = (oldIndex, newIndex) => {
    const item1 = items.find((obj) => obj._id === items[oldIndex]._id);
    const item2 = items.find((obj) => obj._id === items[newIndex]._id);
    dispatch(
      updatecoursespostions([
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

  return (
    <div className="courses">
      <Title
        btnContent={'اضف درس جديد'}
        onClick={openModal()}
        onClickbtn={() => {
          dispatch(updatePosition({ orders: positionarray }));
          dispatch(emptyArray());
          handleClick();
        }}
        savebtncontent={'حفظ اماكن الدروس'}
        showbtn={true}
      />

      <Snackbar open={opensnack} status={courseDeleteStatus} handleClose={closeSnackBar()} />

      <Snackbar
        open={opensnack}
        status={updateposition}
        handleClose={() => dispatch(closeSnackBar())}
      />
      <SortableList onSortEnd={onSortEnd}>
        <Column
          column={items}
          columnId="column-1"
          height="100%"
          btnContent="افتح"
          id="course"
          onSortEnd={onSortEnd}
          updatecourse={coursePutStatus}
          showbtn={true}
          deleteitem={deleteCourses}
          linkbtn="/exercises"
          showimgexercise={true}
          title={linkdata?.title}
          deleteStatus={courseDeleteStatus}
          updateId="course"
        />
      </SortableList>
      {open && <ModalProvider id="courses" />}
    </div>
  );
};
export default memo(Cours);
