import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IUser } from '../models/IUser';
import { login, register, logout } from './user.thunk';
import * as authService from '../services';

interface UserState {
  entity: IUser | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState = {
  entity: authService.getUser() || null,
  status: 'idle',
  error: null,
} as unknown as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.status = 'succeeded';
    });

    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.status = 'failed';
    });

    builder.addCase(register.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      console.log('register fulfilled', action.payload);
      state.entity = action.payload;
      state.status = 'succeeded';
    });

    builder.addCase(register.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.status = 'failed';
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.entity = null;
    });
  },
});

//export const {} = userSlice.actions;

export const selectStatus = (state: RootState) => state.user.status;
export const selectUser = (state: RootState) => state.user.entity;

export default userSlice.reducer;
