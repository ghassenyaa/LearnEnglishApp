import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  persons: [],
};
const slice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    savePerson: (state, action) => {
      state.persons.push(action.payload);
    },
  },
});
export const reducer = slice.reducer;
export const { savePerson } = slice.actions;
export default slice;
