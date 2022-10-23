import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from './types';

const baseURL = 'api/users';
axios.defaults.baseURL = `http://localhost:8080`;

// `_` is a placeholder for url parameter
export const getUser = createAsyncThunk<
  User,
  string,
  { rejectValue: { message: string } }
>('users/fetch', async (_, thunkAPI) => {
  try {
    const res = await axios.get(baseURL);

    const user = await res.data;
    return user;
  } catch (err: Error | any) {
    return thunkAPI.rejectWithValue({
      message: err.message,
    });
  }
});

export const createUser = createAsyncThunk<
  User,
  User,
  { rejectValue: { message: string } }
>('users/create', async (userFormData, thunkAPI) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(baseURL, userFormData, config);
    const data = await res.data;
    console.log('inside createUser', data.data);
    const user: User = { ...data.data };
    return user;
  } catch (err: Error | any) {
    return thunkAPI.rejectWithValue({
      message: err.message,
    });
  }
});
