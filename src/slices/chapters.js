import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { openSnackBar } from './snackbar';
import axios from './../utilities/axios';
const initialState = {
  chapters: [],
  status: 'idle',
  chapterDeleteStatus: 'idle',
  chapterPutStatus: 'idle',
  chapterPostStatus: 'idle',
  chapterFetcherror: null,
  chapterPostError: null,
  chapterputError: null,
  chapterDeleteError: null,
};
export const fetchChapters = createAsyncThunk('chapters/fetchChapters', async () => {
  let data;
  try {
    const response = await axios.get(`/admin/courses`);
    data = await response.data;
    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const postChapters = createAsyncThunk(
  'chapters/postChapters',
  async (formdata, thunkAPI) => {
    let data;

    try {
      const response = await axios.post(`/admin/courses`, formdata, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      data = await response.data;
      if ((response.status = 200)) {
        thunkAPI.dispatch(openSnackBar('تم اضافة الفصل بنجاح'));
        thunkAPI.dispatch(fetchChapters());
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      thunkAPI.dispatch(
        openSnackBar(
          err.message.includes('empty')
            ? 'الرجاء ادراج جميع المعلومات الخاصة بالفصل'
            : err.message.includes('duplicate')
            ? 'الفصل موجود بالفعل'
            : ''
        )
      );
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const putChapters = createAsyncThunk('chapters/putChapters', async (body, thunkAPI) => {
  let data;

  try {
    const response = await axios.put(`/admin/courses/${body.get('_id')}`, body, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    data = await response.data;

    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم تعديل الفصل بنجاح'));
      thunkAPI.dispatch(fetchChapters());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const deleteChapters = createAsyncThunk('chapters/deleteChapters', async (id, thunkAPI) => {
  let data;

  try {
    const response = await axios.delete(`/admin/courses/${id}`);
    data = await response.data;

    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم حذف الفصل بنجاح'));
      thunkAPI.dispatch(fetchChapters());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    thunkAPI.dispatch(openSnackBar('الرجاء حذف الفصل'));

    return Promise.reject(err.message ? err.message : data?.message);
  }
});
const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchChapters.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchChapters.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.chapters = action.payload.payload.courses;
    },
    [fetchChapters.rejected]: (state, action) => {
      state.status = 'failed';
      state.chapterFetchError = action.payload;
    },
    [postChapters.pending]: (state) => {
      state.chapterPostStatus = 'loading';
    },
    [postChapters.fulfilled]: (state, action) => {
      state.chapterPostStatus = 'succeeded';
      state.chapters.push(action.payload.payload.course);
    },
    [postChapters.rejected]: (state, action) => {
      state.chapterPostStatus = 'failed';
      state.chapterPostError = action.error;
    },
    [putChapters.pending]: (state) => {
      state.chapterPutStatus = 'loading';
    },
    [putChapters.fulfilled]: (state, action) => {
      state.chapterPutStatus = 'succeeded';
      let Updateditem = state.chapters.find((id) => id === action.payload.payload.course._id);
      Updateditem = action.payload.payload.course;
    },
    [putChapters.rejected]: (state, action) => {
      state.chapterPutStatus = 'failed';
      state.chapterPutError = action.payload;
    },
    [deleteChapters.pending]: (state, action) => {
      state.chapterDeleteStatus = 'loading';
    },
    [deleteChapters.fulfilled]: (state, action) => {
      state.chapterDeleteStatus = 'succeeded';
      state.chapters.filter((item) => item._id !== action.payload);
      state.chapterDeleteStatus = 'idle';
    },
    [deleteChapters.rejected]: (state, action) => {
      state.chapterDeleteStatus = 'failed';
      state.chapterDeleteError = action.payload;
    },
  },
});
export const { initiatestatus } = chaptersSlice.actions;

export const reducer = chaptersSlice.reducer;
export default chaptersSlice;
