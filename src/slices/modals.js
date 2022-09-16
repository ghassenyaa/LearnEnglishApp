import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};
const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
    },
    closeModal: (state, action) => {
      state.open = false;
    },
  },
});

export const reducer = slice.reducer;

export const openModal = () => (dispatch) => {
  dispatch(slice.actions.openModal());
};

export const closeModal = () => (dispatch) => {
  dispatch(slice.actions.closeModal());
};

export default slice;
