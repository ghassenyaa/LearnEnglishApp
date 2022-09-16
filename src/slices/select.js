import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  selectedPerson: [],
  select: false,
  blockId: '',
  temporarypersons: [],
};
const slice = createSlice({
  name: 'selectedPerson',
  initialState,
  reducers: {
    getblockId: (state, action) => {
      state.blockId = action.payload.blockId;
    },
    saveselectedPerson: (state, action) => {
      state.selectedPerson.push(action.payload.selectedPerson);
      state.temporarypersons = state.selectedPerson.slice(-1);
    },
    emptytemporaryarray: (state, action) => {
      state.temporarypersons = [];
    },
    emptySeletedPersonsArray: (state, action) => {
      state.selectedPerson = [];
    },
  },
});
export const reducer = slice.reducer;
export const { saveselectedPerson, getblockId, emptytemporaryarray, emptySeletedPersonsArray } =
  slice.actions;
export default slice;
