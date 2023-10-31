import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  msg: '',
};
const slice = createSlice({
  name: 'snackbar',
  initialState,

  reducers: {
    openSnackBar: (state, action) => {
      state.open = true;
      state.msg = action.payload;
    },
    closeSnackBar: (state, action) => {
      state.open = false;
    },
  },
});

export const reducer = slice.reducer;
export const openSnackBar = (data) => (dispatch) => {
  dispatch(slice.actions.openSnackBar(data));
};

export const closeSnackBar = () => (dispatch) => {
  dispatch(slice.actions.closeSnackBar());
};

export default slice;
