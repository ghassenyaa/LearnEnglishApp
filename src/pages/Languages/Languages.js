import React, { useEffect, memo } from 'react';
import './_language.scss';
import LangCard from './languagesCards/langCard';
import Title from '../../components/Title/Title';
import ModalsProvider from '../../components/ModalsProvider';
import { openModal } from '../../slices/modals';
import { useSelector, useDispatch } from 'react-redux';
import genrateColors from './../../utilities/generatecolors';
import genrateColors2 from './../../utilities/generateDarkColors';
import { fetchLanguages, putLanguages, deleteLanguages } from './../../slices/languages';
import { openModals } from '../../slices/modalsaddUser';
import { closeSnackBar } from '../../slices/snackbar';
import Snackbar from './../../components/Snackbar/Snackbar';
import 'react-toastify/dist/ReactToastify.css';
const Languages = () => {
  const dispatch = useDispatch();
  const {
    languages,
    languageDeleteStatus,
    languagePutStatus,
    languagePostError,
    languagePostStatus,
  } = useSelector((state) => state.languages);
  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch, languageDeleteStatus, languagePutStatus, languagePostError]);
  const opensnack = useSelector((state) => {
    return state.snackbar.open;
  });
  const open = useSelector((state) => state.modals.open);
  return (
    <>
      <Snackbar open={opensnack} status={languageDeleteStatus} handleClose={closeSnackBar()} />
      <Title
        title={'اللغات:'}
        btnContent={'اضف لغة جديدة'}
        showbtn={false}
        className="chapters-title"
        onClick={openModal()}
      />
      <div className="cards-wrapper">
        {languages.map((language, index) => {
          return (
            <LangCard
              key={index}
              title={language.title}
              icon={language.thumbnail}
              courses={language.courses}
              updateId={'languages'}
              deleteStatus={languageDeleteStatus}
              updateid="languages"
              color2={genrateColors()}
              color1={genrateColors2()}
              statusmsg={'تم حذف اللغة بنجاح'}
              failstatus={'لم يتم حذف اللغة'}
              deletestatus={languageDeleteStatus}
              deleteitem={deleteLanguages}
              id={language._id}
              onClick={() =>
                dispatch(
                  openModals('update-Modal', {
                    ...language,
                    putLanguages,
                    updatestatus: languagePutStatus,
                    id: 'languages',
                  })
                )
              }
            />
          );
        })}
      </div>
      {open && <ModalsProvider id="language" />}
    </>
  );
};

export default memo(Languages);
