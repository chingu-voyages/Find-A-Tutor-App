import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../models/User';
import authService from '../services/auth.service';
import { signIn, signUp, signOut } from './account.thunk';

interface UserState {
  entity: User | null;
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
    builder.addCase(signIn.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.status = 'succeeded';
    });

    builder.addCase(signIn.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.status = 'failed';
    });

    builder.addCase(signUp.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.status = 'succeeded';
    });

    builder.addCase(signUp.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.status = 'failed';
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.entity = null;
    });
  },
});

//export const {} = userSlice.actions;

export const selectStatus = (state: RootState) => state.user.status;
export const selectUser = (state: RootState) => state.user.entity;

export default userSlice.reducer;
