import React, { useState, useEffect, memo, useRef } from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import { TextField, Box, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import './_modals.scss';
import { fetchLanguages } from './../../slices/languages';
import { fetchLevels } from './../../slices/levels';
import { fetchChapters } from './../../slices/chapters';
import * as Yup from 'yup';
import Snackbar from './../Snackbar/Snackbar';
import Select from 'react-select';
import { fetchExercisesType } from './../../slices/exercises';
import { useDispatch, useSelector } from 'react-redux';
import Close from './../../assets/img/Close.png';
import * as yup from 'yup';
import './../Button/_taButton.scss';
import { useDropzone } from 'react-dropzone';
const Modal = ({ open, data, handleClose, closeSnackBar, ...rest }) => {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const [file, setFile] = useState(null);
  const [savefile, setSaveFile] = useState('');
  const [selectedValue, setSelectedValue] = useState(3);
  const [selectedVal, setSelectedVa] = useState(5);
  const [clicked, setIsClicked] = useState(false);
  const [filesize, SetFileSize] = useState(0);
  const opensnack = useSelector((state) => {
    return state.snackbar.open;
  });
  const { languages } = useSelector((state) => state.languages);
  const { levels } = useSelector((state) => state.levels);
  const { chapters } = useSelector((state) => state.chapters);
  const { lessons } = useSelector((state) => state.courses);
  const { exercicesType } = useSelector((state) => state.exercises);
  const { persons } = useSelector((state) => state.persons);

  useEffect(() => {
    if (open) {
      if (data.id === 'chapter') {
        return dispatch(fetchLanguages());
      }

      if (data.id === 'course') {
        return dispatch(fetchLevels());
      }

      if (data.id === 'exercises') {
        return dispatch(fetchChapters()) && dispatch(fetchExercisesType());
      }
      if (data.id === 'level') {
        return dispatch(fetchChapters());
      }
    }
  }, [open, data.id, dispatch, opensnack]);

  const handleSelectChange = (e) => {
    setSelectedValue(e.value);
    setSelectedVa(e.value);
    setIsClicked(true);
  };
  const handleSelChange = (e) => {
    setSelectedVa(e.value);
    setIsClicked(true);
  };
  const { courseId } = useSelector((state) => state.structureBuilder);
  const languageOptions = languages?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });
  console.log('languageOptions', languageOptions);
  const chapterOptions = chapters?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  const handleChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setSaveFile(event.target.files[0]);
    SetFileSize(event.target.files[0].size);
  };
  const levelOptions = levels?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  const lessonOptions = lessons?.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  const exercicesTypeOptions = exercicesType.map((item) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  let formdata = new FormData();
  const [files, setFiles] = useState([]);
  const [savedraggable, setSavedraggable] = useState('');
  const [noDragobbale, setnoDraggable] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setSavedraggable(acceptedFiles[0]);
    },
  });
  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} className="image-draggable" alt="" />
      </div>
    </div>
  ));
  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          handleClose();
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="ta-modal add-video-modal"
    >
      <DialogTitle id="alert-dialog-title">
        <span className="label">{data.title}</span>
        <span className="close-btn" onClick={() => handleClose()}>
          <img src={Close} alt={'Close'} />
        </span>
      </DialogTitle>
      <Snackbar open={opensnack} handleClose={closeSnackBar} />
      <DialogContent className="ta-modal-content-scroll">
        {data.id !== 'exercises' && data.id !== 'level' && (
          <div className="upload-button-wrapper">
            <button id="upload-button">
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div id="upload-button">
                  {!noDragobbale && <div>{thumbs}</div>}
                  {noDragobbale && <img src={file} className="image-no-droggable" alt="" />}
                  {!noDragobbale && savedraggable === '' && (
                    <div className="drag-text">اسحب صورة</div>
                  )}
                </div>
              </div>
            </button>
            <div className="choosefile-wrapper">
              <div className="btn-wrapper">
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setnoDraggable(true);
                  }}
                >
                  اختر صورة
                  <input type="file" onChange={handleChange} accept={'image/*'} />
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setFiles([]);
                  }}
                >
                  إزالة الصورة
                </button>
              </div>
            </div>
          </div>
        )}
        <Formik
          initialValues={{
            name: '',
            title: '',
            text: '',
            time: '',
            description: '',
            languageId: '',
            exerciceTypeId: '',
            lessonId: '',
            image: null,
            submit: null,
          }}
          validationSchema={Yup.object().shape(
            data.id === 'course'
              ? {
                  name: Yup.string().max(255).required(data.inputwarning),
                  description: Yup.string().max(255).required('الوصف مطلوب'),
                  // text: yup.string().min(3).required(),
                  title: yup.string().min(3).required('العنوان مطلوب'),
                  time: yup.number().min(0).required('الوقت مطلوب'),
                }
              : data.id === 'chapter'
              ? {
                  name: Yup.string().max(255).required(data.inputwarning),
                  description: Yup.string().max(255).required('الوصف مطلوب'),
                }
              : data.id === 'language'
              ? {
                  name: Yup.string().max(255).required(data.inputwarning),
                }
              : data.id === 'exercises'
              ? { name: Yup.string().max(255).required(data.inputwarning) }
              : data.id === 'persons'
              ? { name: Yup.string().max(255).required('اسم الشخص مطلوب') }
              : ''
          )}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (data.id === 'course') {
                formdata.append('title', values.name);
                formdata.append('subtitle', values.title);
                formdata.append('time', values.time);
                formdata.append('levelId', clicked ? selectedValue : "it's not clicked");
                formdata.append('intro', values.description);
                formdata.append('thumbnail', savefile === '' ? savedraggable : savefile);
                return dispatch(data.addcomponent(formdata));
              }
              if (data.id === 'chapter') {
                formdata.append('title', values.name);
                formdata.append('languageId', clicked ? selectedValue : "it's not clicked");
                formdata.append('shortDescription', values.description);
                formdata.append('image', savefile === '' ? savedraggable : savefile);
                return dispatch(data.addcomponent(formdata));
              }
              if (data.id === 'language') {
                formdata.append('title', values.name);
                formdata.append('thumbnail', savefile === '' ? savedraggable : savefile);
                return dispatch(data.addcomponent(formdata));
              }
              if (data.id === 'exercises') {
                return dispatch(
                  data.addcomponent({
                    title: values.name,
                    exerciceTypeId: clicked ? selectedVal : '',
                    lessonId: clicked ? selectedValue : '',
                  })
                );
              }
              if (data.id === 'level') {
                dispatch(
                  data.addcomponent({
                    title: values.name,
                    courseId: clicked ? selectedValue : '',
                  })
                );
              }

              if (data.id === 'persons') {
                dispatch(
                  data.addcomponent({ id: persons.length + 1, name: values.name, avatar: file })
                );
              }

              if (isMountedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              if (isMountedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            resetForm,
          }) => (
            <form noValidate onSubmit={handleSubmit} className="ta-form" {...rest}>
              <Typography variant="body2" color="textSecondary" className="label">
                {data.label}
              </Typography>
              <TextField
                className="input"
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
                size="small"
              />

              {data.id === 'course' && (
                <Typography variant="body2" color="textSecondary" className="label">
                  عنوان الدرس
                </Typography>
              )}
              {data.id === 'course' && (
                <TextField
                  className="input"
                  onBlur={handleBlur}
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  margin="normal"
                  name="title"
                  onChange={handleChange}
                  type="text"
                  value={values.title}
                  variant="outlined"
                  size="small"
                />
              )}
              {data.id === 'course' && (
                <Typography variant="body2" color="textSecondary" className="label">
                  الوقت
                </Typography>
              )}
              {data.id === 'course' && (
                <TextField
                  className="input"
                  error={Boolean(touched.time && errors.time)}
                  fullWidth
                  helperText={touched.time && errors.time}
                  margin="normal"
                  name="time"
                  InputProps={{ inputProps: { min: 10 } }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.time}
                  variant="outlined"
                  size="small"
                />
              )}
              <Typography variant="body2" color="textSecondary" className="label">
                {data.id === 'chapter'
                  ? 'اللغة'
                  : data.id === 'course'
                  ? 'المستوى'
                  : data.id === 'exercises'
                  ? 'الحصة'
                  : ''}
              </Typography>
              <div>
                {(data.id === 'course' ||
                  data.id === 'chapter' ||
                  data.id === 'level' ||
                  data.id === 'exercises') && (
                  <Select
                    maxMenuHeight={500}
                    required
                    options={
                      data.id === 'course'
                        ? levelOptions
                        : data.id === 'chapter'
                        ? languageOptions
                        : data.id === 'level'
                        ? chapterOptions
                        : data.id === 'exercises'
                        ? lessonOptions
                        : languageOptions
                    }
                    value={(data.id === 'course'
                      ? levelOptions
                      : data.id === 'chapter'
                      ? languageOptions
                      : data.id === 'exercises'
                      ? lessonOptions
                      : data.id === 'level'
                      ? chapterOptions
                      : ''
                    ).find((obj) => obj._id === selectedValue)}
                    placeholder={
                      data.id === 'chapter'
                        ? 'اختر لغة'
                        : data.id === 'course'
                        ? 'اختر مستوى'
                        : data.id === 'level'
                        ? 'اختر درس'
                        : data.id === 'exercises'
                        ? 'اختر الحصة'
                        : ''
                    }
                    onChange={handleSelectChange}
                  />
                )}
                {data.id !== 'course' && data.id !== 'chapter' && data.id === 'exercises' && (
                  <Select
                    className="selext-exercises-type"
                    options={data.id === 'exercises' ? exercicesTypeOptions : ''}
                    value={(data.id === 'exercises' ? exercicesTypeOptions : '').find(
                      (obj) => obj._id === selectedVal
                    )}
                    placeholder={data.id === 'exercises' ? 'اختر نوع التمارين' : ''}
                    onChange={handleSelChange}
                  />
                )}
              </div>
              {(data.id === 'course' || data.id === 'chapter') && (
                <Typography variant="body2" color="textSecondary" className="label">
                  وصف
                </Typography>
              )}
              {(data.id === 'course' || data.id === 'chapter') && (
                <TextField
                  id="textarea"
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.description}
                  variant="outlined"
                  multiline
                  minRows={5}
                  maxRows={10}
                />
              )}
              <Box mt={2} className="ta-btns-group">
                <Button
                  disabled={isSubmitting}
                  type="reset"
                  className="ta-btn btn-rounded btn-lg"
                  variant="outlined"
                  onClick={resetForm}
                >
                  الغاء
                </Button>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="ta-btn primary btn-rounded btn-lg"
                  onClick={() => {
                    setTimeout(() => {
                      handleClose();
                    }, 1000);
                  }}
                >
                  حفظ
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default memo(Modal);
