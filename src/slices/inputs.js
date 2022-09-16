import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const initialState = {
  inputvalue: '',
  inputs: [{ position: 0, content: '' }],
  isHidden: false,
};
const slice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    handleChangeInput: (state, action) => {
      const newInputFields = state.inputs.map((i) => {
        if (action.payload.id === i.position) {
          i[action.payload.event.target.name] = action.payload.event.target.value;
        }

        return i;
      });
      state.inputs = newInputFields;
      // state.inputs.push(action.payload.event.target.value)
    },

    addinput: (state, action) => {
      state.inputs.push(action.payload);
    },

    deleteinput: (state, action) => {
      state.inputs = state.inputs.filter((elt) => elt.position !== action.payload);
    },
  },
});
export const reducer = slice.reducer;
export const { addinput, deleteinput, getInputValue, handleChangeInput } = slice.actions;
export default slice;
