import React, { useState, useEffect, memo } from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import { TextField, Box, Typography, FormHelperText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import './_modals.scss';
import { useDispatch } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeModals } from '../../slices/modalsaddUser';
import Close from './../../assets/img/Close.png';
import Plus from './../../assets/img/Plus.png';
import './../Button/_taButton.scss';
import Snackbar from './../Snackbar/Snackbar';
import { closeSnackBar } from '../../slices/snackbar';
const UpdateModal = ({ id, open, data, ...rest }) => {
  const isMountedRef = useIsMountedRef();
  const [savefile, setSaveFile] = useState('');
  const [changephoto, setChangePhoto] = useState(false);
  const [file, setFile] = useState(null);
  let formdata = new FormData();
  const handleClose = (id) => {
    dispatch(closeModals(id));
  };
  const opensnack = useSelector((state) => {
    return state.snackbar.open;
  });
  const [filesize, SetFileSize] = useState(0);
  const handleChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setSaveFile(event.target.files[0]);
    SetFileSize(event.target.files[0].size);
    setChangePhoto(true);
  };
  const dispatch = useDispatch();
  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          handleClose(id);
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="ta-modal add-video-modal"
    >
      <DialogTitle id="alert-dialog-title">
        <span className="label">تعديل</span>
        <span
          className="close-btn"
          onClick={() => {
            handleClose(id);
          }}
        >
          <img src={Close} alt={'Close'} />
        </span>
      </DialogTitle>
      <Snackbar open={opensnack} handleClose={closeSnackBar} />
      <DialogContent className="ta-modal-content-scroll">
        {data.id !== 'exercises' && data.id !== 'levels' && (
          <div className="upload-button-wrapper">
            <button id="upload-button">
              {data.image === null ? (
                <img src={Plus} id="PlusImg" alt={'PlusImg'} />
              ) : file === null ? (
                <img
                  src={
                    data.id === 'chapters'
                      ? data.image
                      : data.id === 'courses' || data.id === 'languages'
                      ? data.thumbnail
                      : ''
                  }
                  alt={'uploaded-img'}
                  id="uploaded-img"
                  accept="image/*"
                />
              ) : (
                <img src={file} alt={'uploaded-img'} id="uploaded-img" accept="image/*" />
              )}
            </button>
            <div className="choosefile-wrapper" style={{ cursor: 'pointer' }}>
              <div className="btn-wrapper">
                <button style={{ cursor: 'pointer' }}>
                  اختر صورة
                  <input type="file" onChange={handleChange} />
                </button>
              </div>
            </div>
          </div>
        )}
        <Formik
          initialValues={
            data.id === 'chapters'
              ? {
                  name: data.title,
                  description: data.shortDescription,
                  img: data.image,
                  submit: null,
                }
              : data.id === 'courses'
              ? {
                  name: data.title,
                  title: data.subtitle,
                  description: data.intro,
                  img: data.thumbnail,
                  submit: null,
                }
              : data.id === 'exercises'
              ? {
                  name: data.title,
                  submit: null,
                }
              : data.id === 'levels'
              ? { name: data.title }
              : data.id === 'languages'
              ? {
                  name: data.title,
                }
              : ''
          }
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (data.id === 'chapters') {
                formdata.append('title', values.name);
                formdata.append('_id', data._id);
                formdata.append('languageId', data.languageId._id);
                formdata.append('shortDescription', values.description);
                formdata.append('image', changephoto ? savefile : data.image);
                return dispatch(data.putChapters(formdata, data._id));
              }
              if (data.id === 'courses') {
                formdata.append('title', values.name);
                formdata.append('subtitle', values.title);
                formdata.append('_id', data._id);
                formdata.append('time', data.time);
                formdata.append('levelId', data.levelId._id);
                formdata.append('intro', values.description);
                formdata.append('thumbnail', changephoto ? savefile : data.thumbnail);
                return dispatch(data.putCourses(formdata));
              }
              if (data.id === 'languages') {
                formdata.append('thumbnail', changephoto ? savefile : data.thumbnail);
                formdata.append('title', values.name);
                formdata.append('_id', data._id);
                return dispatch(data.putLanguages(formdata, data._id));
              }
              if (data.id === 'exercises') {
                return dispatch(
                  data.putExercises({
                    title: values.name,
                    id: data._id,
                  })
                );
              }

              if (data.id === 'levels') {
                return dispatch(
                  data.putLevels({
                    title: values.name,
                    id: data._id,
                  })
                );
              }

              if (isMountedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }
            } catch (err) {
              console.error(err);
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
                تعديل العنوان
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

              {data.id === 'courses' && (
                <Typography variant="body2" color="textSecondary" className="label">
                  تعديل عنوان الدرس
                </Typography>
              )}
              {data.id === 'courses' && (
                <TextField
                  className="input"
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  margin="normal"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.title}
                  variant="outlined"
                  size="small"
                />
              )}
              {data.id !== 'languages' && data.id !== 'exercises' && data.id !== 'levels' && (
                <Typography variant="body2" color="textSecondary" className="label">
                  تعديل الوصف
                </Typography>
              )}
              {data.id !== 'languages' && data.id !== 'exercises' && data.id !== 'levels' && (
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

              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
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
                      handleClose(id);
                    }, 2500);
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
export default memo(UpdateModal);
