import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import * as authService from '../services';
import { ILogin } from '../models/ILogin';
import { IRegister } from '../models/IRegister';

const login = createAsyncThunk<
  IUser,
  ILogin,
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
  IUser,
  IRegister,
  { rejectValue: { message: string } }
>('users/signup', async (signUpFormData, thunkAPI) => {
  console.log('Inside register createAsyncThunk 1');
  try {
    console.log('Inside register createAsyncThunk 2');
    const user = await authService.signUp(signUpFormData);
    console.log('thunk user', user);
    return user;
  } catch (err: Error | any) {
    console.log(err);
    return thunkAPI.rejectWithValue({
      message: err.message,
    });
  }
});

const logout = createAsyncThunk('users/signout', async (_, thunkAPI) => {
  authService.logout();
});

export { login, register, logout };
