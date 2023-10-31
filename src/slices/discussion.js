import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  open: false,
  senderdata: [],
};
const slice = createSlice({
  name: 'discussion',
  initialState,

  reducers: {
    openDiscussion: (state, action) => {
      state.open = true;
      state.senderdata.push(action.payload);
    },
    closeDiscussion: (state, action) => {
      state.open = false;
    },
  },
});

export const reducer = slice.reducer;
export const openDiscussion = (data) => (dispatch) => {
  dispatch(slice.actions.openDiscussion(data));
};

export const closeDiscussion = () => (dispatch) => {
  dispatch(slice.actions.closeDiscussion());
};

export default slice;
