import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { TextField, Box, FormHelperText, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import './_modals.scss';
import { useDispatch, useSelector } from 'react-redux';
import Close from './../../assets/img/Close.png';
// import { closeModals } from './../../slices/modalsaddUser';
import { fetchUsers } from './../../slices/users';
import formatSize from '../../utilities/formatFileSize';
import './../Button/_taButton.scss';
import { useDropzone } from 'react-dropzone';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@material-ui/core/Slide';
import { useEffect } from 'react';

const AddUser = ({ id, open, data, handleClose, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const isMountedRef = useIsMountedRef();
  const [file, setFile] = useState(null);
  const [savefile, setSaveFile] = useState('');
  const [savedraggable, setSavedraggable] = useState('');
  const [noDragobbale, setnoDraggable] = useState(false);
  const [filesize, SetFileSize] = useState(0);
  const [files, setFiles] = useState([]);
  const PostUserStatus = useSelector((state) => state.users.poststatus);
  // const user = useSelector((state) => state.users.user);
  const regexTel = /^(00216)[2459][0-9]{7}|4[0-9]{7}|5[0-9]{7}|9[0-9]{7}$/;
  const [phoneState, setPhoneState] = useState('');

  const [snackstate, setSnack] = React.useState({
    open: false,
    Transition: Fade,
  });
  const handleClick = (Transition) => () => {
    setSnack({
      open: true,
      Transition,
    });
  };
  setTimeout(() => {}, 3050);
  const handleClosesnack = () => {
    setSnack({
      ...snackstate,
      open: false,
    });
  };
  const handleChange = (event) => {
    setSaveFile(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]));
    SetFileSize(event.target.files[0].size);
  };
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

  let formdata = new FormData();
  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} className="image-draggable" alt="" />
      </div>
    </div>
  ));
  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }
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
        <span className="close-btn" onClick={() => handleClose(id)}>
          <img src={Close} alt={'Close'} />
        </span>
      </DialogTitle>

      <DialogContent className="ta-modal-content-scroll">
        <div className="upload-button-wrapper">
          <div className="choosefile-wrapper">
            <div className="btn-wrapper">
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div id="upload-button">
                  {!noDragobbale && <div>{thumbs}</div>}
                  {noDragobbale && <img src={file} className="image-no-droggable" alt="" />}
                  {!noDragobbale && savedraggable === '' && (
                    <p className="drag-text_user">اسحب صورة</p>
                  )}
                </div>
              </div>
              <button
                style={{ cursor: 'pointer', marginRight: '50px', marginTop: '20px' }}
                onClick={() => {
                  setnoDraggable(true);
                }}
              >
                اختر صورة
                {noDragobbale && <input type="file" onChange={handleChange} />}
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setFiles([]);
                }}
                style={{ marginTop: '20px' }}
              >
                إزالة الصورة
              </button>
            </div>
            <span>JPEG or PNG Max Size of 500KB </span>
          </div>
          {formatSize(filesize) > formatSize(500000) && <span>لم يتم اختيار ملف</span>}
        </div>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: '',
            avatar: '',
          }}
          validationSchema={Yup.object().shape({
            fullName: Yup.string().max(255).required('الاسم واللقب مطلوبان'),
            phone: Yup.string(),
            email: Yup.string().email('البريد غير صحيح ').max(255),
            password: Yup.string().required(''),
            passwordConfirm: Yup.string().when('password', {
              is: (val) => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf([Yup.ref('password')], ''),
            }),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (values.email === '') {
                formdata.append('phone', values.phone);
                setPhoneState(values.phone);
              }
              if (values.phone === '') {
                formdata.append('email', values.email);
              }
              formdata.append('fullName', values.fullName);
              formdata.append('password', values.password);
              formdata.append('passwordConfirm', values.passwordConfirm);
              formdata.append('avatar', savefile === '' ? savedraggable : savefile);
              dispatch(data.addcomponent(formdata));
              // dispatch(closeModals('add-user'));
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
              <Snackbar
                open={snackstate.open}
                onClose={handleClosesnack}
                transitionDuration={250}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
              >
                <Alert
                  severity={
                    PostUserStatus === 'succeeded'
                      ? 'success'
                      : values.fullName === ''
                      ? 'error'
                      : 'success'
                  }
                >
                  {PostUserStatus === 'loading'
                    ? 'يرجى الانتضار'
                    : PostUserStatus === 'succeeded'
                    ? 'تم اضافة المستعمل بنجاح'
                    : values.fullName === ''
                    ? 'لا يمكن ترك الاسم   فارغ'
                    : values.email === '' && values.phone === ''
                    ? 'عليك ادخال رقم الهاتف او البريد الالكتروني'
                    : (values.phone === '' ||
                        !values.phone?.match(
                          regexTel,
                          'Password must contain at least 8 characters, one uppercase, one number and one special case character'
                        )) &&
                      values.email === ''
                    ? 'رقم الهاتف يبدا ب  00216 عليك التثبت من رقم الهاتف'
                    : values.password === ''
                    ? 'عليك ادخال كلمة السر'
                    : values.password !== values.passwordConfirm
                    ? 'تاكد من تطابق كلمة السر '
                    : ''}
                </Alert>
              </Snackbar>
              <Typography variant="body2" color="textSecondary" className="label">
                {' '}
                الاسم و اللقب
              </Typography>
              <TextField
                error={Boolean(touched.fullName && errors.fullName)}
                fullWidth
                helperText={touched.fullName && errors.fullName}
                margin="normal"
                name="fullName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.fullName}
                variant="outlined"
                size="small"
              />
              <Typography variant="body2" color="textSecondary" className="label">
                رقم الهاتف
              </Typography>
              <TextField
                error={Boolean(touched.phone && errors.phone)}
                fullWidth
                disabled={values.email !== ''}
                helperText={touched.phone && errors.phone}
                margin="normal"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.phone}
                variant="outlined"
                size="small"
              />
              <Typography variant="body2" color="textSecondary" className="label">
                البريد الالكتروني
              </Typography>
              {
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  disabled={values.phone !== ''}
                  helperText={touched.email && errors.email}
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                  size="small"
                />
              }
              <Typography variant="body2" color="textSecondary" className="label">
                كلمه السر
              </Typography>
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
                size="small"
              />
              <Typography variant="body2" color="textSecondary" className="label">
                تأكيد كلمة السر
              </Typography>
              <TextField
                error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                fullWidth
                helperText={touched.passwordConfirm && errors.passwordConfirm}
                margin="normal"
                name="passwordConfirm"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.passwordConfirm}
                variant="outlined"
                size="small"
              />

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
                  onClick={handleClick(SlideTransition)}
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
export default AddUser;
