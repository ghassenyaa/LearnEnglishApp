import React, { memo, useEffect } from 'react';
import Chapter from '../../components/chapter/Chapter';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChapters, putChapters, deleteChapters } from './../../slices/chapters';
import './_chaptersList.scss';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../components/Title/Title';
import Snackbar from './../../components/Snackbar/Snackbar';
import { openModal } from '../../slices/modals';
import { openModals } from '../../slices/modalsaddUser';
import ModalProvider from './../../components/ModalsProvider/index';
import { closeSnackBar } from '../../slices/snackbar';
const ChaptersList = () => {
  const dispatch = useDispatch();
  const { chapters, chapterDeleteStatus, chapterPutStatus, chapterPostStatus } = useSelector(
    (state) => state.chapters
  );
  useEffect(() => {
    dispatch(fetchChapters());
  }, [dispatch, chapterDeleteStatus, chapterPutStatus, chapterPostStatus]);
  const open = useSelector((state) => state.modals.open);
  const opensnack = useSelector((state) => {
    return state.snackbar.open;
  });
  return (
    <>
      <Snackbar open={opensnack} handleClose={closeSnackBar()} />
      <Title
        title={'الفصول'}
        btnContent={'اضف فصل جديد'}
        onClick={openModal()}
        showbtn={false}
        className="chapters-title"
      />
      <div className="chapter-wrapper">
        {chapters.map((chapter, index) => {
          return (
            <Chapter
              key={index}
              updateid="chapter"
              title={chapter?.title}
              levels={chapter?.levels}
              id={chapter?._id}
              deleteitem={deleteChapters}
              description={chapter?.shortDescription}
              image={chapter?.image}
              onClick={() =>
                dispatch(
                  openModals('update-Modal', {
                    ...chapter,
                    putChapters,
                    id: 'chapters',
                  })
                )
              }
            />
          );
        })}
      </div>
      {open && <ModalProvider id="chapters" />}
    </>
  );
};
export default memo(ChaptersList);
