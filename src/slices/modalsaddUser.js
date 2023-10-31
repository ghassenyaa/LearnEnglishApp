import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: [
    {
      id: 'add-user',
      open: false,
    },
    { id: 'update-Modal', open: false, data: '' },
  ],
};

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModals: (state, action) => {
      const { id, data } = action.payload;
      const index = state.modals.findIndex((modal) => modal.id === id);
      state.modals[index].open = true;
      state.modals[index].data = data;
    },
    closeModals: (state, action) => {
      const id = action.payload;
      const index = state.modals.findIndex((modal) => modal.id === id);
      state.modals[index].open = false;
    },
  },
});

export const reducer = slice.reducer;

export const openModals = (id, data) => (dispatch) => {
  dispatch(slice.actions.openModals({ id, data }));
};

export const closeModals = (id) => (dispatch) => {
  dispatch(slice.actions.closeModals(id));
};

export default slice;
