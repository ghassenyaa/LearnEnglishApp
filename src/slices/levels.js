import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from './../utilities/axios';
import { openSnackBar } from './snackbar';
const initialState = {
  levels: [],
  status: 'idle',
  levelDeleteStatus: 'idle',
  levelPutStatus: 'idle',
  levelPostStatus: 'idle',
  levelPostError: null,
  levelPutError: null,
  error: null,
};

export const fetchLevels = createAsyncThunk('levels/fetchLevels', async () => {
  let data;
  try {
    const response = await axios.get(`/admin/levels`);
    data = await response.data;
    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const postLevels = createAsyncThunk('levels/postLevels', async (level, thunkAPI) => {
  let data;
  try {
    const response = await axios.post(`/admin/levels`, level);
    data = await response.data;
    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم اضافة المستوى  بنجاح'));
      thunkAPI.dispatch(fetchLevels());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    thunkAPI.dispatch(
      openSnackBar(
        err.message.includes('empty')
          ? 'الرجاء ادراج جميع المعلومات الخاصة بالمستوى'
          : err.message.includes('duplicate')
          ? 'الدرس موجود بالمستوى'
          : ''
      )
    );
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const putLevels = createAsyncThunk('levels/putLevels', async (body, thunkAPI) => {
  let data;
  try {
    const response = await axios.put(`/admin/levels/${body.id}`, body);
    data = await response.data;
    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم تعديل المستوى بنجاح'));
      thunkAPI.dispatch(fetchLevels());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const deleteLevels = createAsyncThunk('levels/deleteLevels', async (id, thunkAPI) => {
  let data;

  try {
    const response = await axios.delete(`/admin/levels/${id}`);
    data = await response.data;

    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم  حذف المستوى  بنجاح'));
      thunkAPI.dispatch(fetchLevels());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLevels.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchLevels.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.levels = action.payload.payload.levels;
    },
    [fetchLevels.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [postLevels.pending]: (state) => {
      state.levelPostStatus = 'loading';
    },
    [postLevels.fulfilled]: (state, action) => {
      state.levelPostStatus = 'succeeded';
      state.levels.push(action.payload.payload.level);
    },
    [postLevels.rejected]: (state, action) => {
      state.levelPostStatus = 'failed';
      state.postError = action.payload;
    },
    [putLevels.pending]: (state) => {
      state.levelPutStatus = 'loading';
    },
    [putLevels.fulfilled]: (state, action) => {
      state.levelPutStatus = 'succeeded';
      let updateitem = state.levels.find((item) => {
        return item._id === action.payload.payload.level._id;
      });
      updateitem = action.payload.payload.level;
    },
    [putLevels.rejected]: (state, action) => {
      state.levelPutStatus = 'failed';
      state.puterror = action.payload;
    },
    [deleteLevels.pending]: (state, action) => {
      state.levelDeleteStatus = 'loading';
    },
    [deleteLevels.fulfilled]: (state, action) => {
      state.levelDeleteStatus = 'succeeded';
      state.levels.filter((item) => item._id !== action.payload);
    },
    [deleteLevels.rejected]: (state, action) => {
      state.levelDeleteStatus = 'failed';
      state.error = action.payload;
    },
  },
});

export const reducer = levelsSlice.reducer;
export default levelsSlice;
