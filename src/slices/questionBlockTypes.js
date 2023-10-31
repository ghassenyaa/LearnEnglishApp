import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from './../utilities/axios';
const initialState = {
  questionBlockType: [],
};

export const fetchQuestionBlockType = createAsyncThunk(
  'questions/fetchQuestionBlockType',
  async () => {
    let data;
    try {
      const response = await axios.get(`/admin/question-block-types?sort=order`);
      data = await response.data;

      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
const questionBlockType = createSlice({
  name: 'questionBlockType',
  initialState,

  extraReducers: {
    [fetchQuestionBlockType.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchQuestionBlockType.fulfilled]: (state, action) => {
      state.status = 'succeeded';

      state.questionBlockType = action.payload.payload.questionBlockTypes;
    },
    [fetchQuestionBlockType.rejected]: (state, action) => {
      state.status = 'failed';

      state.error = action.payload;
    },
  },
});
export const reducer = questionBlockType.reducer;
export default questionBlockType;
