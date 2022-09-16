import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './../utilities/axios';
import { openSnackBar } from './snackbar';
const initialState = {
  menuCollapse: false,
  lessons: [],
  status: 'idle',
  coursePostStatus: 'idle',
  coursePutStatus: 'idle',
  courseDeleteStatus: 'idle',
  updateposition: 'idle',
  positionarray: [],
  error: null,
  coursePostError: null,
};
export const fetchCourses = createAsyncThunk('lessons/fetchLessons', async () => {
  let data;

  try {
    const response = await axios.get(`/admin/lessons?sort=order`);
    data = await response.data;

    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const postCourses = createAsyncThunk('lessons/postLessons', async (formdata, thunkAPI) => {
  let data;

  try {
    const response = await axios.post(`/admin/lessons`, formdata, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    data = await response.data;

    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم اضافة الدرس بنجاح'));
      thunkAPI.dispatch(fetchCourses());

      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    thunkAPI.dispatch(
      openSnackBar(
        err.message.includes('empty')
          ? 'الرجاء ادراج جميع المعلومات الخاصة بالدرس'
          : err.message.includes('duplicate')
          ? 'الدرس موجود بالدرس'
          : ''
      )
    );
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const putCourses = createAsyncThunk('lessons/putLessons', async (formdata, thunkAPI) => {
  let data;
  try {
    const response = await axios.put(`/admin/lessons/${formdata.get('_id')}`, formdata, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    data = await response.data;
    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم تعديل الدرس بنجاح'));
      thunkAPI.dispatch(fetchCourses());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const updatePosition = createAsyncThunk(
  'lessons/updatePosition',
  async (newPos, thunkAPI) => {
    let data;

    try {
      const response = await axios.put(`/admin/lessons/update-order`, newPos, {
        headers: { 'Content-Type': 'application/json' },
      });
      data = await response.data;
      if ((response.status = 200)) {
        thunkAPI.dispatch(openSnackBar('تم حفظ اماكن الدروس  بنجاح'));
        thunkAPI.dispatch(fetchCourses());

        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const deleteCourses = createAsyncThunk('lessons/deleteLessons', async (id, thunkAPI) => {
  let data;

  try {
    const response = await axios.delete(`/admin/lessons/${id}`);
    data = await response.data;

    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم حذف الدرس بنجاح'));
      thunkAPI.dispatch(fetchCourses());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    thunkAPI.dispatch(openSnackBar('الرجاء اعادة حذف الدرس'));
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers: {
    [fetchCourses.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.lessons = action.payload.payload.lessons;
    },
    [fetchCourses.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [postCourses.pending]: (state) => {
      state.coursePostStatus = 'loading';
    },
    [postCourses.fulfilled]: (state, action) => {
      state.coursePostStatus = 'succeeded';
      state.lessons.push(action.payload.payload.lesson);
    },
    [postCourses.rejected]: (state, action) => {
      state.coursePostStatus = 'failed';
      state.coursePostError = action.error;
    },

    [putCourses.pending]: (state) => {
      state.coursePutStatus = 'loading';
    },
    [putCourses.fulfilled]: (state, action) => {
      state.coursePutStatus = 'succeeded';
      let Updateditem = state.lessons.find((id) => id === action.payload.payload.lesson._id);
      Updateditem = action.payload.payload.lesson;
    },
    [putCourses.rejected]: (state, action) => {
      state.coursePutStatus = 'failed';
      state.error = action.payload;
    },
    [updatePosition.loading]: (state, action) => {
      state.updateposition = 'pending';
    },
    [updatePosition.fulfilled]: (state, action) => {
      state.updateposition = 'succeeded';
    },
    [updatePosition.rejected]: (state, action) => {
      state.updateposition = 'failed';
    },
    [deleteCourses.pending]: (state) => {
      state.courseDeleteStatus = 'loading';
    },
    [deleteCourses.fulfilled]: (state, action) => {
      state.courseDeleteStatus = 'succeeded';
      state.lessons.filter((item) => item._id !== action.payload);
    },
    [deleteCourses.rejected]: (state, action) => {
      state.courseDeleteStatus = 'failed';
      state.error = action.payload;
    },
  },
  reducers: {
    changeState(state) {
      state.menuCollapse = !state.menuCollapse;
    },
    updatecoursespostions: (state, action) => {
      const index = state.positionarray.findIndex((obj) => obj.id === action.payload[0].id);
      const index3 = state.positionarray.findIndex((obj) => obj.id === action.payload[1].id);
      if (index > -1) {
        const index2 = state.positionarray.findIndex(
          (obj) => obj.oldOrder === state.positionarray[index].newOrder
        );
        state.positionarray.splice(index, action.payload[0]);
        state.positionarray.splice(index2, action.payload[1]);
      } else if (index3 > -1) {
        const index23 = state.positionarray.findIndex(
          (obj) => obj.oldOrder === state.positionarray[index3].newOrder
        );
        state.positionarray.splice(index3, action.payload[0]);
        state.positionarray.splice(index23, action.payload[1]);
      } else {
        state.positionarray.push(action.payload[0], action.payload[1]);
      }
    },
    emptyArray: (state, action) => {
      state.positionarray = [];
    },
  },
});
export const { changeState, updatecoursespostions, emptyArray } = coursesSlice.actions;
export const reducer = coursesSlice.reducer;
export default coursesSlice;
