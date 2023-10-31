import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from './../utilities/axios';
import { openSnackBar } from './snackbar';
const initialState = {
  questionBlocks: [],
  questionBlocksPostStatus: 'idle',
  questionBlocksPostError: null,
  questions: [],
  status: null,
};

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  let data;
  try {
    const response = await axios.get(`/admin/questions`);
    data = await response.data;
    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const postquestionBlocks = createAsyncThunk(
  'questionBlocks/postquestionBlocks',
  async (formdata, thunkAPI) => {
    let data;
    const formeddata = new FormData();
    function appendArray(form_data, values, name) {
      if (!values && name) form_data.append(name, '');
      else {
        if (typeof values == 'object') {
          for (var key in values) {
            if (typeof values[key] == 'object')
              appendArray(form_data, values[key], name + '[' + key + ']');
            else form_data.append(name + '[' + key + ']', values[key]);
          }
        } else form_data.append(name, values);
      }
      return form_data;
    }
    function getFormData(formeddata, object) {
      Object.keys(object).forEach((key) => formeddata.append(key, object[key]));
      return formeddata;
    }
    getFormData(formeddata, formdata.builder[0]);
    appendArray(formeddata, formdata.questionBlocks, 'questionBlocks');
    try {
      const response = await axios.post(`/admin/questions`, formeddata, {
        headers: { 'Content-Type': ' multipart/form-data' },
      });
      data = await response.data;
      if ((response.status = 200)) {
        thunkAPI.dispatch(openSnackBar('تم اضافة السؤال بنجاح'));
        thunkAPI.dispatch(fetchQuestions());
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      thunkAPI.dispatch(
        openSnackBar(
          err.message.includes('empty')
            ? 'الرجاء ادراج جميع المعلومات الخاصة بالسؤال'
            : err.message.includes('duplicate')
            ? 'السؤال موجود بالفعل'
            : ''
        )
      );
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);

const questionBlocksSlice = createSlice({
  name: 'questionBlocks',
  initialState,
  reducers: {},
  extraReducers: {
    [postquestionBlocks.pending]: (state) => {
      state.questionBlocksPostStatus = 'loading';
    },
    [postquestionBlocks.fulfilled]: (state, action) => {
      state.questionBlocksPostStatus = 'succeeded';
    },
    [postquestionBlocks.rejected]: (state, action) => {
      state.questionBlocksPostStatus = 'failed';
      state.questionBlocksPostError = action.error;
    },
    [fetchQuestions.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.questions = action.payload.payload.questions;
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.status = 'failed';
      state.status = action.payload;
    },
  },
});
export const { initiatestatus } = questionBlocksSlice.actions;

export const reducer = questionBlocksSlice.reducer;
export default questionBlocksSlice;
