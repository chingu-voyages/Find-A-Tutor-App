import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login, RegisterType } from '../utils/schemas';
import { User } from '../utils/User';
import * as authService from '../services';

const login = createAsyncThunk<
  User,
  Login,
  { rejectValue: { message: string } }
>('users/signin', async (signInFormData, thunkAPI) => {
  try {
    const user = await authService.signIn(signInFormData);
    console.log('thunk user', user);
    return user;
  } catch (err: Error | any) {
    return thunkAPI.rejectWithValue({
      message: err.message,
    });
  }
});

const register = createAsyncThunk<
  User,
  RegisterType,
  { rejectValue: { message: string } }
>('users/signup', async (signUpFormData, thunkAPI) => {
  try {
    const user = await authService.signUp(signUpFormData);
    console.log('thunk user', user);
    return user;
  } catch (err: Error | any) {
    return thunkAPI.rejectWithValue({
      message: err.message,
    });
  }
});

const logout = createAsyncThunk('users/signout', async (_, thunkAPI) => {
  authService.logout();
});

export { login, register, logout };
