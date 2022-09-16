import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from './../utilities/axios';
import { openSnackBar } from './snackbar';
const initialState = {
  languages: [],
  languageDeleteStatus: 'idle',
  languagePutStatus: 'idle',
  languagefetcherror: null,
  languagePostError: null,
  languagePostStatus: 'idle',
  languagePutError: null,
  languageDeleteError: null,
};
export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async () => {
  let data;
  try {
    const response = await axios.get(`/admin/languages`);
    data = await response.data;

    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const postLanguages = createAsyncThunk(
  'languages/postLanguages',
  async (formdata, thunkAPI) => {
    let data;

    try {
      const response = await axios.post(`/admin/languages`, formdata, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      data = await response.data;
      if ((response.status = 200)) {
        thunkAPI.dispatch(openSnackBar('تم اضافة اللغة  بنجاح'));
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      thunkAPI.dispatch(
        openSnackBar(
          err.message.includes('empty')
            ? 'الرجاء ادراج جميع المعلومات الخاصة باللغة'
            : err.message.includes('duplicate')
            ? 'الدرس موجود باللغة'
            : ''
        )
      );
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const deleteLanguages = createAsyncThunk(
  'languages/deleteLanguages',
  async (id, thunkAPI) => {
    let data;

    try {
      const response = await axios.delete(`/admin/languages/${id}`);
      data = await response.data;

      if ((response.status = 200)) {
        thunkAPI.dispatch(openSnackBar('تم حذف اللغة  بنجاح'));
        thunkAPI.dispatch(fetchLanguages());

        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const putLanguages = createAsyncThunk('languages/putLanguages', async (body, thunkAPI) => {
  let data;

  try {
    const response = await axios.put(`/admin/languages/${body.get('_id')}`, body, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    data = await response.data;

    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم تعديل اللغة بنجاح'));
      thunkAPI.dispatch(fetchLanguages());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

const languages = createSlice({
  name: 'languages',
  initialState,
  extraReducers: {
    [fetchLanguages.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchLanguages.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.languages = action.payload.payload.languages;
    },
    [fetchLanguages.rejected]: (state, action) => {
      state.status = 'failed';
      state.languagefetcherror = action.payload;
    },
    [postLanguages.pending]: (state) => {
      state.languagePostStatus = 'loading';
    },
    [postLanguages.fulfilled]: (state, action) => {
      state.languagePostStatus = 'succeeded';
      state.languages.push(action.payload.payload.language);
    },
    [postLanguages.rejected]: (state, action) => {
      state.languagePostStatus = 'failed';
      state.languagePostError = action.error;
    },
    [putLanguages.pending]: (state) => {
      state.languagePutStatus = 'loading';
    },
    [putLanguages.fulfilled]: (state, action) => {
      state.languagePutStatus = 'succeeded';
      let Updateditem = state.languages.find((id) => id === action.payload.payload.language._id);
      Updateditem = action.payload.payload.language;
    },
    [putLanguages.rejected]: (state, action) => {
      state.languagePutStatus = 'failed';
      state.languagePutError = action.payload;
    },
    [deleteLanguages.pending]: (state, action) => {
      state.languageDeleteStatus = 'loading';
    },
    [deleteLanguages.fulfilled]: (state, action) => {
      state.languageDeleteStatus = 'succeeded';
      state.languages.filter((item) => item._id !== action.payload);
    },
    [deleteLanguages.rejected]: (state, action) => {
      state.languageDeleteStatus = 'failed';
      state.languageDeleteError = action.payload;
    },
  },
});

export const { addLanguage } = languages.actions;
export default languages.reducer;
