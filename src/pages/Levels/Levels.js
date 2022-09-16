import React, { useEffect, memo } from 'react';
import Title from '../../components/Title/Title';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../slices/modals';
import ModalProvider from './../../components/ModalsProvider/index';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import { fetchLevels, deleteLevels, putLevels } from './../../slices/levels';
import { openModals } from '../../slices/modalsaddUser';
import 'react-vertical-timeline-component/style.min.css';
import { closeSnackBar } from '../../slices/snackbar';
import Snackbar from './../../components/Snackbar/Snackbar';
import Level from './level/level';
const Levels = () => {
  const { levels, levelPutStatus } = useSelector((state) => state.levels);
  const opensnack = useSelector((state) => {
    return state.snackbar.open;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);
  const open = useSelector((state) => state.modals.open);

  return (
    <>
      <Title
        title="المستويات"
        btnContent="اضف مستوى جديد"
        onClick={openModal()}
        showbtn={false}
        className="chapters-title"
      />
      <Snackbar open={opensnack} handleClose={closeSnackBar()} />
      <VerticalTimeline animate={true}>
        {levels.map((item, index) => {
          return (
            <Level
              key={index}
              id={item._id}
              deleteitem={deleteLevels}
              title={item.title}
              onClick={() =>
                dispatch(
                  openModals('update-Modal', {
                    ...item,
                    putLevels,
                    updatestatus: levelPutStatus,
                    id: 'levels',
                  })
                )
              }
            />
          );
        })}
      </VerticalTimeline>
      {open && <ModalProvider id="levels" />}
    </>
  );
};
export default memo(Levels);
