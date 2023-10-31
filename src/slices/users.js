import { formatMs } from '@material-ui/core';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import data from '../utilities/constants';
import axios from './../utilities/axios';

const initialState = {
  users: data.User_List,
  storedData: {
    id: 0,
    image: '',
    full_name: '',
    tel: 0,
    adresseMail: '',
    createdAt: '',
  },
  user: [],
  poststatus: 'idle',
  putstatus: 'idle',
  deleteStatus: 'idle',
  UserPostError: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers ', async () => {
  let data;
  try {
    const response = await axios.get(`/admin/users`);
    data = await response.data;
    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const postUsers = createAsyncThunk('users/postUsers', async (formdata) => {
  let data;
  try {
    const response = await axios.post(`/admin/users`, formdata, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    data = await response.data;
    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const putUsers = createAsyncThunk('users/putUsers', async (body) => {
  let data;
  let formdata = new FormData();

  if (body.email) {
    formdata.append('email', body.email);
  } else if (body.phone) {
    formdata.append('phone', body.phone);
  }
  formdata.append('_id', body._id);
  formdata.append('fullName', body.fullName);
  formdata.append('avatar', body.avatar);

  try {
    const response = await axios.put(`/admin/users/${formdata.get('_id')}`, formdata, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    data = await response.data;

    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const deleteUsers = createAsyncThunk('users/deleteUsers', async (id) => {
  let data;

  try {
    const response = await axios.delete(`/admin/users/${id}`);
    data = await response.data;

    if ((response.status = 200)) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    storedData(state, action) {
      const { id, image, full_name, tel, adresseMail, createdAt } = action.payload;

      state.storedData.id = id;
      state.storedData.image = image;
      state.storedData.full_name = full_name;
      state.storedData.tel = tel;
      state.storedData.adresseMail = adresseMail;
      state.storedData.createdAt = createdAt;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.payload.users;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [postUsers.pending]: (state) => {
      state.poststatus = 'loading';
    },
    [postUsers.fulfilled]: (state, action) => {
      state.poststatus = 'succeeded';
      state.user.push(action.payload.payload.users);
    },
    [postUsers.rejected]: (state, action) => {
      state.poststatus = 'failed';
      state.error = action.payload;
    },
    [putUsers.pending]: (state) => {
      state.putstatus = 'loading';
    },
    [putUsers.fulfilled]: (state, action) => {
      state.putstatus = 'succeeded';
      let Updateditem = state.user.find((id) => id === action.payload.payload.user._id);
      Updateditem = action.payload.payload.user;
    },
    [putUsers.rejected]: (state, action) => {
      state.putstatus = 'failed';
      state.error = action.payload;
    },
    [deleteUsers.pending]: (state, action) => {
      state.deleteStatus = 'loading';
    },
    [deleteUsers.fulfilled]: (state, action) => {
      state.deleteStatus = 'succeeded';
      state.user.filter((item) => item._id !== action.payload);
    },
    [deleteUsers.rejected]: (state, action) => {
      state.deleteStatus = 'failed';
      state.error = action.payload;
    },
  },
});
export const { adduser, storedData } = userSlice.actions;
export default userSlice.reducer;
