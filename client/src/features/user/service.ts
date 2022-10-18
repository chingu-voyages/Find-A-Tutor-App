import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from './types';

const baseURL = 'api/users';

// `_` is a placeholder for url parameter
export const getUsers = createAsyncThunk<
  User[],
  string,
  { rejectValue: { message: string } }
>('users/fetch', async (_, thunkAPI) => {
  try {
    const res = await axios.get(baseURL);

    const users = await res.data;
    return users;
  } catch (err: Error | any) {
    return thunkAPI.rejectWithValue({
      message: err.message,
    });
  }
});
