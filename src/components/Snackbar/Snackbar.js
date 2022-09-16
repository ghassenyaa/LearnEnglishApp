import React, { memo } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
const SnackbarComponent = (props) => {
  const { open, handleClose } = props;
  const msg = useSelector((state) => {
    return state.snackbar.msg;
  });
  const dispatch = useDispatch();

  return (
    <>
      <Snackbar
        open={open}
        transitionDuration={200}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={() => dispatch(handleClose)}
      >
        <Alert
          severity={
            msg.includes('بنجاح')
              ? 'success'
              : msg.includes('ادراج') || msg.includes('موجود')
              ? 'error'
              : 'success'
          }
        >
          {msg.includes('بنجاح') ? msg : msg.includes('ادراج') || msg.includes('موجود') ? msg : ''}
        </Alert>
      </Snackbar>
    </>
  );
};
export default memo(SnackbarComponent);
