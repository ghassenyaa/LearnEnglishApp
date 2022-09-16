import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from './../utilities/axios';
import { openSnackBar } from './snackbar';
const initialState = {
  exercices: [],
  exercicesType: [],
  positionarray: [],
  exercisePostStatus: 'idle',
  exercisePutStatus: 'idle',
  exerciseDeleteStatus: 'idle',
  updateposition: 'idle',
  exercisePostError: null,
  exercisePutError: null,
  exerciseDeleteerror: null,
  storedlevels: '',
};
export const fetchExercises = createAsyncThunk('exercises/fetchExercices', async () => {
  let data;
  try {
    const response = await axios.get(`/admin/exercices?sort=order`);
    data = await response.data;

    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const fetchExercisesType = createAsyncThunk(
  'exercisesType/fetchExercicesType',
  async (thunkAPI) => {
    let data;
    try {
      const response = await axios.get(`/admin/exercice-type?sort=order`);
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
export const postExercises = createAsyncThunk(
  'exercises/postExercices',
  async ({ title, exerciceTypeId, lessonId }, thunkAPI) => {
    let data;

    try {
      const response = await axios.post(`/admin/exercices`, { title, exerciceTypeId, lessonId });
      data = await response.data;
      if ((response.status = 200)) {
        thunkAPI.dispatch(openSnackBar('تم اضافة التمرين بنجاح'));
        thunkAPI.dispatch(fetchExercises());
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      thunkAPI.dispatch(
        openSnackBar(
          err.message.includes('empty')
            ? 'الرجاء ادراج جميع المعلومات الخاصة بالتمرين'
            : err.message.includes('duplicate')
            ? 'التمرين موجود بالفعل'
            : ''
        )
      );
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const updatePosition = createAsyncThunk(
  'exercises/updatePosition',
  async (newPos, thunkAPI) => {
    let data;

    try {
      const response = await axios.put(`/admin/exercices/update-order`, newPos, {
        headers: { 'Content-Type': 'application/json' },
      });
      data = await response.data;
      if ((response.status = 200)) {
        thunkAPI.dispatch(openSnackBar('تم حفظ اماكن التمارين بنجاح'));
        thunkAPI.dispatch(fetchExercises());
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      thunkAPI.dispatch(openSnackBar('يجب على الاقل تبديل تمرينين'));

      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const deleteExercises = createAsyncThunk(
  'exercises/deleteExercises',
  async (id, thunkAPI) => {
    let data;

    try {
      const response = await axios.delete(`/admin/exercices/${id}`);
      data = await response.data;

      if ((response.status = 200)) {
        thunkAPI.dispatch(openSnackBar('تم حذف التمرين  بنجاح'));
        thunkAPI.dispatch(fetchExercises());
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);

export const putExercises = createAsyncThunk('exercices/putExercises', async (data2, thunkAPI) => {
  let data;

  try {
    const response = await axios.put(`/admin/exercices/${data2.id}`, data2, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    data = await response.data;

    if ((response.status = 200)) {
      thunkAPI.dispatch(openSnackBar('تم تعديل التمرين بنجاح'));
      thunkAPI.dispatch(fetchExercises());
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
const exercises = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    storedlevel(state, action) {
      const storedlevel = action.payload;
      state.storedlevels = storedlevel;
    },
    updateexercisespostions: (state, action) => {
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
  extraReducers: {
    [fetchExercises.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchExercises.fulfilled]: (state, action) => {
      state.status = 'succeeded';

      state.exercices = action.payload.payload.exercices;
    },
    [fetchExercises.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [postExercises.pending]: (state) => {
      state.exercisePostStatus = 'loading';
    },
    [postExercises.fulfilled]: (state, action) => {
      state.exercisePostStatus = 'succeeded';
      state.exercices.push(action.payload.payload.exercice);
    },
    [postExercises.rejected]: (state, action) => {
      state.exercisePostStatus = 'failed';
      state.exercisePostError = action.payload;
    },
    [putExercises.pending]: (state) => {
      state.exercisePutStatus = 'loading';
    },
    [putExercises.fulfilled]: (state, action) => {
      state.exercisePutStatus = 'succeeded';
      let Updateditem = state.exercices.find((id) => id === action.payload.payload.exercice._id);
      Updateditem = action.payload.payload.exercice;
    },
    [putExercises.rejected]: (state, action) => {
      state.exercisePutStatus = 'failed';
      state.exercisePutError = action.payload;
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
    [deleteExercises.pending]: (state, action) => {
      state.exerciseDeleteStatus = 'loading';
    },
    [deleteExercises.fulfilled]: (state, action) => {
      state.exerciseDeleteStatus = 'succeeded';
      state.exercices.filter((item) => item._id !== action.payload);
    },
    [deleteExercises.rejected]: (state, action) => {
      state.exerciseDeleteStatus = 'failed';
      state.exerciseDeleteerror = action.payload;
    },
    [fetchExercisesType.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchExercisesType.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.exercicesType = action.payload.payload.exerciceTypes;
    },
    [fetchExercisesType.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});
export const { updateexercisespostions, emptyArray, storedlevel } = exercises.actions;
export default exercises.reducer;
