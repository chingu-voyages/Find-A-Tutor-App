import { createAsyncThunk } from '@reduxjs/toolkit';
import { Account } from '../models/Account';
import { User } from '../models/User';
import authService from '../services/auth.service';

const signIn = createAsyncThunk<
  User,
  Account,
  { rejectValue: { message: string } }
>('users/signin', async (signInFormData, thunkAPI) => {
  try {
    const account = await authService.signIn(signInFormData);
    // console.log('thunk user', account);
    return account;
  } catch (err: Error | any) {
    return thunkAPI.rejectWithValue({
      message: err.message,
    });
  }
});

const signUp = createAsyncThunk<
  User,
  Account,
  { rejectValue: { message: string } }
>('users/signup', async (signUpFormData, thunkAPI) => {
  try {
    const account = await authService.signUp(signUpFormData);
    // console.log('thunk user', account);
    return account;
  } catch (err: Error | any) {
    return thunkAPI.rejectWithValue({
      message: err.message,
    });
  }
});

const signOut = createAsyncThunk('users/signout', async (_, thunkAPI) => {
  authService.logout();
});

export { signIn, signUp, signOut };
