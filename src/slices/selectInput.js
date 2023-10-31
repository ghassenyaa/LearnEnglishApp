import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  label: [],
  checked: null,
  id: null,
  questionBlockTypeId: '',
  order: '',
};
const slice = createSlice({
  name: 'selectinput',
  initialState,
  reducers: {
    SelectInput: (state, action) => {
      state.questionBlockTypeId = action.payload.questionBlockTypeId;
      if (action.payload.checked) {
        state.label.push(action.payload);
        state.order = action.payload.order;
      } else {
        if (action.payload.notchecked) {
          state.label = state.label.filter((item) => action.payload.label !== item.label);
        }
      }
    },
  },
});
export const reducer = slice.reducer;
export const { SelectInput } = slice.actions;
export default slice;
